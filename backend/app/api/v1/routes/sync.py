"""Guest → Account sync import endpoint."""

from fastapi import APIRouter, Depends, HTTPException, status

from sqlalchemy.ext.asyncio import AsyncSession

from app.api.v1.deps import get_current_user
from app.db.models.user import User
from app.db.session import get_db
from app.schemas.sync import SyncImportRequest, SyncImportResponse
from app.services import sync_service

router = APIRouter()

MAX_DECKS = 200
MAX_CARDS = 5000


@router.post("/import", response_model=SyncImportResponse)
async def sync_import(
    payload: SyncImportRequest,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """
    Import guest localStorage data as new decks and cards for the current user.
    Guest IDs are not used as DB IDs; all resources are created new.
    Returns counts and a mapping from guest deck id to new DB deck id.
    """
    total_cards = sum(
        len(cards) for cards in payload.cards_by_deck_id.values()
    )
    if len(payload.decks) > MAX_DECKS:
        raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail=f"Too many decks: maximum {MAX_DECKS} allowed",
        )
    if total_cards > MAX_CARDS:
        raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail=f"Too many cards: maximum {MAX_CARDS} allowed",
        )

    try:
        imported_decks, imported_cards, deck_id_map = await sync_service.import_guest_data(
            db, current_user.id, payload
        )
    except Exception:
        await db.rollback()
        raise
    return SyncImportResponse(
        imported_decks=imported_decks,
        imported_cards=imported_cards,
        deck_id_map=deck_id_map,
    )
