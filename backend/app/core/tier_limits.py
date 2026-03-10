from dataclasses import dataclass


@dataclass(frozen=True)
class TierLimits:
    ai_generations_per_month: int  # -1 = unlimited
    max_decks: int  # -1 = unlimited
    max_cards_per_deck: int
    max_total_cards: int
    max_batch_import: int
    max_ai_cards_per_generation: int
    pdf_ai_generation: bool
    pdf_max_pages: int  # -1 = unlimited, max pages per PDF upload
    max_ai_cards_per_pdf: int  # max cards from a single PDF generation
    advanced_analytics: bool
    max_shared_decks: int  # -1 = unlimited


TIER_LIMITS: dict[str, TierLimits] = {
    "free": TierLimits(
        ai_generations_per_month=5,
        max_decks=20,
        max_cards_per_deck=100,
        max_total_cards=500,
        max_batch_import=100,
        max_ai_cards_per_generation=20,
        pdf_ai_generation=True,
        pdf_max_pages=5,
        max_ai_cards_per_pdf=10,
        advanced_analytics=False,
        max_shared_decks=1,
    ),
    "pro": TierLimits(
        ai_generations_per_month=50,
        max_decks=100,
        max_cards_per_deck=500,
        max_total_cards=5000,
        max_batch_import=500,
        max_ai_cards_per_generation=50,
        pdf_ai_generation=True,
        pdf_max_pages=-1,
        max_ai_cards_per_pdf=50,
        advanced_analytics=True,
        max_shared_decks=10,
    ),
    "premium": TierLimits(
        ai_generations_per_month=200,
        max_decks=-1,
        max_cards_per_deck=2000,
        max_total_cards=50000,
        max_batch_import=500,
        max_ai_cards_per_generation=100,
        pdf_ai_generation=True,
        pdf_max_pages=-1,
        max_ai_cards_per_pdf=100,
        advanced_analytics=True,
        max_shared_decks=-1,
    ),
}


def get_limits(tier: str) -> TierLimits:
    return TIER_LIMITS.get(tier, TIER_LIMITS["free"])
