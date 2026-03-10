import logging

import stripe as stripe_lib
from fastapi import APIRouter, Depends, Header, HTTPException, Request, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.v1.deps import get_current_user
from app.core.config import settings
from app.core.tier_limits import get_limits
from app.db.models.user import User
from app.db.session import get_db
from app.schemas.subscription import (
    CheckoutSessionRequest,
    CheckoutSessionResponse,
    PlansResponse,
    PlanInfo,
    PlanLimits,
    PortalSessionResponse,
    SubscriptionResponse,
    UsageSummary,
)
from app.services import subscription_service, usage_service

logger = logging.getLogger(__name__)

router = APIRouter()


def _require_stripe() -> None:
    if not settings.STRIPE_SECRET_KEY:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Payment system is not configured.",
        )


@router.post("/create-checkout-session", response_model=CheckoutSessionResponse)
async def create_checkout_session(
    payload: CheckoutSessionRequest,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    _require_stripe()
    valid_price_ids = {
        settings.STRIPE_PRO_MONTHLY_PRICE_ID,
        settings.STRIPE_PRO_YEARLY_PRICE_ID,
        settings.STRIPE_PREMIUM_MONTHLY_PRICE_ID,
        settings.STRIPE_PREMIUM_YEARLY_PRICE_ID,
    }
    if payload.price_id not in valid_price_ids:
        raise HTTPException(status_code=400, detail="Invalid price ID")

    url = await subscription_service.create_checkout_session(db, current_user, payload.price_id)
    return CheckoutSessionResponse(url=url)


@router.post("/create-portal-session", response_model=PortalSessionResponse)
async def create_portal_session(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    _require_stripe()
    url = await subscription_service.create_customer_portal_session(db, current_user)
    return PortalSessionResponse(url=url)


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
        current_period_end=sub.current_period_end.isoformat() if sub and sub.current_period_end else None,
        cancel_at_period_end=sub.cancel_at_period_end if sub else False,
        usage=UsageSummary(**usage),
        promo_tier=sub.promo_tier if sub else None,
        promo_expires_at=sub.promo_expires_at.isoformat() if sub and sub.promo_expires_at else None,
    )


@router.get("/plans", response_model=PlansResponse)
async def get_plans():
    plans = []
    for tier_name, display_name, monthly_price, yearly_price, monthly_pid, yearly_pid in [
        ("free", "Free", 0, 0, None, None),
        ("pro", "Pro", 5, 49, settings.STRIPE_PRO_MONTHLY_PRICE_ID, settings.STRIPE_PRO_YEARLY_PRICE_ID),
        ("premium", "Premium", 12, 99, settings.STRIPE_PREMIUM_MONTHLY_PRICE_ID, settings.STRIPE_PREMIUM_YEARLY_PRICE_ID),
    ]:
        limits = get_limits(tier_name)
        plans.append(PlanInfo(
            tier=tier_name,
            name=display_name,
            monthly_price=monthly_price,
            yearly_price=yearly_price,
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
        ))

    return PlansResponse(plans=plans, publishable_key=settings.STRIPE_PUBLISHABLE_KEY)


@router.post("/webhook")
async def stripe_webhook(
    request: Request,
    db: AsyncSession = Depends(get_db),
    stripe_signature: str = Header(alias="Stripe-Signature"),
):
    if not settings.STRIPE_WEBHOOK_SECRET:
        raise HTTPException(status_code=503, detail="Webhook not configured")

    body = await request.body()
    try:
        event = stripe_lib.Webhook.construct_event(
            body, stripe_signature, settings.STRIPE_WEBHOOK_SECRET
        )
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid payload")
    except stripe_lib.SignatureVerificationError:
        raise HTTPException(status_code=400, detail="Invalid signature")

    await subscription_service.handle_webhook_event(db, event)
    return {"status": "ok"}
