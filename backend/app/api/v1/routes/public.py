import asyncio
import uuid
from math import ceil

from fastapi import APIRouter, Depends, HTTPException, Query, status
from fastapi.responses import Response
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.v1.deps import get_current_user
from app.db.models.deck import Deck
from app.db.models.user import User
from app.db.session import get_db
from app.schemas.deck import (
    PublicDeckResponse,
    PublicDeckListResponse,
    DeckCopyResponse,
)
from app.schemas.card import CardResponse
from app.services import deck_service
from app.services.telegram_service import notify_deck_copy

router = APIRouter()


@router.get("/decks", response_model=PublicDeckListResponse)
async def list_public_decks(
    db: AsyncSession = Depends(get_db),
    page: int = Query(1, ge=1, description="Page number"),
    per_page: int = Query(20, ge=1, le=100, description="Items per page"),
    search: str | None = Query(None, description="Search in title and tags"),
    sort_by: str = Query("popular", description="Sort by: popular, recent, title"),
    category: str | None = Query(None, description="Filter by category tag"),
):
    """
    Browse public shared decks.
    No authentication required.
    """
    decks, total = await deck_service.list_public_decks(
        db, page=page, per_page=per_page, search=search, sort_by=sort_by, category=category
    )

    total_pages = ceil(total / per_page) if total > 0 else 1

    return PublicDeckListResponse(
        decks=[PublicDeckResponse(**d) for d in decks],
        total=total,
        page=page,
        per_page=per_page,
        total_pages=total_pages,
    )


@router.get("/decks/{deck_id}", response_model=PublicDeckResponse)
async def get_public_deck(
    deck_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
):
    """
    Get a single public deck by ID.
    No authentication required.
    """
    deck = await deck_service.get_public_deck_by_id(db, deck_id)

    if not deck:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Deck not found or not public",
        )

    return PublicDeckResponse(**deck)


@router.get("/decks/{deck_id}/cards", response_model=list[CardResponse])
async def get_public_deck_cards(
    deck_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
    limit: int = Query(10, ge=1, le=500, description="Number of cards to return"),
):
    """
    Get preview cards from a public deck.
    Limited to prevent full deck scraping without copying.
    No authentication required.
    """
    cards = await deck_service.get_public_deck_cards(db, deck_id, limit=limit)

    if cards is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Deck not found or not public",
        )

    return [CardResponse.model_validate(c) for c in cards]


@router.post("/decks/{deck_id}/copy", response_model=DeckCopyResponse)
async def copy_public_deck(
    deck_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """
    Copy a public deck to your library.
    Requires authentication.
    """
    result = await deck_service.copy_deck(db, deck_id, current_user.id)

    if result is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Deck not found or not public",
        )

    new_deck, card_count = result

    asyncio.create_task(notify_deck_copy(new_deck.title, card_count, current_user.username))

    return DeckCopyResponse(
        id=new_deck.id,
        title=new_deck.title,
        category_tags=new_deck.category_tags,
        card_count=card_count,
        message=f"Successfully copied deck with {card_count} cards",
    )


@router.get("/sitemap.xml", include_in_schema=False)
async def public_sitemap(db: AsyncSession = Depends(get_db)):
    """
    Generate a sitemap containing all public deck URLs.
    """
    base_url = "https://flashcards-app.com"

    result = await db.execute(
        select(Deck.id, Deck.updated_at)
        .where(Deck.is_shared == True)
        .order_by(Deck.updated_at.desc())
    )
    decks = result.all()

    lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        # Static pages
        f"  <url><loc>{base_url}/browse</loc><changefreq>daily</changefreq><priority>0.9</priority></url>",
        f"  <url><loc>{base_url}/login</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>",
        f"  <url><loc>{base_url}/register</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>",
        f"  <url><loc>{base_url}/pricing</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>",
    ]

    for deck_id, updated_at in decks:
        lastmod = updated_at.strftime("%Y-%m-%d") if updated_at else ""
        lastmod_tag = f"<lastmod>{lastmod}</lastmod>" if lastmod else ""
        lines.append(
            f"  <url><loc>{base_url}/browse/{deck_id}</loc>{lastmod_tag}<changefreq>weekly</changefreq><priority>0.8</priority></url>"
        )

    lines.append("</urlset>")

    return Response(
        content="\n".join(lines),
        media_type="application/xml",
    )
