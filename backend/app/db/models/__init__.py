from app.db.base import Base

# Import all models here so Alembic can detect them
from app.db.models.user import User  # noqa: F401
from app.db.models.deck import Deck  # noqa: F401
from app.db.models.card import Card  # noqa: F401
from app.db.models.refresh_token import RefreshToken  # noqa: F401
from app.db.models.review_log import ReviewLog  # noqa: F401
from app.db.models.subscription import Subscription  # noqa: F401
from app.db.models.usage_tracking import UsageTracking  # noqa: F401
from app.db.models.promo_code import PromoCode  # noqa: F401
from app.db.models.chat_conversation import ChatConversation  # noqa: F401
from app.db.models.chat_message import ChatMessage  # noqa: F401
from app.db.models.analytics_event import AnalyticsEvent  # noqa: F401

__all__ = [
    "Base", "User", "Deck", "Card", "RefreshToken", "ReviewLog",
    "Subscription", "UsageTracking", "PromoCode", "ChatConversation", "ChatMessage",
    "AnalyticsEvent",
]
