import asyncio
import uuid

from fastapi import APIRouter, Depends, HTTPException, WebSocket, WebSocketDisconnect, Query
from jose import jwt, JWTError
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.v1.deps import get_admin_user, get_optional_current_user
from app.core.config import settings
from app.db.models.chat_conversation import ChatConversation
from app.db.models.user import User
from app.db.session import get_db, AsyncSessionLocal
from app.schemas.chat import (
    ChatConversationCreate,
    ChatConversationResponse,
    ChatConversationUpdate,
    ChatMessageResponse,
    ChatMessageSend,
)
from app.services import chat_service
from app.services.telegram_service import notify_support_message
from app.services.user_service import get_user_by_id
from app.services.ws_manager import ws_manager

router = APIRouter()


def _verify_ownership(conv: ChatConversation, user: User | None, guest_id: str | None):
    if user and conv.user_id == user.id:
        return
    if not user and guest_id and conv.guest_id == guest_id:
        return
    raise HTTPException(403, "Not authorized to access this conversation")


# --- AI Chat endpoints ---


@router.post("/ai/conversations", response_model=ChatConversationResponse, status_code=201)
async def create_ai_conversation(
    payload: ChatConversationCreate,
    db: AsyncSession = Depends(get_db),
    user: User | None = Depends(get_optional_current_user),
):
    return await chat_service.create_conversation(
        db,
        type="ai",
        user_id=user.id if user else None,
        guest_id=payload.guest_id if not user else None,
    )


@router.post("/ai/conversations/{conversation_id}/messages", response_model=ChatMessageResponse)
async def send_ai_message(
    conversation_id: uuid.UUID,
    payload: ChatMessageSend,
    db: AsyncSession = Depends(get_db),
    user: User | None = Depends(get_optional_current_user),
):
    conv = await chat_service.get_conversation(db, conversation_id)
    if not conv:
        raise HTTPException(404, "Conversation not found")
    _verify_ownership(conv, user, payload.guest_id)
    return await chat_service.get_ai_response(db, conversation_id, payload.content)


@router.get("/ai/conversations/{conversation_id}/messages", response_model=list[ChatMessageResponse])
async def get_ai_messages(
    conversation_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
    user: User | None = Depends(get_optional_current_user),
    guest_id: str | None = None,
):
    conv = await chat_service.get_conversation(db, conversation_id)
    if not conv:
        raise HTTPException(404, "Conversation not found")
    _verify_ownership(conv, user, guest_id)
    return await chat_service.get_messages(db, conversation_id)


# --- Admin (live) Chat endpoints for users ---


@router.post("/support/conversations", response_model=ChatConversationResponse, status_code=201)
async def create_support_conversation(
    payload: ChatConversationCreate,
    db: AsyncSession = Depends(get_db),
    user: User | None = Depends(get_optional_current_user),
):
    return await chat_service.create_conversation(
        db,
        type="admin",
        user_id=user.id if user else None,
        guest_id=payload.guest_id if not user else None,
    )


@router.post("/support/conversations/{conversation_id}/messages", response_model=ChatMessageResponse)
async def send_support_message(
    conversation_id: uuid.UUID,
    payload: ChatMessageSend,
    db: AsyncSession = Depends(get_db),
    user: User | None = Depends(get_optional_current_user),
):
    conv = await chat_service.get_conversation(db, conversation_id)
    if not conv:
        raise HTTPException(404, "Conversation not found")
    _verify_ownership(conv, user, payload.guest_id)
    msg = await chat_service.add_message(db, conversation_id, "user", payload.content)
    await ws_manager.broadcast(conversation_id, msg)
    user_info = user.email if user else f"Guest ({payload.guest_id or 'unknown'})"
    asyncio.create_task(notify_support_message(payload.content, user_info))
    return msg


@router.get("/support/conversations/{conversation_id}/messages", response_model=list[ChatMessageResponse])
async def get_support_messages(
    conversation_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
    user: User | None = Depends(get_optional_current_user),
    guest_id: str | None = None,
):
    conv = await chat_service.get_conversation(db, conversation_id)
    if not conv:
        raise HTTPException(404, "Conversation not found")
    if user and user.is_admin:
        pass
    else:
        _verify_ownership(conv, user, guest_id)
    return await chat_service.get_messages(db, conversation_id)


# --- Admin panel endpoints ---


@router.get("/admin/conversations", response_model=list[ChatConversationResponse])
async def list_all_conversations(
    status: str | None = None,
    db: AsyncSession = Depends(get_db),
    _admin: User = Depends(get_admin_user),
):
    conversations = await chat_service.list_admin_conversations(db, status=status)
    results = []
    for conv in conversations:
        last_msg = await chat_service.get_last_message(db, conv.id)
        resp = ChatConversationResponse.model_validate(conv)
        resp.last_message = ChatMessageResponse.model_validate(last_msg) if last_msg else None
        results.append(resp)
    return results


@router.patch("/admin/conversations/{conversation_id}", response_model=ChatConversationResponse)
async def update_conversation(
    conversation_id: uuid.UUID,
    payload: ChatConversationUpdate,
    db: AsyncSession = Depends(get_db),
    _admin: User = Depends(get_admin_user),
):
    conv = await chat_service.close_conversation(db, conversation_id)
    if not conv:
        raise HTTPException(404, "Conversation not found")
    return conv


@router.post("/admin/conversations/{conversation_id}/reply", response_model=ChatMessageResponse)
async def admin_reply(
    conversation_id: uuid.UUID,
    payload: ChatMessageSend,
    db: AsyncSession = Depends(get_db),
    _admin: User = Depends(get_admin_user),
):
    conv = await chat_service.get_conversation(db, conversation_id)
    if not conv:
        raise HTTPException(404, "Conversation not found")
    msg = await chat_service.add_message(db, conversation_id, "admin", payload.content)
    await ws_manager.broadcast(conversation_id, msg)
    return msg


# --- WebSocket ---


@router.websocket("/ws/{conversation_id}")
async def websocket_endpoint(
    websocket: WebSocket,
    conversation_id: uuid.UUID,
    token: str | None = Query(None),
    guest_id: str | None = Query(None),
):
    async with AsyncSessionLocal() as db:
        user = None
        if token:
            try:
                payload = jwt.decode(token, settings.JWT_SECRET, algorithms=[settings.JWT_ALG])
                user_id_str = payload.get("sub")
                if user_id_str:
                    user = await get_user_by_id(db, uuid.UUID(user_id_str))
            except (JWTError, ValueError):
                await websocket.close(code=4001)
                return

        conv = await chat_service.get_conversation(db, conversation_id)
        if not conv:
            await websocket.close(code=4004)
            return

        is_admin = user and user.is_admin
        is_owner = (user and conv.user_id == user.id) or (guest_id and conv.guest_id == guest_id)
        if not is_admin and not is_owner:
            await websocket.close(code=4003)
            return

        await ws_manager.connect(conversation_id, websocket)
        try:
            while True:
                await websocket.receive_text()
        except WebSocketDisconnect:
            ws_manager.disconnect(conversation_id, websocket)
