import uuid

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.v1.deps import get_current_user
from app.db.models.user import User
from app.db.session import get_db
from app.schemas.card import CardResponse, CardUpdate, CardTranslatedResponse
from app.schemas.review import CardReviewIn, CardIntervalsResponse
from app.services import card_service, review_service, translation_service

router = APIRouter()


@router.patch("/{card_id}", response_model=CardResponse)
async def update_card(
    card_id: uuid.UUID,
    payload: CardUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Update card fields and/or review fields (last_reviewed_at, next_review_at). Returns 404 if not found or not owned."""
    data = payload.model_dump(exclude_unset=True)
    card = await card_service.update_card(db, card_id, current_user.id, data)
    if not card:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Card not found")
    return CardResponse.model_validate(card)


@router.delete("/{card_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_card(
    card_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Delete card. Returns 404 if not found or not owned."""
    deleted = await card_service.delete_card(db, card_id, current_user.id)
    if not deleted:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Card not found")


@router.post("/{card_id}/review", response_model=CardResponse)
async def review_card(
    card_id: uuid.UUID,
    payload: CardReviewIn,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """
    Record a card review using SM-2 spaced repetition algorithm.

    Response options:
    - again: Forgot the answer, will review in 1 minute
    - hard: Struggled to recall, shorter interval
    - good: Normal recall, standard interval progression
    - easy: Effortless recall, longer interval

    Returns the updated card with new ease_factor, interval, and next_review_at.
    """
    card = await review_service.record_review(db, card_id, current_user.id, payload.response)
    if not card:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Card not found")
    return CardResponse.model_validate(card)


@router.get("/{card_id}/intervals", response_model=CardIntervalsResponse)
async def get_card_intervals(
    card_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """
    Get the next review intervals for each response option.

    Returns intervals like: { again: "1m", hard: "10m", good: "1d", easy: "4d" }
    Used by frontend to show users when they'll see the card next for each choice.
    """
    intervals = await review_service.get_card_intervals(db, card_id, current_user.id)
    if not intervals:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Card not found")
    return CardIntervalsResponse(**intervals)


@router.get("/{card_id}/translated", response_model=CardTranslatedResponse)
async def get_card_translated(
    card_id: uuid.UUID,
    lang: str = "en",
    db: AsyncSession = Depends(get_db),
):
    """Get card with translated back text. Uses cached translation or generates via AI."""
    # Validate language
    if lang != "en" and lang not in translation_service.SUPPORTED_LANGUAGES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Unsupported language: {lang}. Supported: {list(translation_service.SUPPORTED_LANGUAGES.keys())}",
        )

    try:
        result = await translation_service.get_translated_card(db, card_id, lang)
        if not result:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Card not found")
        return result
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))


@router.post("/translate-text")
async def translate_text(
    payload: dict,
):
    """Translate arbitrary text. No authentication required. For guest mode."""
    text = payload.get("text", "").strip()
    lang = payload.get("lang", "en")

    if not text:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Text is required")

    if lang == "en":
        return {"translated_text": text}

    if lang not in translation_service.SUPPORTED_LANGUAGES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Unsupported language: {lang}",
        )

    translated = await translation_service.translate_text(text, lang)
    return {"translated_text": translated}


@router.get("/languages/supported")
async def get_supported_languages():
    """Get list of supported languages for card translation."""
    return {"languages": translation_service.get_supported_languages()}
