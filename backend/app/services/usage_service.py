import uuid
from datetime import date, datetime, timezone

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.tier_limits import get_limits
from app.db.models.usage_tracking import UsageTracking


async def get_or_create_monthly_usage(db: AsyncSession, user_id: uuid.UUID) -> UsageTracking:
    today = date.today()
    period_start = today.replace(day=1)

    result = await db.execute(
        select(UsageTracking).where(
            UsageTracking.user_id == user_id,
            UsageTracking.period_start == period_start,
        )
    )
    usage = result.scalar_one_or_none()

    if not usage:
        usage = UsageTracking(
            user_id=user_id,
            period_start=period_start,
            ai_generations_used=0,
        )
        db.add(usage)
        await db.flush()

    return usage


async def increment_ai_usage(db: AsyncSession, user_id: uuid.UUID) -> int:
    usage = await get_or_create_monthly_usage(db, user_id)
    usage.ai_generations_used += 1
    usage.updated_at = datetime.now(timezone.utc)
    await db.commit()
    await db.refresh(usage)
    return usage.ai_generations_used


async def check_ai_limit(db: AsyncSession, user_id: uuid.UUID, tier: str) -> tuple[bool, int, int]:
    """Returns (allowed, used, limit). limit=-1 means unlimited."""
    limits = get_limits(tier)
    limit = limits.ai_generations_per_month

    usage = await get_or_create_monthly_usage(db, user_id)
    used = usage.ai_generations_used

    if limit == -1:
        return True, used, limit

    return used < limit, used, limit


async def get_usage_summary(db: AsyncSession, user_id: uuid.UUID, tier: str) -> dict:
    limits = get_limits(tier)
    usage = await get_or_create_monthly_usage(db, user_id)

    return {
        "ai_generations_used": usage.ai_generations_used,
        "ai_generations_limit": limits.ai_generations_per_month,
        "period_start": usage.period_start.isoformat(),
    }
