import uuid
from math import ceil

from sqlalchemy import select, func, or_
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.db.models.deck import Deck
from app.db.models.card import Card
from app.schemas.deck import DeckCreate


async def count_decks_by_owner(db: AsyncSession, owner_id: uuid.UUID) -> int:
    result = await db.execute(select(func.count(Deck.id)).where(Deck.owner_id == owner_id))
    return result.scalar() or 0


async def count_cards_by_deck(db: AsyncSession, deck_id: uuid.UUID) -> int:
    result = await db.execute(select(func.count(Card.id)).where(Card.deck_id == deck_id))
    return result.scalar() or 0


async def count_total_cards_by_owner(db: AsyncSession, owner_id: uuid.UUID) -> int:
    result = await db.execute(
        select(func.count(Card.id)).where(
            Card.deck_id.in_(select(Deck.id).where(Deck.owner_id == owner_id))
        )
    )
    return result.scalar() or 0


async def count_shared_decks_by_owner(db: AsyncSession, owner_id: uuid.UUID) -> int:
    result = await db.execute(
        select(func.count(Deck.id)).where(Deck.owner_id == owner_id, Deck.is_shared == True)
    )
    return result.scalar() or 0


async def list_decks_by_owner(db: AsyncSession, owner_id: uuid.UUID) -> list[Deck]:
    result = await db.execute(select(Deck).where(Deck.owner_id == owner_id).order_by(Deck.updated_at.desc()))
    return list(result.scalars().all())


async def get_deck_by_id_for_user(db: AsyncSession, deck_id: uuid.UUID, owner_id: uuid.UUID) -> Deck | None:
    result = await db.execute(
        select(Deck).where(Deck.id == deck_id, Deck.owner_id == owner_id)
    )
    return result.scalar_one_or_none()


async def create_deck(db: AsyncSession, owner_id: uuid.UUID, data: DeckCreate) -> Deck:
    deck = Deck(
        owner_id=owner_id,
        title=data.title,
        category_tags=data.category_tags,
        is_shared=data.is_shared,
    )
    db.add(deck)
    await db.flush()
    await db.commit()
    await db.refresh(deck)
    return deck


async def update_deck(
    db: AsyncSession,
    deck_id: uuid.UUID,
    owner_id: uuid.UUID,
    data: dict,
) -> Deck | None:
    deck = await get_deck_by_id_for_user(db, deck_id, owner_id)
    if not deck:
        return None
    for key, value in data.items():
        if hasattr(deck, key):
            setattr(deck, key, value)
    await db.commit()
    await db.refresh(deck)
    return deck


async def delete_deck(db: AsyncSession, deck_id: uuid.UUID, owner_id: uuid.UUID) -> bool:
    deck = await get_deck_by_id_for_user(db, deck_id, owner_id)
    if not deck:
        return False
    await db.delete(deck)
    await db.commit()
    return True


# --- Public Deck Functions ---

async def list_public_decks(
    db: AsyncSession,
    page: int = 1,
    per_page: int = 20,
    search: str | None = None,
    sort_by: str = "popular",  # popular, recent, title
    category: str | None = None,
) -> tuple[list[dict], int]:
    """
    List public decks with pagination, search, and sorting.
    Returns (decks_with_card_count, total_count).
    """
    # Base query for shared decks
    base_query = select(Deck).where(Deck.is_shared == True).options(selectinload(Deck.owner))

    # Add category filter
    if category:
        base_query = base_query.where(Deck.category_tags.ilike(f"%{category}%"))

    # Add search filter
    if search:
        search_term = f"%{search}%"
        base_query = base_query.where(
            or_(
                Deck.title.ilike(search_term),
                Deck.category_tags.ilike(search_term),
            )
        )

    # Get total count
    count_query = select(func.count()).select_from(
        base_query.subquery()
    )
    total_result = await db.execute(count_query)
    total = total_result.scalar() or 0

    # Add sorting
    if sort_by == "popular":
        base_query = base_query.order_by(Deck.copy_count.desc(), Deck.created_at.desc())
    elif sort_by == "recent":
        base_query = base_query.order_by(Deck.created_at.desc())
    elif sort_by == "title":
        base_query = base_query.order_by(Deck.title.asc())
    else:
        base_query = base_query.order_by(Deck.copy_count.desc())

    # Add pagination
    offset = (page - 1) * per_page
    base_query = base_query.offset(offset).limit(per_page)

    # Execute query
    result = await db.execute(base_query)
    decks = list(result.scalars().all())

    # Get card counts for each deck
    deck_ids = [d.id for d in decks]
    if deck_ids:
        card_count_query = (
            select(Card.deck_id, func.count(Card.id).label("card_count"))
            .where(Card.deck_id.in_(deck_ids))
            .group_by(Card.deck_id)
        )
        card_counts_result = await db.execute(card_count_query)
        card_counts = {row.deck_id: row.card_count for row in card_counts_result}
    else:
        card_counts = {}

    # Build response with card counts
    decks_with_counts = []
    for deck in decks:
        decks_with_counts.append({
            "id": deck.id,
            "title": deck.title,
            "category_tags": deck.category_tags,
            "copy_count": deck.copy_count,
            "card_count": card_counts.get(deck.id, 0),
            "owner": {
                "id": deck.owner.id,
                "email": deck.owner.email,
            },
            "created_at": deck.created_at,
            "updated_at": deck.updated_at,
        })

    return decks_with_counts, total


async def get_public_deck_by_id(db: AsyncSession, deck_id: uuid.UUID) -> dict | None:
    """Get a single public deck by ID with owner and card count."""
    result = await db.execute(
        select(Deck)
        .where(Deck.id == deck_id, Deck.is_shared == True)
        .options(selectinload(Deck.owner))
    )
    deck = result.scalar_one_or_none()

    if not deck:
        return None

    # Get card count
    card_count_result = await db.execute(
        select(func.count(Card.id)).where(Card.deck_id == deck_id)
    )
    card_count = card_count_result.scalar() or 0

    return {
        "id": deck.id,
        "title": deck.title,
        "category_tags": deck.category_tags,
        "copy_count": deck.copy_count,
        "card_count": card_count,
        "owner": {
            "id": deck.owner.id,
            "email": deck.owner.email,
        },
        "created_at": deck.created_at,
        "updated_at": deck.updated_at,
    }


async def get_public_deck_cards(
    db: AsyncSession, deck_id: uuid.UUID, limit: int = 10
) -> list[Card] | None:
    """Get preview cards from a public deck (limited)."""
    # Verify deck is public
    deck_result = await db.execute(
        select(Deck).where(Deck.id == deck_id, Deck.is_shared == True)
    )
    if not deck_result.scalar_one_or_none():
        return None

    # Get limited cards for preview
    result = await db.execute(
        select(Card)
        .where(Card.deck_id == deck_id)
        .order_by(Card.created_at)
        .limit(limit)
    )
    return list(result.scalars().all())


async def copy_deck(
    db: AsyncSession, deck_id: uuid.UUID, user_id: uuid.UUID
) -> tuple[Deck, int] | None:
    """
    Copy a public deck to user's library.
    Returns (new_deck, card_count) or None if deck not found/not public.
    """
    # Get the source deck (must be public)
    source_result = await db.execute(
        select(Deck)
        .where(Deck.id == deck_id, Deck.is_shared == True)
        .options(selectinload(Deck.cards))
    )
    source_deck = source_result.scalar_one_or_none()

    if not source_deck:
        return None

    # Create new deck for user
    new_deck = Deck(
        owner_id=user_id,
        title=source_deck.title,
        category_tags=source_deck.category_tags,
        is_shared=False,  # Copied decks are private by default
        copy_count=0,
    )
    db.add(new_deck)
    await db.flush()  # Get the new deck ID

    # Copy all cards
    card_count = 0
    for source_card in source_deck.cards:
        new_card = Card(
            deck_id=new_deck.id,
            front_text=source_card.front_text,
            back_text=source_card.back_text,
            front_image_url=source_card.front_image_url,
            back_image_url=source_card.back_image_url,
            # Reset review status for the new copy
            last_reviewed_at=None,
            next_review_at=None,
        )
        db.add(new_card)
        card_count += 1

    # Increment copy count on source deck
    source_deck.copy_count += 1

    await db.commit()
    await db.refresh(new_deck)

    return new_deck, card_count
