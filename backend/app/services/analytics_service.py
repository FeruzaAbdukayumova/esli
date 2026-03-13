"""Analytics service — event tracking and aggregation queries for admin dashboard."""

import uuid
from datetime import datetime, timedelta, timezone

from sqlalchemy import select, func, distinct, text, case, literal_column
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.models.analytics_event import AnalyticsEvent
from app.db.models.card import Card
from app.db.models.deck import Deck
from app.db.models.promo_code import PromoCode
from app.db.models.review_log import ReviewLog
from app.db.models.subscription import Subscription
from app.db.models.user import User


# ---------------------------------------------------------------------------
# Event tracking
# ---------------------------------------------------------------------------

ALLOWED_EVENTS = {
    "app.open",
    "deck.create",
    "card.add",
    "pricing.upgrade_click",
    "pricing.billing_toggle",
    "translate.use",
    "ai.generate",
    "file.import",
}


async def track_event(
    db: AsyncSession,
    event_name: str,
    user_id: uuid.UUID | None = None,
    session_id: str | None = None,
    properties: dict | None = None,
) -> None:
    event = AnalyticsEvent(
        event_name=event_name,
        user_id=user_id,
        session_id=session_id,
        properties=properties,
    )
    db.add(event)
    await db.commit()


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def _parse_range(range_str: str) -> datetime | None:
    """Convert range string to start datetime. Returns None for 'all'."""
    now = datetime.now(timezone.utc)
    mapping = {
        "7d": timedelta(days=7),
        "30d": timedelta(days=30),
        "90d": timedelta(days=90),
        "1y": timedelta(days=365),
    }
    delta = mapping.get(range_str)
    return (now - delta) if delta else None


def _trunc_expr(granularity: str, column):
    """Return date_trunc SQL expression."""
    return func.date_trunc(granularity, column)


# ---------------------------------------------------------------------------
# User growth
# ---------------------------------------------------------------------------

async def get_user_growth(
    db: AsyncSession, range_str: str = "30d", granularity: str = "day"
) -> dict:
    start = _parse_range(range_str)
    now = datetime.now(timezone.utc)

    # Total users
    total_users = (await db.execute(select(func.count(User.id)))).scalar() or 0

    # Signups over time
    signup_query = select(
        func.to_char(_trunc_expr(granularity, User.created_at), "YYYY-MM-DD").label("date"),
        func.count(User.id).label("value"),
    ).group_by("date").order_by("date")
    if start:
        signup_query = signup_query.where(User.created_at >= start)
    signups = [{"date": r.date, "value": r.value} for r in (await db.execute(signup_query)).all()]

    # Active users over time (distinct users who reviewed)
    active_query = select(
        func.to_char(_trunc_expr(granularity, ReviewLog.reviewed_at), "YYYY-MM-DD").label("date"),
        func.count(distinct(ReviewLog.user_id)).label("value"),
    ).group_by("date").order_by("date")
    if start:
        active_query = active_query.where(ReviewLog.reviewed_at >= start)
    active_users = [{"date": r.date, "value": r.value} for r in (await db.execute(active_query)).all()]

    # App opens over time (all visitors, including guests)
    app_opens_query = select(
        func.to_char(_trunc_expr(granularity, AnalyticsEvent.created_at), "YYYY-MM-DD").label("date"),
        func.count(AnalyticsEvent.id).label("value"),
    ).where(
        AnalyticsEvent.event_name == "app.open"
    ).group_by("date").order_by("date")
    if start:
        app_opens_query = app_opens_query.where(AnalyticsEvent.created_at >= start)
    app_opens = [{"date": r.date, "value": r.value} for r in (await db.execute(app_opens_query)).all()]

    # Unique visitors (distinct session_ids for app.open)
    unique_visitors_query = select(
        func.to_char(_trunc_expr(granularity, AnalyticsEvent.created_at), "YYYY-MM-DD").label("date"),
        func.count(distinct(AnalyticsEvent.session_id)).label("value"),
    ).where(
        AnalyticsEvent.event_name == "app.open",
        AnalyticsEvent.session_id.isnot(None),
    ).group_by("date").order_by("date")
    if start:
        unique_visitors_query = unique_visitors_query.where(AnalyticsEvent.created_at >= start)
    unique_visitors = [{"date": r.date, "value": r.value} for r in (await db.execute(unique_visitors_query)).all()]

    # Retention rate: % of users who signed up in period and have at least 1 review
    if start:
        new_users_count = (await db.execute(
            select(func.count(User.id)).where(User.created_at >= start)
        )).scalar() or 0
        if new_users_count > 0:
            active_new = (await db.execute(
                select(func.count(distinct(ReviewLog.user_id)))
                .join(User, User.id == ReviewLog.user_id)
                .where(User.created_at >= start, ReviewLog.reviewed_at >= start)
            )).scalar() or 0
            retention_rate = round((active_new / new_users_count) * 100, 1)
        else:
            retention_rate = 0.0
    else:
        # All time: % of all users who have ever reviewed
        active_ever = (await db.execute(
            select(func.count(distinct(ReviewLog.user_id)))
        )).scalar() or 0
        retention_rate = round((active_ever / total_users) * 100, 1) if total_users > 0 else 0.0

    return {
        "signups": signups,
        "active_users": active_users,
        "app_opens": app_opens,
        "unique_visitors": unique_visitors,
        "total_users": total_users,
        "retention_rate": retention_rate,
    }


# ---------------------------------------------------------------------------
# Study engagement
# ---------------------------------------------------------------------------

async def get_study_engagement(
    db: AsyncSession, range_str: str = "30d", granularity: str = "day"
) -> dict:
    start = _parse_range(range_str)

    # Reviews over time
    reviews_query = select(
        func.to_char(_trunc_expr(granularity, ReviewLog.reviewed_at), "YYYY-MM-DD").label("date"),
        func.count(ReviewLog.id).label("value"),
    ).group_by("date").order_by("date")
    if start:
        reviews_query = reviews_query.where(ReviewLog.reviewed_at >= start)
    reviews_over_time = [
        {"date": r.date, "value": r.value}
        for r in (await db.execute(reviews_query)).all()
    ]

    # Response distribution
    dist_query = select(
        ReviewLog.response,
        func.count(ReviewLog.id).label("count"),
    ).group_by(ReviewLog.response)
    if start:
        dist_query = dist_query.where(ReviewLog.reviewed_at >= start)
    response_distribution = {
        r.response: r.count for r in (await db.execute(dist_query)).all()
    }

    # Peak hours (0-23)
    hours_query = select(
        func.extract("hour", ReviewLog.reviewed_at).cast(type_=text("integer")).label("hour"),
        func.count(ReviewLog.id).label("count"),
    ).group_by("hour").order_by("hour")
    if start:
        hours_query = hours_query.where(ReviewLog.reviewed_at >= start)
    hours_data = {int(r.hour): r.count for r in (await db.execute(hours_query)).all()}
    peak_hours = [hours_data.get(h, 0) for h in range(24)]

    return {
        "reviews_over_time": reviews_over_time,
        "response_distribution": response_distribution,
        "peak_hours": peak_hours,
    }


# ---------------------------------------------------------------------------
# Content metrics
# ---------------------------------------------------------------------------

async def get_content_metrics(
    db: AsyncSession, range_str: str = "30d", granularity: str = "day"
) -> dict:
    start = _parse_range(range_str)

    # Decks created over time
    decks_query = select(
        func.to_char(_trunc_expr(granularity, Deck.created_at), "YYYY-MM-DD").label("date"),
        func.count(Deck.id).label("value"),
    ).group_by("date").order_by("date")
    if start:
        decks_query = decks_query.where(Deck.created_at >= start)
    decks_over_time = [{"date": r.date, "value": r.value} for r in (await db.execute(decks_query)).all()]

    # Cards created over time
    cards_query = select(
        func.to_char(_trunc_expr(granularity, Card.created_at), "YYYY-MM-DD").label("date"),
        func.count(Card.id).label("value"),
    ).group_by("date").order_by("date")
    if start:
        cards_query = cards_query.where(Card.created_at >= start)
    cards_over_time = [{"date": r.date, "value": r.value} for r in (await db.execute(cards_query)).all()]

    # Popular decks (top 10 by copy_count)
    card_count_sq = (
        select(Card.deck_id, func.count(Card.id).label("card_count"))
        .group_by(Card.deck_id)
        .subquery()
    )
    popular_query = (
        select(
            Deck.title,
            Deck.copy_count,
            func.coalesce(card_count_sq.c.card_count, 0).label("card_count"),
            User.username.label("owner"),
        )
        .join(User, User.id == Deck.owner_id)
        .outerjoin(card_count_sq, card_count_sq.c.deck_id == Deck.id)
        .where(Deck.copy_count > 0)
        .order_by(Deck.copy_count.desc())
        .limit(10)
    )
    popular_decks = [
        {"title": r.title, "copy_count": r.copy_count, "card_count": r.card_count, "owner": r.owner}
        for r in (await db.execute(popular_query)).all()
    ]

    # Category breakdown (unnest comma-separated tags)
    tags_query = select(
        func.trim(func.unnest(func.string_to_array(Deck.category_tags, ","))).label("tag"),
    ).where(Deck.category_tags.isnot(None), Deck.category_tags != "")
    if start:
        tags_query = tags_query.where(Deck.created_at >= start)
    tags_sq = tags_query.subquery()
    category_query = select(
        tags_sq.c.tag,
        func.count().label("count"),
    ).group_by(tags_sq.c.tag).order_by(func.count().desc()).limit(20)
    category_breakdown = {
        r.tag: r.count for r in (await db.execute(category_query)).all() if r.tag
    }

    # Shared vs private
    shared_count = (await db.execute(
        select(func.count(Deck.id)).where(Deck.is_shared == True)
    )).scalar() or 0
    private_count = (await db.execute(
        select(func.count(Deck.id)).where(Deck.is_shared == False)
    )).scalar() or 0

    return {
        "decks_over_time": decks_over_time,
        "cards_over_time": cards_over_time,
        "popular_decks": popular_decks,
        "category_breakdown": category_breakdown,
        "shared_vs_private": {"shared": shared_count, "private": private_count},
    }


# ---------------------------------------------------------------------------
# Subscriptions
# ---------------------------------------------------------------------------

async def get_subscription_data(db: AsyncSession, range_str: str = "30d") -> dict:
    # Current tier distribution
    tier_result = await db.execute(
        select(
            func.coalesce(Subscription.plan_tier, "free").label("tier"),
            func.count(User.id).label("count"),
        )
        .select_from(User)
        .outerjoin(Subscription, Subscription.user_id == User.id)
        .group_by("tier")
    )
    users_by_tier = {r.tier: r.count for r in tier_result.all()}

    # Promo code usage
    promo_query = (
        select(
            PromoCode.code,
            PromoCode.tier,
            PromoCode.current_redemptions.label("redemptions"),
        )
        .where(PromoCode.current_redemptions > 0)
        .order_by(PromoCode.current_redemptions.desc())
        .limit(20)
    )
    promo_usage = [
        {"code": r.code, "tier": r.tier, "redemptions": r.redemptions}
        for r in (await db.execute(promo_query)).all()
    ]

    return {
        "users_by_tier": users_by_tier,
        "promo_usage": promo_usage,
    }


# ---------------------------------------------------------------------------
# Custom events
# ---------------------------------------------------------------------------

async def get_custom_events(db: AsyncSession, range_str: str = "30d") -> dict:
    start = _parse_range(range_str)

    query = select(
        AnalyticsEvent.event_name,
        AnalyticsEvent.properties["method"].astext.label("method"),
        func.count(AnalyticsEvent.id).label("count"),
    ).group_by(AnalyticsEvent.event_name, "method")
    if start:
        query = query.where(AnalyticsEvent.created_at >= start)

    result = await db.execute(query)
    events: dict[str, int] = {}
    for row in result.all():
        key = f"{row.event_name}.{row.method}" if row.method else row.event_name
        events[key] = row.count

    return {"events": events}
