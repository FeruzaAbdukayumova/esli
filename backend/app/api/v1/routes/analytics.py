"""Analytics routes — event tracking and admin dashboard data."""

import asyncio

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.v1.deps import get_admin_user, get_optional_current_user
from app.db.models.user import User
from app.db.session import get_db
from app.schemas.analytics import (
    ContentMetricsResponse,
    CustomEventsResponse,
    StudyEngagementResponse,
    SubscriptionResponse,
    TrackEventRequest,
    UserGrowthResponse,
)
from app.services import analytics_service
from app.services import telegram_service

router = APIRouter()

VALID_RANGES = {"7d", "30d", "90d", "1y", "all"}
VALID_GRANULARITIES = {"day", "week", "month"}


# ---------------------------------------------------------------------------
# Public: event tracking
# ---------------------------------------------------------------------------


@router.post("/track", status_code=status.HTTP_204_NO_CONTENT)
async def track_event(
    payload: TrackEventRequest,
    db: AsyncSession = Depends(get_db),
    user: User | None = Depends(get_optional_current_user),
):
    """Track a frontend event (authenticated or guest)."""
    if payload.event_name not in analytics_service.ALLOWED_EVENTS:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Unknown event",
        )
    await analytics_service.track_event(
        db,
        event_name=payload.event_name,
        user_id=user.id if user else None,
        session_id=payload.session_id,
        properties=payload.properties,
    )

    uid = str(user.id) if user else None
    if payload.event_name == "app.open":
        asyncio.create_task(telegram_service.notify_app_open(uid, payload.session_id))
    elif payload.event_name == "pricing.upgrade_click":
        tier = payload.properties.get("tier") if payload.properties else None
        asyncio.create_task(telegram_service.notify_upgrade_click(tier, uid))


# ---------------------------------------------------------------------------
# Admin: analytics dashboard
# ---------------------------------------------------------------------------


@router.get("/user-growth", response_model=UserGrowthResponse)
async def get_user_growth(
    range: str = Query("30d"),
    granularity: str = Query("day"),
    db: AsyncSession = Depends(get_db),
    _admin: User = Depends(get_admin_user),
):
    if range not in VALID_RANGES:
        raise HTTPException(400, "Invalid range")
    if granularity not in VALID_GRANULARITIES:
        raise HTTPException(400, "Invalid granularity")
    data = await analytics_service.get_user_growth(db, range, granularity)
    return UserGrowthResponse(**data)


@router.get("/study-engagement", response_model=StudyEngagementResponse)
async def get_study_engagement(
    range: str = Query("30d"),
    granularity: str = Query("day"),
    db: AsyncSession = Depends(get_db),
    _admin: User = Depends(get_admin_user),
):
    if range not in VALID_RANGES:
        raise HTTPException(400, "Invalid range")
    if granularity not in VALID_GRANULARITIES:
        raise HTTPException(400, "Invalid granularity")
    data = await analytics_service.get_study_engagement(db, range, granularity)
    return StudyEngagementResponse(**data)


@router.get("/content-metrics", response_model=ContentMetricsResponse)
async def get_content_metrics(
    range: str = Query("30d"),
    granularity: str = Query("day"),
    db: AsyncSession = Depends(get_db),
    _admin: User = Depends(get_admin_user),
):
    if range not in VALID_RANGES:
        raise HTTPException(400, "Invalid range")
    if granularity not in VALID_GRANULARITIES:
        raise HTTPException(400, "Invalid granularity")
    data = await analytics_service.get_content_metrics(db, range, granularity)
    return ContentMetricsResponse(**data)


@router.get("/subscriptions", response_model=SubscriptionResponse)
async def get_subscriptions(
    range: str = Query("30d"),
    db: AsyncSession = Depends(get_db),
    _admin: User = Depends(get_admin_user),
):
    if range not in VALID_RANGES:
        raise HTTPException(400, "Invalid range")
    data = await analytics_service.get_subscription_data(db, range)
    return SubscriptionResponse(**data)


@router.get("/custom-events", response_model=CustomEventsResponse)
async def get_custom_events(
    range: str = Query("30d"),
    db: AsyncSession = Depends(get_db),
    _admin: User = Depends(get_admin_user),
):
    if range not in VALID_RANGES:
        raise HTTPException(400, "Invalid range")
    data = await analytics_service.get_custom_events(db, range)
    return CustomEventsResponse(**data)
