"""Admin dashboard service — platform-wide stats, user management, deck moderation."""

import uuid
from datetime import datetime, timedelta, timezone
from math import ceil

from sqlalchemy import select, func, or_, distinct, case
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.db.models.card import Card
from app.db.models.chat_conversation import ChatConversation
from app.db.models.deck import Deck
from app.db.models.review_log import ReviewLog
from app.db.models.subscription import Subscription
from app.db.models.user import User


# ---------------------------------------------------------------------------
# Platform stats
# ---------------------------------------------------------------------------

async def get_platform_stats(db: AsyncSession) -> dict:
    now = datetime.now(timezone.utc)
    today_start = now.replace(hour=0, minute=0, second=0, microsecond=0)
    week_ago = now - timedelta(days=7)
    month_ago = now - timedelta(days=30)

    # Total users
    total_users = (await db.execute(select(func.count(User.id)))).scalar() or 0

    # Total decks
    total_decks = (await db.execute(select(func.count(Deck.id)))).scalar() or 0

    # Total cards
    total_cards = (await db.execute(select(func.count(Card.id)))).scalar() or 0

    # Total reviews
    total_reviews = (await db.execute(select(func.count(ReviewLog.id)))).scalar() or 0

    # New users this week / month
    new_users_this_week = (
        await db.execute(
            select(func.count(User.id)).where(User.created_at >= week_ago)
        )
    ).scalar() or 0

    new_users_this_month = (
        await db.execute(
            select(func.count(User.id)).where(User.created_at >= month_ago)
        )
    ).scalar() or 0

    # Users by tier
    tier_result = await db.execute(
        select(
            func.coalesce(Subscription.plan_tier, "free").label("tier"),
            func.count(User.id).label("count"),
        )
        .select_from(User)
        .outerjoin(Subscription, Subscription.user_id == User.id)
        .group_by("tier")
    )
    users_by_tier: dict[str, int] = {}
    for row in tier_result.all():
        users_by_tier[row.tier] = row.count

    # Open support tickets (admin-type conversations with status 'open')
    open_support_tickets = (
        await db.execute(
            select(func.count(ChatConversation.id)).where(
                ChatConversation.type == "admin",
                ChatConversation.status == "open",
            )
        )
    ).scalar() or 0

    # Active sessions today (distinct users who reviewed today)
    active_sessions_today = (
        await db.execute(
            select(func.count(distinct(ReviewLog.user_id))).where(
                ReviewLog.reviewed_at >= today_start
            )
        )
    ).scalar() or 0

    return {
        "total_users": total_users,
        "total_decks": total_decks,
        "total_cards": total_cards,
        "total_reviews": total_reviews,
        "users_by_tier": users_by_tier,
        "new_users_this_week": new_users_this_week,
        "new_users_this_month": new_users_this_month,
        "open_support_tickets": open_support_tickets,
        "active_sessions_today": active_sessions_today,
    }


# ---------------------------------------------------------------------------
# User management
# ---------------------------------------------------------------------------

async def list_users_paginated(
    db: AsyncSession,
    page: int = 1,
    per_page: int = 20,
    search: str | None = None,
    tier_filter: str | None = None,
    provider_filter: str | None = None,
    is_admin_filter: bool | None = None,
) -> tuple[list[dict], int]:
    # Subqueries for aggregated counts
    deck_count_sq = (
        select(
            Deck.owner_id,
            func.count(Deck.id).label("deck_count"),
        )
        .group_by(Deck.owner_id)
        .subquery()
    )

    card_count_sq = (
        select(
            Deck.owner_id,
            func.count(Card.id).label("card_count"),
        )
        .select_from(Card)
        .join(Deck, Card.deck_id == Deck.id)
        .group_by(Deck.owner_id)
        .subquery()
    )

    last_activity_sq = (
        select(
            ReviewLog.user_id,
            func.max(ReviewLog.reviewed_at).label("last_activity"),
        )
        .group_by(ReviewLog.user_id)
        .subquery()
    )

    # Main query
    query = (
        select(
            User,
            func.coalesce(Subscription.plan_tier, "free").label("tier"),
            func.coalesce(deck_count_sq.c.deck_count, 0).label("deck_count"),
            func.coalesce(card_count_sq.c.card_count, 0).label("card_count"),
            last_activity_sq.c.last_activity,
        )
        .outerjoin(Subscription, Subscription.user_id == User.id)
        .outerjoin(deck_count_sq, deck_count_sq.c.owner_id == User.id)
        .outerjoin(card_count_sq, card_count_sq.c.owner_id == User.id)
        .outerjoin(last_activity_sq, last_activity_sq.c.user_id == User.id)
    )

    # Filters
    if search:
        term = f"%{search}%"
        query = query.where(
            or_(User.email.ilike(term), User.username.ilike(term))
        )
    if tier_filter:
        query = query.where(func.coalesce(Subscription.plan_tier, "free") == tier_filter)
    if provider_filter:
        query = query.where(User.auth_provider == provider_filter)
    if is_admin_filter is not None:
        query = query.where(User.is_admin == is_admin_filter)

    # Count
    count_query = select(func.count()).select_from(query.subquery())
    total = (await db.execute(count_query)).scalar() or 0

    # Pagination + ordering
    offset = (page - 1) * per_page
    query = query.order_by(User.created_at.desc()).offset(offset).limit(per_page)

    result = await db.execute(query)
    rows = result.all()

    users = []
    for row in rows:
        user = row[0]
        users.append({
            "id": str(user.id),
            "email": user.email,
            "username": user.username,
            "auth_provider": user.auth_provider,
            "is_admin": user.is_admin,
            "tier": row.tier,
            "deck_count": row.deck_count,
            "card_count": row.card_count,
            "last_activity": row.last_activity,
            "created_at": user.created_at,
        })

    return users, total


async def update_user_admin(
    db: AsyncSession,
    user_id: uuid.UUID,
    is_admin: bool | None = None,
) -> User | None:
    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalar_one_or_none()
    if not user:
        return None
    if is_admin is not None:
        user.is_admin = is_admin
    await db.commit()
    await db.refresh(user)
    return user


# ---------------------------------------------------------------------------
# Deck moderation
# ---------------------------------------------------------------------------

async def list_decks_paginated(
    db: AsyncSession,
    page: int = 1,
    per_page: int = 20,
    search: str | None = None,
    is_shared_filter: bool | None = None,
) -> tuple[list[dict], int]:
    card_count_sq = (
        select(
            Card.deck_id,
            func.count(Card.id).label("card_count"),
        )
        .group_by(Card.deck_id)
        .subquery()
    )

    query = (
        select(
            Deck,
            User.email.label("owner_email"),
            User.username.label("owner_username"),
            func.coalesce(card_count_sq.c.card_count, 0).label("card_count"),
        )
        .join(User, User.id == Deck.owner_id)
        .outerjoin(card_count_sq, card_count_sq.c.deck_id == Deck.id)
    )

    if search:
        term = f"%{search}%"
        query = query.where(
            or_(Deck.title.ilike(term), Deck.category_tags.ilike(term))
        )
    if is_shared_filter is not None:
        query = query.where(Deck.is_shared == is_shared_filter)

    # Count
    count_query = select(func.count()).select_from(query.subquery())
    total = (await db.execute(count_query)).scalar() or 0

    # Pagination
    offset = (page - 1) * per_page
    query = query.order_by(Deck.updated_at.desc()).offset(offset).limit(per_page)

    result = await db.execute(query)
    rows = result.all()

    decks = []
    for row in rows:
        deck = row[0]
        decks.append({
            "id": str(deck.id),
            "title": deck.title,
            "owner_id": str(deck.owner_id),
            "owner_email": row.owner_email,
            "owner_username": row.owner_username,
            "is_shared": deck.is_shared,
            "copy_count": deck.copy_count,
            "card_count": row.card_count,
            "category_tags": deck.category_tags,
            "created_at": deck.created_at,
            "updated_at": deck.updated_at,
        })

    return decks, total


async def update_deck_admin(
    db: AsyncSession,
    deck_id: uuid.UUID,
    is_shared: bool | None = None,
) -> Deck | None:
    result = await db.execute(
        select(Deck).where(Deck.id == deck_id).options(selectinload(Deck.owner))
    )
    deck = result.scalar_one_or_none()
    if not deck:
        return None
    if is_shared is not None:
        deck.is_shared = is_shared
    await db.commit()
    await db.refresh(deck)
    return deck


async def delete_deck_admin(db: AsyncSession, deck_id: uuid.UUID) -> bool:
    result = await db.execute(select(Deck).where(Deck.id == deck_id))
    deck = result.scalar_one_or_none()
    if not deck:
        return False
    await db.delete(deck)
    await db.commit()
    return True
