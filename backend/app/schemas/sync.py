"""Schemas for guest localStorage sync import."""

from datetime import datetime
from typing import Literal

from pydantic import BaseModel, Field


class GuestCard(BaseModel):
    """Single card from guest data. IDs and timestamps are optional."""

    id: str | None = None
    front_text: str | None = Field(None, alias="frontText", max_length=1000)
    back_text: str | None = Field(None, alias="backText", max_length=1000)
    front_image_url: str | None = Field(None, alias="frontImageUrl", max_length=500)
    back_image_url: str | None = Field(None, alias="backImageUrl", max_length=500)
    last_reviewed_at: datetime | None = Field(None, alias="lastReviewedAt")
    next_review_at: datetime | None = Field(None, alias="nextReviewAt")
    created_at: datetime | None = Field(None, alias="createdAt")
    updated_at: datetime | None = Field(None, alias="updatedAt")

    model_config = {"populate_by_name": True, "extra": "ignore"}


class GuestDeck(BaseModel):
    """Single deck from guest data. Guest id is string; not used as DB id."""

    id: str
    title: str = Field(..., min_length=1, max_length=255)
    category_tags: list[str] = Field(default_factory=list, alias="categoryTags")
    is_shared: bool = Field(default=False, alias="isShared")
    created_at: datetime | None = Field(None, alias="createdAt")
    updated_at: datetime | None = Field(None, alias="updatedAt")

    model_config = {"populate_by_name": True, "extra": "ignore"}


class SyncImportRequest(BaseModel):
    """Payload representing guest localStorage data. version must be 1."""

    version: Literal[1] = 1
    decks: list[GuestDeck] = Field(default_factory=list)
    cards_by_deck_id: dict[str, list[GuestCard]] = Field(
        default_factory=dict,
        alias="cardsByDeckId",
    )

    model_config = {"populate_by_name": True, "extra": "ignore"}


class SyncImportResponse(BaseModel):
    """Result of sync import."""

    imported_decks: int = Field(..., alias="importedDecks")
    imported_cards: int = Field(..., alias="importedCards")
    deck_id_map: dict[str, str] = Field(..., alias="deckIdMap")

    model_config = {"populate_by_name": True, "serialize_by_alias": True}
