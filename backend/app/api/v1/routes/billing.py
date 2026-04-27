"""Paddle-powered billing routes.

Replaces the Stripe-based flow in stripe.py. The /stripe routes remain
registered for now but are unused by the frontend; they will be removed once
this is confirmed working in production.
"""
import logging

from fastapi import APIRouter, Depends, Header, HTTPException, Request, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.v1.deps import get_current_user
from app.core.config import settings
from app.core.tier_limits import get_limits
from app.db.models.user import User
from app.db.session import get_db
from app.schemas.subscription import (
    PlanInfo,
    PlanLimits,
    PlansResponse,
    PortalSessionResponse,
    SubscriptionResponse,
    UsageSummary,
)
from app.services import paddle_service, subscription_service, usage_service

logger = logging.getLogger(__name__)

router = APIRouter()


def _require_paddle() -> None:
    if not settings.PADDLE_API_KEY or not settings.PADDLE_WEBHOOK_SECRET:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Payment system is not configured.",
        )


@router.get("/plans", response_model=PlansResponse)
async def get_plans():
    plans: list[PlanInfo] = []
    tiers = [
        ("free", "Free", 0.0, 0.0, None, None),
        (
            "pro",
            "Pro",
            5.0,
            49.0,
            settings.PADDLE_PRO_MONTHLY_PRICE_ID,
            settings.PADDLE_PRO_YEARLY_PRICE_ID,
        ),
        (
            "premium",
            "Premium",
            12.0,
            99.0,
            settings.PADDLE_PREMIUM_MONTHLY_PRICE_ID,
            settings.PADDLE_PREMIUM_YEARLY_PRICE_ID,
        ),
    ]
    for tier, name, monthly, yearly, monthly_pid, yearly_pid in tiers:
        limits = get_limits(tier)
        plans.append(
            PlanInfo(
                tier=tier,
                name=name,
                monthly_price=monthly,
                yearly_price=yearly,
                monthly_price_id=monthly_pid,
                yearly_price_id=yearly_pid,
                limits=PlanLimits(
                    ai_generations_per_month=limits.ai_generations_per_month,
                    max_decks=limits.max_decks,
                    max_cards_per_deck=limits.max_cards_per_deck,
                    max_total_cards=limits.max_total_cards,
                    max_batch_import=limits.max_batch_import,
                    max_ai_cards_per_generation=limits.max_ai_cards_per_generation,
                    pdf_ai_generation=limits.pdf_ai_generation,
                    pdf_max_pages=limits.pdf_max_pages,
                    max_ai_cards_per_pdf=limits.max_ai_cards_per_pdf,
                    advanced_analytics=limits.advanced_analytics,
                ),
            )
        )

    return PlansResponse(
        plans=plans,
        paddle_client_token=settings.PADDLE_CLIENT_TOKEN,
        paddle_env=settings.PADDLE_ENV,
    )


@router.get("/subscription", response_model=SubscriptionResponse)
async def get_subscription(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    tier = await subscription_service.get_user_tier(db, current_user.id)
    sub = await subscription_service.get_user_subscription(db, current_user.id)
    usage = await usage_service.get_usage_summary(db, current_user.id, tier)

    return SubscriptionResponse(
        tier=tier,
        status=sub.status if sub else "active",
        billing_interval=sub.billing_interval if sub else None,
        current_period_end=(
            sub.current_period_end.isoformat() if sub and sub.current_period_end else None
        ),
        cancel_at_period_end=sub.cancel_at_period_end if sub else False,
        usage=UsageSummary(**usage),
        promo_tier=sub.promo_tier if sub else None,
        promo_expires_at=(
            sub.promo_expires_at.isoformat() if sub and sub.promo_expires_at else None
        ),
    )


@router.post("/portal-session", response_model=PortalSessionResponse)
async def create_portal_session(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    _require_paddle()
    url = await paddle_service.create_portal_session(db, current_user)
    return PortalSessionResponse(url=url)


@router.post("/cancel")
async def cancel_current_subscription(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    _require_paddle()
    sub = await subscription_service.get_user_subscription(db, current_user.id)
    if not sub or not sub.paddle_subscription_id:
        raise HTTPException(status_code=404, detail="No active subscription")
    await paddle_service.cancel_subscription(sub.paddle_subscription_id)
    return {"status": "scheduled"}


@router.post("/webhook")
async def paddle_webhook(
    request: Request,
    db: AsyncSession = Depends(get_db),
    paddle_signature: str | None = Header(default=None, alias="Paddle-Signature"),
):
    if not settings.PADDLE_WEBHOOK_SECRET:
        raise HTTPException(status_code=503, detail="Webhook not configured")

    # Must read the raw body — signature is over the raw bytes, not parsed JSON.
    raw_body = await request.body()
    if not paddle_service.verify_signature(paddle_signature, raw_body):
        raise HTTPException(status_code=400, detail="Invalid signature")

    try:
        event = paddle_service.parse_event_body(raw_body)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid JSON")

    await paddle_service.handle_webhook_event(db, event)
    return {"status": "ok"}
