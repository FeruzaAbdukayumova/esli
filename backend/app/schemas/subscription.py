from pydantic import BaseModel


class CheckoutSessionRequest(BaseModel):
    price_id: str


class CheckoutSessionResponse(BaseModel):
    url: str


class PortalSessionResponse(BaseModel):
    url: str


class UsageSummary(BaseModel):
    ai_generations_used: int
    ai_generations_limit: int  # -1 = unlimited
    period_start: str


class SubscriptionResponse(BaseModel):
    tier: str
    status: str
    billing_interval: str | None = None
    current_period_end: str | None = None
    cancel_at_period_end: bool = False
    usage: UsageSummary
    promo_tier: str | None = None
    promo_expires_at: str | None = None


class PlanLimits(BaseModel):
    ai_generations_per_month: int
    max_decks: int
    max_cards_per_deck: int
    max_total_cards: int
    max_batch_import: int
    max_ai_cards_per_generation: int
    pdf_ai_generation: bool
    pdf_max_pages: int
    max_ai_cards_per_pdf: int
    advanced_analytics: bool


class PlanInfo(BaseModel):
    tier: str
    name: str
    monthly_price: float
    yearly_price: float
    monthly_price_id: str | None = None
    yearly_price_id: str | None = None
    limits: PlanLimits


class PlansResponse(BaseModel):
    plans: list[PlanInfo]
    publishable_key: str | None = None  # Stripe (legacy)
    paddle_client_token: str | None = None
    paddle_env: str | None = None
