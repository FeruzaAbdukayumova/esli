import json
import logging
import re
import time
from collections import defaultdict

from fastapi import APIRouter, Depends, File, Form, HTTPException, Request, UploadFile, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.v1.deps import get_optional_current_user
from app.core.config import settings
from app.core.tier_limits import get_limits
from app.db.models.user import User
from app.db.session import get_db
from app.schemas.ai_generation import (
    AIGenerateRequest,
    AIGenerateResponse,
    AIGeneratedCard,
    AIEditCardsRequest,
    AIEditCardsResponse,
    AIEditedCard,
)
from app.services import ai_generation_service, subscription_service, usage_service

MAX_PDF_SIZE = 10 * 1024 * 1024  # 10 MB

logger = logging.getLogger(__name__)

router = APIRouter()

# Simple in-memory IP rate limiter for guest users
_ip_usage: dict[str, list[float]] = defaultdict(list)
_IP_RATE_LIMIT = 3  # max generations per hour for guests
_IP_RATE_WINDOW = 3600  # 1 hour in seconds


def _count_pdf_pages(pdf_data: bytes) -> int:
    """Estimate page count from raw PDF bytes without external libraries."""
    try:
        text = pdf_data.decode("latin-1")
        # Try the /Count entry in the root /Pages dictionary (most reliable)
        match = re.search(r"/Type\s*/Pages\b[^>]*/Count\s+(\d+)", text)
        if match:
            return int(match.group(1))
        # Fallback: count individual /Type /Page (not /Pages) entries
        pages = re.findall(r"/Type\s*/Page\b(?!\s*s)", text)
        return max(len(pages), 1)
    except Exception:
        return 0


def _check_ip_rate_limit(request: Request) -> None:
    client_ip = request.client.host if request.client else "unknown"
    now = time.time()
    # Clean old entries
    _ip_usage[client_ip] = [t for t in _ip_usage[client_ip] if now - t < _IP_RATE_WINDOW]
    if len(_ip_usage[client_ip]) >= _IP_RATE_LIMIT:
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Rate limit exceeded. Sign in for more AI generations.",
        )
    _ip_usage[client_ip].append(now)


@router.post("/generate-cards", response_model=AIGenerateResponse)
async def generate_cards(
    payload: AIGenerateRequest,
    request: Request,
    db: AsyncSession = Depends(get_db),
    current_user: User | None = Depends(get_optional_current_user),
):
    """Generate flashcards using AI based on a topic."""
    if not settings.ANTHROPIC_API_KEY:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="AI generation is not available. API key not configured.",
        )

    # Tier enforcement
    if current_user:
        tier = await subscription_service.get_user_tier(db, current_user.id)
        limits = get_limits(tier)
        allowed, used, limit = await usage_service.check_ai_limit(db, current_user.id, tier)
        if not allowed:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"AI generation limit reached ({used}/{limit}). Upgrade your plan for more.",
            )
        payload.count = min(payload.count, limits.max_ai_cards_per_generation)
    else:
        _check_ip_rate_limit(request)
        payload.count = min(payload.count, 20)

    try:
        result = await ai_generation_service.generate_cards(
            topic=payload.topic,
            count=payload.count,
            include_deck_info=payload.include_deck_info,
            existing_fronts=payload.existing_fronts,
            language=payload.language,
        )
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=str(e),
        ) from e
    except Exception as e:
        logger.error("AI generation failed: %s", e)
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="AI generation failed. Please try again.",
        ) from e

    # Record usage for authenticated users
    if current_user:
        await usage_service.increment_ai_usage(db, current_user.id)

    return AIGenerateResponse(
        cards=[AIGeneratedCard(**c) for c in result["cards"]],
        suggested_title=result.get("suggested_title"),
        suggested_tags=result.get("suggested_tags"),
    )


@router.post("/generate-cards-from-pdf", response_model=AIGenerateResponse)
async def generate_cards_from_pdf(
    request: Request,
    file: UploadFile = File(...),
    count: int = Form(10),
    topic: str = Form(""),
    existing_fronts: str = Form(""),
    language: str = Form(""),
    db: AsyncSession = Depends(get_db),
    current_user: User | None = Depends(get_optional_current_user),
):
    """Generate flashcards by analyzing a PDF document."""
    if not settings.ANTHROPIC_API_KEY:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="AI generation is not available. API key not configured.",
        )

    # Tier enforcement
    if current_user:
        tier = await subscription_service.get_user_tier(db, current_user.id)
        limits = get_limits(tier)
        if not limits.pdf_ai_generation:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="PDF AI generation requires a Pro or Premium plan.",
            )
        allowed, used, limit = await usage_service.check_ai_limit(db, current_user.id, tier)
        if not allowed:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"AI generation limit reached ({used}/{limit}). Upgrade your plan for more.",
            )
        count = min(count, limits.max_ai_cards_per_pdf)
        max_pages = limits.pdf_max_pages
    else:
        # Guest users: IP rate limit + free tier limits
        _check_ip_rate_limit(request)
        free_limits = get_limits("free")
        count = min(count, free_limits.max_ai_cards_per_pdf)
        max_pages = free_limits.pdf_max_pages

    if file.content_type != "application/pdf":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only PDF files are supported.",
        )

    pdf_data = await file.read()

    if len(pdf_data) > MAX_PDF_SIZE:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="PDF file is too large. Maximum size is 10 MB.",
        )

    # Check page count limit
    if max_pages > 0:
        page_count = _count_pdf_pages(pdf_data)
        if page_count > max_pages:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"PDF has {page_count} pages (limit: {max_pages}). Upgrade your plan for longer documents.",
            )

    if count < 1 or count > 100:
        count = max(1, min(100, count))

    parsed_existing_fronts: list[str] | None = None
    if existing_fronts.strip():
        try:
            parsed = json.loads(existing_fronts)
            if isinstance(parsed, list):
                parsed_existing_fronts = [str(f) for f in parsed]
        except json.JSONDecodeError:
            pass

    try:
        result = await ai_generation_service.generate_cards_from_pdf(
            pdf_data=pdf_data,
            count=count,
            topic=topic.strip() or None,
            existing_fronts=parsed_existing_fronts,
            language=language.strip() or None,
        )
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=str(e),
        ) from e
    except Exception as e:
        logger.error("AI PDF generation failed: %s", e)
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="AI generation failed. Please try again.",
        ) from e

    # Record usage
    if current_user:
        await usage_service.increment_ai_usage(db, current_user.id)

    return AIGenerateResponse(
        cards=[AIGeneratedCard(**c) for c in result["cards"]],
        suggested_title=result.get("suggested_title"),
        suggested_tags=result.get("suggested_tags"),
    )


@router.post("/edit-cards", response_model=AIEditCardsResponse)
async def edit_cards_endpoint(
    payload: AIEditCardsRequest,
    request: Request,
    db: AsyncSession = Depends(get_db),
    current_user: User | None = Depends(get_optional_current_user),
):
    """Edit existing flashcards using AI based on a free-form instruction."""
    if not settings.ANTHROPIC_API_KEY:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="AI generation is not available. API key not configured.",
        )

    # Tier enforcement (counts as 1 AI generation)
    if current_user:
        tier = await subscription_service.get_user_tier(db, current_user.id)
        allowed, used, limit = await usage_service.check_ai_limit(db, current_user.id, tier)
        if not allowed:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"AI generation limit reached ({used}/{limit}). Upgrade your plan for more.",
            )
    else:
        _check_ip_rate_limit(request)

    cards_for_service = [
        {"id": c.id, "front_text": c.front_text, "back_text": c.back_text}
        for c in payload.cards
    ]

    try:
        edited = await ai_generation_service.edit_cards(
            cards=cards_for_service,
            instruction=payload.instruction,
        )
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=str(e),
        ) from e
    except Exception as e:
        logger.error("AI card edit failed: %s", e)
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="AI edit failed. Please try again.",
        ) from e

    # Record usage for authenticated users
    if current_user:
        await usage_service.increment_ai_usage(db, current_user.id)

    return AIEditCardsResponse(
        cards=[AIEditedCard(**c) for c in edited],
    )
