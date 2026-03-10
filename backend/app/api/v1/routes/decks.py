import uuid

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.v1.deps import get_current_user_with_tier
from app.core.tier_limits import get_limits
from app.db.models.user import User
from app.db.session import get_db
from app.schemas.deck import DeckCreate, DeckResponse, DeckUpdate
from app.schemas.card import CardCreate, CardResponse, CardBatchCreate, CardBatchResponse
from app.services import deck_service, card_service

router = APIRouter()


@router.get("", response_model=list[DeckResponse])
async def list_decks(
    db: AsyncSession = Depends(get_db),
    user_tier: tuple[User, str] = Depends(get_current_user_with_tier),
):
    """Return list of decks owned by the current user."""
    current_user, tier = user_tier
    decks = await deck_service.list_decks_by_owner(db, current_user.id)
    return [DeckResponse.model_validate(d) for d in decks]


@router.post("", response_model=DeckResponse, status_code=status.HTTP_201_CREATED)
async def create_deck(
    payload: DeckCreate,
    db: AsyncSession = Depends(get_db),
    user_tier: tuple[User, str] = Depends(get_current_user_with_tier),
):
    """Create a deck (title, category_tags, optional is_shared)."""
    current_user, tier = user_tier
    limits = get_limits(tier)

    # Check deck count limit
    if limits.max_decks != -1:
        deck_count = await deck_service.count_decks_by_owner(db, current_user.id)
        if deck_count >= limits.max_decks:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Deck limit reached ({limits.max_decks}). Upgrade your plan for more.",
            )

    # Check shared deck limit
    if payload.is_shared and limits.max_shared_decks != -1:
        shared_count = await deck_service.count_shared_decks_by_owner(db, current_user.id)
        if shared_count >= limits.max_shared_decks:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Shared deck limit reached ({limits.max_shared_decks}). Upgrade your plan for more.",
            )

    deck = await deck_service.create_deck(db, current_user.id, payload)
    return DeckResponse.model_validate(deck)


@router.patch("/{deck_id}", response_model=DeckResponse)
async def update_deck(
    deck_id: uuid.UUID,
    payload: DeckUpdate,
    db: AsyncSession = Depends(get_db),
    user_tier: tuple[User, str] = Depends(get_current_user_with_tier),
):
    """Update deck fields (owner only). Returns 404 if not found or not owned."""
    current_user, tier = user_tier
    data = payload.model_dump(exclude_unset=True)
    deck = await deck_service.update_deck(db, deck_id, current_user.id, data)
    if not deck:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Deck not found")
    return DeckResponse.model_validate(deck)


@router.delete("/{deck_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_deck(
    deck_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
    user_tier: tuple[User, str] = Depends(get_current_user_with_tier),
):
    """Delete deck and cascade delete cards. Returns 404 if not found or not owned."""
    current_user, tier = user_tier
    deleted = await deck_service.delete_deck(db, deck_id, current_user.id)
    if not deleted:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Deck not found")


@router.get("/{deck_id}/cards", response_model=list[CardResponse])
async def list_cards(
    deck_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
    user_tier: tuple[User, str] = Depends(get_current_user_with_tier),
):
    """List cards for a deck (owner only). Returns 404 if deck not found or not owned."""
    current_user, tier = user_tier
    cards = await card_service.list_cards_by_deck_for_user(db, deck_id, current_user.id)
    if cards is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Deck not found")
    return [CardResponse.model_validate(c) for c in cards]


@router.post("/{deck_id}/cards", response_model=CardResponse, status_code=status.HTTP_201_CREATED)
async def create_card(
    deck_id: uuid.UUID,
    payload: CardCreate,
    db: AsyncSession = Depends(get_db),
    user_tier: tuple[User, str] = Depends(get_current_user_with_tier),
):
    """Create a card in the deck. Returns 404 if deck not found or not owned."""
    current_user, tier = user_tier
    limits = get_limits(tier)

    # Check card count limits
    card_count = await deck_service.count_cards_by_deck(db, deck_id)
    if card_count >= limits.max_cards_per_deck:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"Card limit per deck reached ({limits.max_cards_per_deck}). Upgrade your plan for more.",
        )

    total_cards = await deck_service.count_total_cards_by_owner(db, current_user.id)
    if total_cards >= limits.max_total_cards:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"Total card limit reached ({limits.max_total_cards}). Upgrade your plan for more.",
        )

    card = await card_service.create_card(db, deck_id, current_user.id, payload)
    if not card:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Deck not found")
    return CardResponse.model_validate(card)


@router.post(
    "/{deck_id}/cards/batch",
    response_model=CardBatchResponse,
    status_code=status.HTTP_201_CREATED,
)
async def create_cards_batch(
    deck_id: uuid.UUID,
    payload: CardBatchCreate,
    db: AsyncSession = Depends(get_db),
    user_tier: tuple[User, str] = Depends(get_current_user_with_tier),
):
    """Batch create cards in a deck. Returns 404 if deck not found or not owned."""
    current_user, tier = user_tier
    limits = get_limits(tier)

    # Enforce batch size limit
    if len(payload.cards) > limits.max_batch_import:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"Batch import limit is {limits.max_batch_import} cards. Upgrade your plan for more.",
        )

    # Check total card limits
    total_cards = await deck_service.count_total_cards_by_owner(db, current_user.id)
    if total_cards + len(payload.cards) > limits.max_total_cards:
        remaining = max(0, limits.max_total_cards - total_cards)
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"Total card limit would be exceeded. You can add {remaining} more cards. Upgrade your plan for more.",
        )

    cards = await card_service.create_cards_batch(
        db, deck_id, current_user.id, payload.cards
    )
    if cards is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Deck not found"
        )
    return CardBatchResponse(
        created=len(cards),
        cards=[CardResponse.model_validate(c) for c in cards],
    )
