import uuid

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.models.card import Card
from app.db.models.deck import Deck
from app.schemas.card import CardCreate
from app.services.sanitization_service import sanitize_card_html


async def list_cards_by_deck_for_user(
    db: AsyncSession, deck_id: uuid.UUID, owner_id: uuid.UUID
) -> list[Card] | None:
    """Return cards for deck if deck exists and is owned by user; else None."""
    deck_result = await db.execute(
        select(Deck).where(Deck.id == deck_id, Deck.owner_id == owner_id)
    )
    deck = deck_result.scalar_one_or_none()
    if not deck:
        return None
    result = await db.execute(
        select(Card).where(Card.deck_id == deck_id).order_by(Card.created_at)
    )
    return list(result.scalars().all())


async def get_card_by_id_for_user(db: AsyncSession, card_id: uuid.UUID, owner_id: uuid.UUID) -> Card | None:
    result = await db.execute(
        select(Card).join(Deck).where(Card.id == card_id, Deck.owner_id == owner_id)
    )
    return result.scalar_one_or_none()


async def create_card(
    db: AsyncSession,
    deck_id: uuid.UUID,
    owner_id: uuid.UUID,
    data: CardCreate,
) -> Card | None:
    deck_result = await db.execute(
        select(Deck).where(Deck.id == deck_id, Deck.owner_id == owner_id)
    )
    if not deck_result.scalar_one_or_none():
        return None
    card = Card(
        deck_id=deck_id,
        front_text=sanitize_card_html(data.front_text),
        back_text=sanitize_card_html(data.back_text),
        front_image_url=data.front_image_url,
        back_image_url=data.back_image_url,
    )
    db.add(card)
    await db.flush()
    await db.commit()
    await db.refresh(card)
    return card


async def create_cards_batch(
    db: AsyncSession,
    deck_id: uuid.UUID,
    owner_id: uuid.UUID,
    cards_data: list[CardCreate],
) -> list[Card] | None:
    """Create multiple cards in one transaction. Returns None if deck not found/not owned."""
    deck_result = await db.execute(
        select(Deck).where(Deck.id == deck_id, Deck.owner_id == owner_id)
    )
    if not deck_result.scalar_one_or_none():
        return None

    cards = []
    for data in cards_data:
        card = Card(
            deck_id=deck_id,
            front_text=sanitize_card_html(data.front_text),
            back_text=sanitize_card_html(data.back_text),
            front_image_url=data.front_image_url,
            back_image_url=data.back_image_url,
        )
        db.add(card)
        cards.append(card)

    await db.flush()
    await db.commit()
    for card in cards:
        await db.refresh(card)
    return cards


async def update_card(
    db: AsyncSession,
    card_id: uuid.UUID,
    owner_id: uuid.UUID,
    data: dict,
) -> Card | None:
    card = await get_card_by_id_for_user(db, card_id, owner_id)
    if not card:
        return None
    for key, value in data.items():
        if hasattr(card, key):
            if key in ("front_text", "back_text") and isinstance(value, str):
                value = sanitize_card_html(value)
            setattr(card, key, value)
    await db.commit()
    await db.refresh(card)
    return card


async def delete_card(db: AsyncSession, card_id: uuid.UUID, owner_id: uuid.UUID) -> bool:
    card = await get_card_by_id_for_user(db, card_id, owner_id)
    if not card:
        return False
    await db.delete(card)
    await db.commit()
    return True
