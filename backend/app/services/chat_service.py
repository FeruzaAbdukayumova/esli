import uuid
import logging
from datetime import datetime, timezone

import anthropic
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.db.models.chat_conversation import ChatConversation
from app.db.models.chat_message import ChatMessage

logger = logging.getLogger(__name__)

SYSTEM_PROMPT = """You are a helpful AI assistant for the Flashcards app. You help users with:
- How to create, study, and manage flashcards
- Using the spaced repetition system (SRS)
- Importing cards from Excel/CSV files or generating with AI
- Account, subscription, and settings questions
- General study tips
Keep your answers concise and friendly. If you don't know something specific about the app, say so honestly."""


# --- Conversation CRUD ---

async def create_conversation(
    db: AsyncSession,
    type: str,
    user_id: uuid.UUID | None = None,
    guest_id: str | None = None,
) -> ChatConversation:
    conv = ChatConversation(type=type, user_id=user_id, guest_id=guest_id)
    db.add(conv)
    await db.commit()
    await db.refresh(conv)
    return conv


async def get_conversation(
    db: AsyncSession, conversation_id: uuid.UUID
) -> ChatConversation | None:
    result = await db.execute(
        select(ChatConversation).where(ChatConversation.id == conversation_id)
    )
    return result.scalar_one_or_none()


async def list_admin_conversations(
    db: AsyncSession, status: str | None = None
) -> list[ChatConversation]:
    query = select(ChatConversation).where(ChatConversation.type == "admin")
    if status:
        query = query.where(ChatConversation.status == status)
    query = query.order_by(ChatConversation.updated_at.desc())
    result = await db.execute(query)
    return list(result.scalars().all())


async def close_conversation(
    db: AsyncSession, conversation_id: uuid.UUID
) -> ChatConversation | None:
    conv = await get_conversation(db, conversation_id)
    if not conv:
        return None
    conv.status = "closed"
    conv.updated_at = datetime.now(timezone.utc)
    await db.commit()
    await db.refresh(conv)
    return conv


# --- Message CRUD ---

async def add_message(
    db: AsyncSession,
    conversation_id: uuid.UUID,
    role: str,
    content: str,
) -> ChatMessage:
    msg = ChatMessage(conversation_id=conversation_id, role=role, content=content)
    db.add(msg)
    conv = await get_conversation(db, conversation_id)
    if conv:
        conv.updated_at = datetime.now(timezone.utc)
    await db.commit()
    await db.refresh(msg)
    return msg


async def get_messages(
    db: AsyncSession, conversation_id: uuid.UUID
) -> list[ChatMessage]:
    result = await db.execute(
        select(ChatMessage)
        .where(ChatMessage.conversation_id == conversation_id)
        .order_by(ChatMessage.created_at.asc())
    )
    return list(result.scalars().all())


async def get_last_message(
    db: AsyncSession, conversation_id: uuid.UUID
) -> ChatMessage | None:
    result = await db.execute(
        select(ChatMessage)
        .where(ChatMessage.conversation_id == conversation_id)
        .order_by(ChatMessage.created_at.desc())
        .limit(1)
    )
    return result.scalar_one_or_none()


# --- AI Chat ---

async def get_ai_response(
    db: AsyncSession, conversation_id: uuid.UUID, user_message: str
) -> ChatMessage:
    """Send the conversation to Claude and store the response."""
    await add_message(db, conversation_id, "user", user_message)

    messages = await get_messages(db, conversation_id)

    claude_messages = []
    for msg in messages:
        role = "user" if msg.role == "user" else "assistant"
        claude_messages.append({"role": role, "content": msg.content})

    client = anthropic.AsyncAnthropic(api_key=settings.ANTHROPIC_API_KEY)
    response = await client.messages.create(
        model="claude-sonnet-5-5",
        max_tokens=2048,
        system=SYSTEM_PROMPT,
        messages=claude_messages,
    )

    assistant_text = response.content[0].text.strip()
    assistant_msg = await add_message(db, conversation_id, "assistant", assistant_text)
    return assistant_msg
