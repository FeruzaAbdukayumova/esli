"""Guest → Account sync import. Single transaction, no merge/dedupe."""

import uuid
from datetime import datetime, timezone

from sqlalchemy.ext.asyncio import AsyncSession

from app.db.models.deck import Deck
from app.db.models.card import Card
from app.schemas.sync import SyncImportRequest, GuestDeck, GuestCard


def _ensure_utc(dt: datetime | None) -> datetime | None:
    """Return timezone-aware datetime (UTC). Naive datetimes treated as UTC."""
    if dt is None:
        return None
    if dt.tzinfo is None:
        return dt.replace(tzinfo=timezone.utc)
    return dt


def _category_tags_to_string(tags: list[str]) -> str:
    """Convert categoryTags array to comma-separated string (max 500 chars)."""
    s = ",".join(str(t).strip() for t in tags if isinstance(t, str))
    return s[:500]


async def import_guest_data(
    db: AsyncSession,
    owner_id: uuid.UUID,
    payload: SyncImportRequest,
) -> tuple[int, int, dict[str, str]]:
    """
    Import guest decks and cards in a single transaction.
    Creates new DB decks/cards; guest IDs are not used as DB IDs.
    Returns (imported_decks, imported_cards, deck_id_map: guest_deck_id -> db_deck_id).
    """
    deck_id_map: dict[str, str] = {}
    imported_decks = 0
    imported_cards = 0

    for guest_deck in payload.decks:
        category_tags_str = _category_tags_to_string(guest_deck.category_tags)
        deck = Deck(
            owner_id=owner_id,
            title=guest_deck.title,
            category_tags=category_tags_str,
            is_shared=guest_deck.is_shared,
        )
        db.add(deck)
        await db.flush()
        deck_id_map[guest_deck.id] = str(deck.id)
        imported_decks += 1

        cards_for_deck = payload.cards_by_deck_id.get(guest_deck.id) or []
        for guest_card in cards_for_deck:
            card = Card(
                deck_id=deck.id,
                front_text=guest_card.front_text,
                back_text=guest_card.back_text,
                front_image_url=guest_card.front_image_url,
                back_image_url=guest_card.back_image_url,
                last_reviewed_at=_ensure_utc(guest_card.last_reviewed_at),
                next_review_at=_ensure_utc(guest_card.next_review_at),
            )
            db.add(card)
            imported_cards += 1

    await db.commit()
    return imported_decks, imported_cards, deck_id_map
