import uuid
from datetime import datetime

from pydantic import BaseModel, Field


class CardCreate(BaseModel):
    front_text: str | None = Field(None, max_length=50000)
    back_text: str | None = Field(None, max_length=50000)
    front_image_url: str | None = Field(None, max_length=500)
    back_image_url: str | None = Field(None, max_length=500)


class CardUpdate(BaseModel):
    front_text: str | None = Field(None, max_length=50000)
    back_text: str | None = Field(None, max_length=50000)
    front_image_url: str | None = Field(None, max_length=500)
    back_image_url: str | None = Field(None, max_length=500)
    last_reviewed_at: datetime | None = None
    next_review_at: datetime | None = None


class CardResponse(BaseModel):
    id: uuid.UUID
    deck_id: uuid.UUID
    front_text: str | None
    back_text: str | None
    front_image_url: str | None
    back_image_url: str | None
    translations: dict[str, str] | None = None
    last_reviewed_at: datetime | None
    next_review_at: datetime | None
    # SM-2 spaced repetition fields
    ease_factor: float = 2.5
    interval: int = 0
    repetitions: int = 0
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}


class CardBatchCreate(BaseModel):
    cards: list[CardCreate] = Field(..., min_length=1, max_length=500)


class CardBatchResponse(BaseModel):
    created: int
    cards: list[CardResponse]


class CardTranslatedResponse(BaseModel):
    id: uuid.UUID
    deck_id: uuid.UUID
    front_text: str | None
    back_text: str | None
    translated_back: str
    front_image_url: str | None
    back_image_url: str | None
    translations: dict[str, str] | None = None
    created_at: datetime | None
    updated_at: datetime | None

    model_config = {"from_attributes": True}
