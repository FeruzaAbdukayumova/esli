"""Admin dashboard routes — stats, user management, deck moderation."""

import uuid
from math import ceil

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.v1.deps import get_admin_user
from app.db.models.user import User
from app.db.session import get_db
from app.schemas.admin import (
    AdminDeckListResponse,
    AdminDeckResponse,
    AdminDeckUpdateRequest,
    AdminStatsResponse,
    AdminUserListResponse,
    AdminUserResponse,
    AdminUserUpdateRequest,
)
from app.services import admin_service

router = APIRouter()


# ---------------------------------------------------------------------------
# Overview stats
# ---------------------------------------------------------------------------


@router.get("/stats", response_model=AdminStatsResponse)
async def get_admin_stats(
    db: AsyncSession = Depends(get_db),
    _admin: User = Depends(get_admin_user),
):
    """Get platform-wide statistics (admin only)."""
    data = await admin_service.get_platform_stats(db)
    return AdminStatsResponse(**data)


# ---------------------------------------------------------------------------
# User management
# ---------------------------------------------------------------------------


@router.get("/users", response_model=AdminUserListResponse)
async def list_users(
    page: int = Query(1, ge=1),
    per_page: int = Query(20, ge=1, le=100),
    search: str | None = Query(None),
    tier: str | None = Query(None, pattern="^(free|pro|premium)$"),
    provider: str | None = Query(None),
    is_admin: bool | None = Query(None),
    db: AsyncSession = Depends(get_db),
    _admin: User = Depends(get_admin_user),
):
    """List all users with pagination and filters (admin only)."""
    users, total = await admin_service.list_users_paginated(
        db, page, per_page, search, tier, provider, is_admin
    )
    total_pages = ceil(total / per_page) if total > 0 else 1
    return AdminUserListResponse(
        users=[AdminUserResponse(**u) for u in users],
        total=total,
        page=page,
        per_page=per_page,
        total_pages=total_pages,
    )


@router.patch("/users/{user_id}", response_model=AdminUserResponse)
async def update_user(
    user_id: uuid.UUID,
    payload: AdminUserUpdateRequest,
    db: AsyncSession = Depends(get_db),
    _admin: User = Depends(get_admin_user),
):
    """Update user admin status (admin only)."""
    user = await admin_service.update_user_admin(db, user_id, is_admin=payload.is_admin)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return AdminUserResponse(
        id=str(user.id),
        email=user.email,
        username=user.username,
        auth_provider=user.auth_provider,
        is_admin=user.is_admin,
        created_at=user.created_at,
    )


# ---------------------------------------------------------------------------
# Deck moderation
# ---------------------------------------------------------------------------


@router.get("/decks", response_model=AdminDeckListResponse)
async def list_decks(
    page: int = Query(1, ge=1),
    per_page: int = Query(20, ge=1, le=100),
    search: str | None = Query(None),
    is_shared: bool | None = Query(None),
    db: AsyncSession = Depends(get_db),
    _admin: User = Depends(get_admin_user),
):
    """List all decks with owner info (admin only)."""
    decks, total = await admin_service.list_decks_paginated(
        db, page, per_page, search, is_shared
    )
    total_pages = ceil(total / per_page) if total > 0 else 1
    return AdminDeckListResponse(
        decks=[AdminDeckResponse(**d) for d in decks],
        total=total,
        page=page,
        per_page=per_page,
        total_pages=total_pages,
    )


@router.patch("/decks/{deck_id}", response_model=AdminDeckResponse)
async def update_deck(
    deck_id: uuid.UUID,
    payload: AdminDeckUpdateRequest,
    db: AsyncSession = Depends(get_db),
    _admin: User = Depends(get_admin_user),
):
    """Update deck visibility (admin only)."""
    deck = await admin_service.update_deck_admin(db, deck_id, is_shared=payload.is_shared)
    if not deck:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Deck not found")

    # Get card count for response
    from app.services.deck_service import count_cards_by_deck
    card_count = await count_cards_by_deck(db, deck.id)

    return AdminDeckResponse(
        id=str(deck.id),
        title=deck.title,
        owner_id=str(deck.owner_id),
        owner_email=deck.owner.email,
        owner_username=deck.owner.username,
        is_shared=deck.is_shared,
        copy_count=deck.copy_count,
        card_count=card_count,
        category_tags=deck.category_tags,
        created_at=deck.created_at,
        updated_at=deck.updated_at,
    )


@router.delete("/decks/{deck_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_deck(
    deck_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
    _admin: User = Depends(get_admin_user),
):
    """Delete deck (admin only)."""
    deleted = await admin_service.delete_deck_admin(db, deck_id)
    if not deleted:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Deck not found")
