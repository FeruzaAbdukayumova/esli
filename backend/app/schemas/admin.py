"""Admin dashboard schemas."""

from datetime import datetime

from pydantic import BaseModel, Field


class AdminStatsResponse(BaseModel):
    total_users: int = 0
    total_decks: int = 0
    total_cards: int = 0
    total_reviews: int = 0
    users_by_tier: dict[str, int] = {}
    new_users_this_week: int = 0
    new_users_this_month: int = 0
    open_support_tickets: int = 0
    active_sessions_today: int = 0


class AdminUserResponse(BaseModel):
    id: str
    email: str
    username: str | None = None
    auth_provider: str
    is_admin: bool
    tier: str = "free"
    deck_count: int = 0
    card_count: int = 0
    last_activity: datetime | None = None
    created_at: datetime


class AdminUserListResponse(BaseModel):
    users: list[AdminUserResponse]
    total: int
    page: int
    per_page: int
    total_pages: int


class AdminUserUpdateRequest(BaseModel):
    is_admin: bool | None = None


class AdminDeckResponse(BaseModel):
    id: str
    title: str
    owner_id: str
    owner_email: str
    owner_username: str | None = None
    is_shared: bool
    copy_count: int = 0
    card_count: int = 0
    category_tags: str = ""
    created_at: datetime
    updated_at: datetime


class AdminDeckListResponse(BaseModel):
    decks: list[AdminDeckResponse]
    total: int
    page: int
    per_page: int
    total_pages: int


class AdminDeckUpdateRequest(BaseModel):
    is_shared: bool | None = None
