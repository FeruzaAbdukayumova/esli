"""Paddle Billing integration service.

Talks to Paddle's REST API via httpx and maps webhook events onto the
Subscription model. Stripe code still lives in subscription_service.py for
now; this module is the Paddle replacement and can coexist with it.
"""
import hashlib
import hmac
import json
import logging
import time
import uuid
from datetime import datetime, timezone
from typing import Any

import httpx
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.db.models.subscription import Subscription
from app.db.models.user import User
from app.services.subscription_service import get_user_subscription

logger = logging.getLogger(__name__)

PADDLE_VERSION_HEADER = "1"
_SIGNATURE_MAX_AGE_SECONDS = 5 * 60


# ---------------------------------------------------------------------------
# Price ID mapping
# ---------------------------------------------------------------------------


def _price_id_to_tier(price_id: str | None) -> str:
    if not price_id:
        return "free"
    mapping = {
        settings.PADDLE_PRO_MONTHLY_PRICE_ID: "pro",
        settings.PADDLE_PRO_YEARLY_PRICE_ID: "pro",
        settings.PADDLE_PREMIUM_MONTHLY_PRICE_ID: "premium",
        settings.PADDLE_PREMIUM_YEARLY_PRICE_ID: "premium",
    }
    return mapping.get(price_id, "free")


def _price_id_to_interval(price_id: str | None) -> str | None:
    if not price_id:
        return None
    monthly = {settings.PADDLE_PRO_MONTHLY_PRICE_ID, settings.PADDLE_PREMIUM_MONTHLY_PRICE_ID}
    yearly = {settings.PADDLE_PRO_YEARLY_PRICE_ID, settings.PADDLE_PREMIUM_YEARLY_PRICE_ID}
    if price_id in monthly:
        return "month"
    if price_id in yearly:
        return "year"
    return None


def is_valid_price_id(price_id: str) -> bool:
    return price_id in {
        settings.PADDLE_PRO_MONTHLY_PRICE_ID,
        settings.PADDLE_PRO_YEARLY_PRICE_ID,
        settings.PADDLE_PREMIUM_MONTHLY_PRICE_ID,
        settings.PADDLE_PREMIUM_YEARLY_PRICE_ID,
    }


# ---------------------------------------------------------------------------
# Paddle HTTP API
# ---------------------------------------------------------------------------


def _headers() -> dict[str, str]:
    if not settings.PADDLE_API_KEY:
        raise RuntimeError("PADDLE_API_KEY is not configured")
    return {
        "Authorization": f"Bearer {settings.PADDLE_API_KEY}",
        "Paddle-Version": PADDLE_VERSION_HEADER,
        "Content-Type": "application/json",
    }


async def _paddle_post(path: str, payload: dict) -> dict:
    url = f"{settings.paddle_api_base}{path}"
    async with httpx.AsyncClient(timeout=15) as client:
        resp = await client.post(url, json=payload, headers=_headers())
    if resp.status_code >= 400:
        logger.error("Paddle POST %s failed: %s %s", path, resp.status_code, resp.text)
        resp.raise_for_status()
    return resp.json().get("data", {})


async def get_or_create_paddle_customer(db: AsyncSession, user: User) -> str:
    """Ensure the user has a Paddle customer record, return its id."""
    if user.paddle_customer_id:
        return user.paddle_customer_id

    # Try to create. If a customer with this email already exists Paddle
    # returns 409 — in that case look it up by email instead.
    try:
        data = await _paddle_post(
            "/customers",
            {
                "email": user.email,
                "locale": "en",
                "custom_data": {"user_id": str(user.id)},
            },
        )
        customer_id = data["id"]
    except httpx.HTTPStatusError as exc:
        if exc.response.status_code != 409:
            raise
        customer_id = await _find_paddle_customer_by_email(user.email)
        if not customer_id:
            raise

    user.paddle_customer_id = customer_id

    sub = await get_user_subscription(db, user.id)
    if sub:
        sub.paddle_customer_id = customer_id

    await db.commit()
    await db.refresh(user)
    return customer_id


async def _find_paddle_customer_by_email(email: str) -> str | None:
    url = f"{settings.paddle_api_base}/customers"
    async with httpx.AsyncClient(timeout=15) as client:
        resp = await client.get(url, params={"email": email}, headers=_headers())
    if resp.status_code >= 400:
        logger.error("Paddle customer lookup failed: %s %s", resp.status_code, resp.text)
        return None
    items = resp.json().get("data", [])
    return items[0]["id"] if items else None


async def create_portal_session(db: AsyncSession, user: User) -> str:
    """Return a hosted customer portal URL (valid ~15 min)."""
    customer_id = await get_or_create_paddle_customer(db, user)
    data = await _paddle_post(f"/customers/{customer_id}/portal-sessions", {})
    return data["urls"]["general"]["overview"]


async def cancel_subscription(sub_id: str, *, effective_now: bool = False) -> None:
    """Cancel a Paddle subscription. Defaults to end-of-period."""
    await _paddle_post(
        f"/subscriptions/{sub_id}/cancel",
        {"effective_from": "immediately" if effective_now else "next_billing_period"},
    )


# ---------------------------------------------------------------------------
# Webhook signature verification
# ---------------------------------------------------------------------------


def verify_signature(signature_header: str | None, raw_body: bytes) -> bool:
    """Verify the Paddle-Signature HMAC on the raw request body.

    Header format: "ts=1696425600;h1=<hex-sha256>".
    Replay window: 5 minutes. Uses constant-time comparison.
    """
    if not signature_header or not settings.PADDLE_WEBHOOK_SECRET:
        return False

    parts: dict[str, str] = {}
    for piece in signature_header.split(";"):
        if "=" not in piece:
            continue
        k, v = piece.split("=", 1)
        parts[k.strip()] = v.strip()

    ts = parts.get("ts")
    h1 = parts.get("h1")
    if not ts or not h1:
        return False

    try:
        ts_int = int(ts)
    except ValueError:
        return False
    if abs(time.time() - ts_int) > _SIGNATURE_MAX_AGE_SECONDS:
        return False

    signed_payload = f"{ts}:{raw_body.decode('utf-8')}".encode("utf-8")
    expected = hmac.new(
        settings.PADDLE_WEBHOOK_SECRET.encode("utf-8"),
        signed_payload,
        hashlib.sha256,
    ).hexdigest()
    return hmac.compare_digest(expected, h1)


# ---------------------------------------------------------------------------
# Webhook event handling
# ---------------------------------------------------------------------------


async def handle_webhook_event(db: AsyncSession, event: dict) -> None:
    event_id = event.get("event_id") or event.get("notification_id")
    event_type = event.get("event_type")
    data = event.get("data") or {}

    if not event_id or not event_type:
        logger.warning("Paddle webhook missing event_id or event_type: %s", event)
        return

    # Idempotency: try to insert an event row first. If it already exists,
    # another worker processed this event and we can silently skip.
    from app.db.models.paddle_event import PaddleEvent

    db.add(PaddleEvent(id=uuid.uuid4(), event_id=event_id, event_type=event_type))
    try:
        await db.flush()
    except IntegrityError:
        await db.rollback()
        logger.info("Paddle event %s already processed, skipping", event_id)
        return

    handlers = {
        "subscription.created": _handle_subscription_upsert,
        "subscription.updated": _handle_subscription_upsert,
        "subscription.canceled": _handle_subscription_canceled,
        "subscription.past_due": _handle_subscription_past_due,
        "transaction.completed": _handle_transaction_completed,
        "transaction.payment_failed": _handle_payment_failed,
    }
    handler = handlers.get(event_type)
    if not handler:
        logger.debug("Unhandled Paddle event: %s", event_type)
        await db.commit()
        return

    await handler(db, data)
    await db.commit()


async def _find_subscription_for_event(
    db: AsyncSession, data: dict
) -> Subscription | None:
    """Locate the Subscription row matching a Paddle event payload.

    Order: paddle_subscription_id → paddle_customer_id → custom_data.user_id.
    """
    paddle_sub_id = data.get("id") or data.get("subscription_id")
    if paddle_sub_id:
        result = await db.execute(
            select(Subscription).where(Subscription.paddle_subscription_id == paddle_sub_id)
        )
        sub = result.scalar_one_or_none()
        if sub:
            return sub

    customer_id = data.get("customer_id")
    if customer_id:
        result = await db.execute(
            select(Subscription).where(Subscription.paddle_customer_id == customer_id)
        )
        sub = result.scalar_one_or_none()
        if sub:
            return sub

    custom_data = data.get("custom_data") or {}
    user_id_str = custom_data.get("user_id")
    if user_id_str:
        try:
            user_id = uuid.UUID(user_id_str)
        except ValueError:
            return None
        return await get_user_subscription(db, user_id)

    return None


def _parse_paddle_dt(value: Any) -> datetime | None:
    if not value:
        return None
    if isinstance(value, datetime):
        return value
    try:
        return datetime.fromisoformat(str(value).replace("Z", "+00:00"))
    except ValueError:
        return None


async def _handle_subscription_upsert(db: AsyncSession, data: dict) -> None:
    sub = await _find_subscription_for_event(db, data)
    if not sub:
        logger.error(
            "No local subscription for Paddle subscription %s (customer %s)",
            data.get("id"),
            data.get("customer_id"),
        )
        return

    items = data.get("items") or []
    price_id = None
    if items:
        price = items[0].get("price") or {}
        price_id = price.get("id")

    period = data.get("current_billing_period") or {}
    scheduled_change = data.get("scheduled_change") or {}
    customer_id = data.get("customer_id")

    sub.paddle_subscription_id = data.get("id")
    sub.paddle_customer_id = customer_id
    sub.plan_tier = _price_id_to_tier(price_id)
    sub.billing_interval = _price_id_to_interval(price_id)
    sub.status = data.get("status") or sub.status
    sub.current_period_start = _parse_paddle_dt(period.get("starts_at"))
    sub.current_period_end = _parse_paddle_dt(period.get("ends_at"))
    sub.cancel_at_period_end = scheduled_change.get("action") == "cancel"
    sub.trial_end = _parse_paddle_dt(data.get("trial_dates", {}).get("ends_at"))
    sub.updated_at = datetime.now(timezone.utc)

    # Cache the customer id on the User so portal/cancel calls don't try
    # to create a duplicate customer (Paddle returns 409 on duplicate email).
    if customer_id:
        user = (await db.execute(select(User).where(User.id == sub.user_id))).scalar_one_or_none()
        if user and user.paddle_customer_id != customer_id:
            user.paddle_customer_id = customer_id


async def _handle_subscription_canceled(db: AsyncSession, data: dict) -> None:
    sub = await _find_subscription_for_event(db, data)
    if not sub:
        return
    sub.status = "canceled"
    sub.plan_tier = "free"
    sub.billing_interval = None
    sub.cancel_at_period_end = False
    sub.updated_at = datetime.now(timezone.utc)


async def _handle_subscription_past_due(db: AsyncSession, data: dict) -> None:
    sub = await _find_subscription_for_event(db, data)
    if not sub:
        return
    sub.status = "past_due"
    sub.updated_at = datetime.now(timezone.utc)


async def _handle_transaction_completed(db: AsyncSession, data: dict) -> None:
    # Renewal / initial payment confirmed. Re-sync period end if present.
    sub_id = data.get("subscription_id")
    if not sub_id:
        return
    result = await db.execute(
        select(Subscription).where(Subscription.paddle_subscription_id == sub_id)
    )
    sub = result.scalar_one_or_none()
    if not sub:
        return
    sub.status = "active"
    billing_period = data.get("billing_period") or {}
    period_end = _parse_paddle_dt(billing_period.get("ends_at"))
    if period_end:
        sub.current_period_end = period_end
    sub.updated_at = datetime.now(timezone.utc)


async def _handle_payment_failed(db: AsyncSession, data: dict) -> None:
    sub_id = data.get("subscription_id")
    if not sub_id:
        return
    result = await db.execute(
        select(Subscription).where(Subscription.paddle_subscription_id == sub_id)
    )
    sub = result.scalar_one_or_none()
    if sub:
        sub.status = "past_due"
        sub.updated_at = datetime.now(timezone.utc)


# ---------------------------------------------------------------------------
# Plan metadata for the frontend
# ---------------------------------------------------------------------------


def plan_price_ids() -> dict[str, dict[str, str | None]]:
    """Returns {tier: {"month": price_id, "year": price_id}}."""
    return {
        "pro": {
            "month": settings.PADDLE_PRO_MONTHLY_PRICE_ID,
            "year": settings.PADDLE_PRO_YEARLY_PRICE_ID,
        },
        "premium": {
            "month": settings.PADDLE_PREMIUM_MONTHLY_PRICE_ID,
            "year": settings.PADDLE_PREMIUM_YEARLY_PRICE_ID,
        },
    }


# JSON helper so webhook route can parse the raw body exactly once.
def parse_event_body(raw_body: bytes) -> dict:
    return json.loads(raw_body.decode("utf-8"))
