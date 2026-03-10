import uuid
from datetime import datetime

from pydantic import BaseModel, Field


class DeckCreate(BaseModel):
    title: str = Field(..., min_length=1, max_length=255)
    category_tags: str = Field(default="", max_length=500)
    is_shared: bool = False


class DeckUpdate(BaseModel):
    title: str | None = Field(None, min_length=1, max_length=255)
    category_tags: str | None = Field(None, max_length=500)
    is_shared: bool | None = None


class DeckResponse(BaseModel):
    id: uuid.UUID
    title: str
    category_tags: str
    is_shared: bool
    copy_count: int = 0
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}


# --- Public Deck Schemas ---

class PublicDeckOwner(BaseModel):
    """Minimal owner info for public deck display."""
    id: uuid.UUID
    email: str

    model_config = {"from_attributes": True}


class PublicDeckResponse(BaseModel):
    """Public deck with owner info and card count."""
    id: uuid.UUID
    title: str
    category_tags: str
    copy_count: int
    card_count: int
    owner: PublicDeckOwner
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}


class PublicDeckListResponse(BaseModel):
    """Paginated list of public decks."""
    decks: list[PublicDeckResponse]
    total: int
    page: int
    per_page: int
    total_pages: int


class DeckCopyResponse(BaseModel):
    """Response after copying a deck."""
    id: uuid.UUID
    title: str
    category_tags: str
    card_count: int
    message: str = "Deck copied successfully"
