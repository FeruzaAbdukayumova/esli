import logging
import uuid
from datetime import datetime, timedelta, timezone

from sqlalchemy import select, update
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.models.promo_code import PromoCode
from app.db.models.subscription import Subscription

logger = logging.getLogger(__name__)

TIER_RANK = {"free": 0, "pro": 1, "premium": 2}


def higher_tier(a: str, b: str) -> str:
    return a if TIER_RANK.get(a, 0) >= TIER_RANK.get(b, 0) else b


# --- Admin functions ---


async def create_promo_code(
    db: AsyncSession,
    code: str,
    tier: str,
    duration_days: int,
    max_redemptions: int = -1,
    valid_from: datetime | None = None,
    valid_until: datetime | None = None,
) -> PromoCode:
    if tier not in ("pro", "premium"):
        raise ValueError("Tier must be 'pro' or 'premium'")

    promo = PromoCode(
        code=code.upper().strip(),
        tier=tier,
        duration_days=duration_days,
        max_redemptions=max_redemptions,
        valid_from=valid_from,
        valid_until=valid_until,
    )
    db.add(promo)
    await db.commit()
    await db.refresh(promo)
    return promo


async def list_promo_codes(
    db: AsyncSession,
    include_inactive: bool = False,
) -> list[PromoCode]:
    query = select(PromoCode).order_by(PromoCode.created_at.desc())
    if not include_inactive:
        query = query.where(PromoCode.is_active.is_(True))
    result = await db.execute(query)
    return list(result.scalars().all())


async def get_promo_code(db: AsyncSession, promo_id: uuid.UUID) -> PromoCode | None:
    result = await db.execute(select(PromoCode).where(PromoCode.id == promo_id))
    return result.scalar_one_or_none()


async def update_promo_code(
    db: AsyncSession,
    promo_id: uuid.UUID,
    is_active: bool | None = None,
    max_redemptions: int | None = None,
    valid_from: datetime | None = ...,
    valid_until: datetime | None = ...,
) -> PromoCode | None:
    promo = await get_promo_code(db, promo_id)
    if not promo:
        return None

    if is_active is not None:
        promo.is_active = is_active
    if max_redemptions is not None:
        promo.max_redemptions = max_redemptions
    if valid_from is not ...:
        promo.valid_from = valid_from
    if valid_until is not ...:
        promo.valid_until = valid_until

    await db.commit()
    await db.refresh(promo)
    return promo


async def delete_promo_code(db: AsyncSession, promo_id: uuid.UUID) -> bool:
    promo = await get_promo_code(db, promo_id)
    if not promo:
        return False
    await db.delete(promo)
    await db.commit()
    return True


# --- User functions ---


async def redeem_promo_code(
    db: AsyncSession,
    user_id: uuid.UUID,
    code_str: str,
) -> dict:
    now = datetime.now(timezone.utc)

    # Look up code (case-insensitive)
    result = await db.execute(
        select(PromoCode).where(PromoCode.code == code_str.upper().strip())
    )
    promo = result.scalar_one_or_none()
    if not promo:
        raise ValueError("Invalid promo code")

    # Validate code state
    if not promo.is_active:
        raise ValueError("This promo code is no longer active")

    if promo.valid_from and now < promo.valid_from:
        raise ValueError("This promo code is not yet active")

    if promo.valid_until and now > promo.valid_until:
        raise ValueError("This promo code has expired")

    if promo.max_redemptions != -1 and promo.current_redemptions >= promo.max_redemptions:
        raise ValueError("This promo code has been fully redeemed")

    # Get user's subscription
    sub_result = await db.execute(
        select(Subscription).where(Subscription.user_id == user_id)
    )
    sub = sub_result.scalar_one_or_none()
    if not sub:
        raise ValueError("No subscription found")

    # Check if user already has an active promo
    new_expires = now + timedelta(days=promo.duration_days)
    if sub.promo_tier and sub.promo_expires_at and sub.promo_expires_at > now:
        existing_rank = TIER_RANK.get(sub.promo_tier, 0)
        new_rank = TIER_RANK.get(promo.tier, 0)
        if new_rank < existing_rank:
            raise ValueError(
                f"You already have an active {sub.promo_tier.capitalize()} promo until "
                f"{sub.promo_expires_at.strftime('%b %d, %Y')}"
            )
        if new_rank == existing_rank and new_expires <= sub.promo_expires_at:
            raise ValueError(
                f"You already have an active {sub.promo_tier.capitalize()} promo until "
                f"{sub.promo_expires_at.strftime('%b %d, %Y')}"
            )

    # Atomically increment redemption count (race-safe)
    stmt = (
        update(PromoCode)
        .where(
            PromoCode.id == promo.id,
            (PromoCode.max_redemptions == -1) | (PromoCode.current_redemptions < PromoCode.max_redemptions),
        )
        .values(current_redemptions=PromoCode.current_redemptions + 1)
        .returning(PromoCode.id)
    )
    inc_result = await db.execute(stmt)
    if not inc_result.scalar_one_or_none():
        raise ValueError("This promo code has been fully redeemed")

    # Apply promo to subscription
    sub.promo_tier = promo.tier
    sub.promo_expires_at = new_expires
    sub.promo_code_id = promo.id

    await db.commit()

    return {
        "promo_tier": promo.tier,
        "promo_expires_at": new_expires.isoformat(),
        "message": f"{promo.tier.capitalize()} access granted until {new_expires.strftime('%b %d, %Y')}",
    }
