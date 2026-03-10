import logging
import uuid
from datetime import datetime, timezone

import stripe
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.db.models.subscription import Subscription
from app.db.models.user import User

logger = logging.getLogger(__name__)


def _init_stripe() -> None:
    if settings.STRIPE_SECRET_KEY:
        stripe.api_key = settings.STRIPE_SECRET_KEY


def _price_id_to_tier(price_id: str) -> str:
    mapping = {
        settings.STRIPE_PRO_MONTHLY_PRICE_ID: "pro",
        settings.STRIPE_PRO_YEARLY_PRICE_ID: "pro",
        settings.STRIPE_PREMIUM_MONTHLY_PRICE_ID: "premium",
        settings.STRIPE_PREMIUM_YEARLY_PRICE_ID: "premium",
    }
    return mapping.get(price_id, "free")


def _price_id_to_interval(price_id: str) -> str | None:
    monthly_ids = {settings.STRIPE_PRO_MONTHLY_PRICE_ID, settings.STRIPE_PREMIUM_MONTHLY_PRICE_ID}
    yearly_ids = {settings.STRIPE_PRO_YEARLY_PRICE_ID, settings.STRIPE_PREMIUM_YEARLY_PRICE_ID}
    if price_id in monthly_ids:
        return "month"
    if price_id in yearly_ids:
        return "year"
    return None


async def get_user_subscription(db: AsyncSession, user_id: uuid.UUID) -> Subscription | None:
    result = await db.execute(
        select(Subscription).where(Subscription.user_id == user_id)
    )
    return result.scalar_one_or_none()


async def get_user_tier(db: AsyncSession, user_id: uuid.UUID) -> str:
    from app.services.promo_service import higher_tier

    sub = await get_user_subscription(db, user_id)
    if not sub:
        return "free"

    # Determine Stripe-based tier
    stripe_tier = sub.plan_tier if sub.status in ("active", "trialing") else "free"

    # Determine promo-based tier (lazy expiry cleanup)
    promo_tier = "free"
    if sub.promo_tier and sub.promo_expires_at:
        if sub.promo_expires_at > datetime.now(timezone.utc):
            promo_tier = sub.promo_tier
        else:
            sub.promo_tier = None
            sub.promo_expires_at = None
            sub.promo_code_id = None
            await db.commit()

    return higher_tier(stripe_tier, promo_tier)


async def create_free_subscription(db: AsyncSession, user_id: uuid.UUID) -> Subscription:
    sub = Subscription(user_id=user_id, plan_tier="free", status="active")
    db.add(sub)
    await db.flush()
    return sub


async def get_or_create_stripe_customer(db: AsyncSession, user: User) -> str:
    _init_stripe()
    if user.stripe_customer_id:
        return user.stripe_customer_id

    customer = stripe.Customer.create(
        email=user.email,
        metadata={"user_id": str(user.id)},
    )
    user.stripe_customer_id = customer.id

    # Also update the subscription row
    sub = await get_user_subscription(db, user.id)
    if sub:
        sub.stripe_customer_id = customer.id

    await db.commit()
    await db.refresh(user)
    return customer.id


async def create_checkout_session(
    db: AsyncSession, user: User, price_id: str,
) -> str:
    _init_stripe()
    customer_id = await get_or_create_stripe_customer(db, user)

    session = stripe.checkout.Session.create(
        customer=customer_id,
        payment_method_types=["card"],
        mode="subscription",
        line_items=[{"price": price_id, "quantity": 1}],
        success_url=f"{settings.FRONTEND_URL}/subscription/success?session_id={{CHECKOUT_SESSION_ID}}",
        cancel_url=f"{settings.FRONTEND_URL}/subscription/canceled",
        metadata={"user_id": str(user.id)},
    )
    return session.url


async def create_customer_portal_session(db: AsyncSession, user: User) -> str:
    _init_stripe()
    customer_id = await get_or_create_stripe_customer(db, user)

    session = stripe.billing_portal.Session.create(
        customer=customer_id,
        return_url=f"{settings.FRONTEND_URL}/settings",
    )
    return session.url


async def handle_webhook_event(db: AsyncSession, event: dict) -> None:
    event_type = event["type"]
    data = event["data"]["object"]

    if event_type == "checkout.session.completed":
        await _handle_checkout_completed(db, data)
    elif event_type == "customer.subscription.updated":
        await _handle_subscription_updated(db, data)
    elif event_type == "customer.subscription.deleted":
        await _handle_subscription_deleted(db, data)
    elif event_type == "invoice.payment_failed":
        await _handle_payment_failed(db, data)
    elif event_type == "invoice.paid":
        await _handle_invoice_paid(db, data)
    else:
        logger.debug("Unhandled Stripe event: %s", event_type)


async def _handle_checkout_completed(db: AsyncSession, session: dict) -> None:
    stripe_subscription_id = session.get("subscription")
    customer_id = session.get("customer")
    if not stripe_subscription_id:
        return

    _init_stripe()
    stripe_sub = stripe.Subscription.retrieve(stripe_subscription_id)
    price_id = stripe_sub["items"]["data"][0]["price"]["id"]
    tier = _price_id_to_tier(price_id)
    interval = _price_id_to_interval(price_id)

    # Find subscription by customer id
    result = await db.execute(
        select(Subscription).where(Subscription.stripe_customer_id == customer_id)
    )
    sub = result.scalar_one_or_none()

    if not sub:
        # Try via user metadata
        user_id_str = session.get("metadata", {}).get("user_id")
        if user_id_str:
            sub = await get_user_subscription(db, uuid.UUID(user_id_str))

    if not sub:
        logger.error("No subscription found for customer %s", customer_id)
        return

    sub.stripe_subscription_id = stripe_subscription_id
    sub.stripe_customer_id = customer_id
    sub.plan_tier = tier
    sub.billing_interval = interval
    sub.status = stripe_sub["status"]
    sub.current_period_start = datetime.fromtimestamp(stripe_sub["current_period_start"], tz=timezone.utc)
    sub.current_period_end = datetime.fromtimestamp(stripe_sub["current_period_end"], tz=timezone.utc)
    sub.cancel_at_period_end = stripe_sub.get("cancel_at_period_end", False)
    sub.updated_at = datetime.now(timezone.utc)

    await db.commit()


async def _handle_subscription_updated(db: AsyncSession, stripe_sub: dict) -> None:
    sub_id = stripe_sub["id"]
    result = await db.execute(
        select(Subscription).where(Subscription.stripe_subscription_id == sub_id)
    )
    sub = result.scalar_one_or_none()
    if not sub:
        logger.warning("Subscription not found for stripe_subscription_id %s", sub_id)
        return

    price_id = stripe_sub["items"]["data"][0]["price"]["id"]
    sub.plan_tier = _price_id_to_tier(price_id)
    sub.billing_interval = _price_id_to_interval(price_id)
    sub.status = stripe_sub["status"]
    sub.current_period_start = datetime.fromtimestamp(stripe_sub["current_period_start"], tz=timezone.utc)
    sub.current_period_end = datetime.fromtimestamp(stripe_sub["current_period_end"], tz=timezone.utc)
    sub.cancel_at_period_end = stripe_sub.get("cancel_at_period_end", False)
    sub.updated_at = datetime.now(timezone.utc)

    await db.commit()


async def _handle_subscription_deleted(db: AsyncSession, stripe_sub: dict) -> None:
    sub_id = stripe_sub["id"]
    result = await db.execute(
        select(Subscription).where(Subscription.stripe_subscription_id == sub_id)
    )
    sub = result.scalar_one_or_none()
    if not sub:
        return

    sub.plan_tier = "free"
    sub.status = "canceled"
    sub.stripe_subscription_id = None
    sub.billing_interval = None
    sub.cancel_at_period_end = False
    sub.updated_at = datetime.now(timezone.utc)

    await db.commit()


async def _handle_payment_failed(db: AsyncSession, invoice: dict) -> None:
    sub_id = invoice.get("subscription")
    if not sub_id:
        return

    result = await db.execute(
        select(Subscription).where(Subscription.stripe_subscription_id == sub_id)
    )
    sub = result.scalar_one_or_none()
    if sub:
        sub.status = "past_due"
        sub.updated_at = datetime.now(timezone.utc)
        await db.commit()


async def _handle_invoice_paid(db: AsyncSession, invoice: dict) -> None:
    sub_id = invoice.get("subscription")
    if not sub_id:
        return

    result = await db.execute(
        select(Subscription).where(Subscription.stripe_subscription_id == sub_id)
    )
    sub = result.scalar_one_or_none()
    if sub:
        sub.status = "active"
        period_end = invoice.get("lines", {}).get("data", [{}])[0].get("period", {}).get("end")
        if period_end:
            sub.current_period_end = datetime.fromtimestamp(period_end, tz=timezone.utc)
        sub.updated_at = datetime.now(timezone.utc)
        await db.commit()
