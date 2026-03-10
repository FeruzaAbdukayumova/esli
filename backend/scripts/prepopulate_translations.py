#!/usr/bin/env python3
"""
Pre-populate translations for cards in shared decks.

This script generates translations for cards in specified decks (or all shared decks)
for the priority languages. Translations are cached in the card's translations JSON field.

Usage:
    # Pre-populate all shared decks
    python scripts/prepopulate_translations.py

    # Pre-populate specific deck by ID
    python scripts/prepopulate_translations.py --deck-id <uuid>

    # Pre-populate specific languages only
    python scripts/prepopulate_translations.py --languages es,zh,ru

    # Dry run (show what would be translated without making API calls)
    python scripts/prepopulate_translations.py --dry-run

Requirements:
    - Database must be accessible
    - Uses free MyMemory translation API (no API key required)
"""

import argparse
import asyncio
import sys
from pathlib import Path

# Add parent directory to path for imports
sys.path.insert(0, str(Path(__file__).parent.parent))

from sqlalchemy import select
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker

from app.core.config import settings
from app.db.models.card import Card
from app.db.models.deck import Deck
from app.services.translation_service import (
    SUPPORTED_LANGUAGES,
    get_card_translation,
)

# Priority languages to pre-populate (most common user languages)
PRIORITY_LANGUAGES = ["es", "zh", "ru", "ar", "ja", "ko", "pt", "fr", "de", "hi"]


async def get_shared_decks(session: AsyncSession) -> list[Deck]:
    """Get all shared (public) decks."""
    result = await session.execute(
        select(Deck).where(Deck.is_shared == True)
    )
    return list(result.scalars().all())


async def get_deck_cards(session: AsyncSession, deck_id) -> list[Card]:
    """Get all cards for a specific deck."""
    result = await session.execute(
        select(Card).where(Card.deck_id == deck_id)
    )
    return list(result.scalars().all())


async def prepopulate_card_translations(
    session: AsyncSession,
    card: Card,
    languages: list[str],
    dry_run: bool = False,
) -> dict[str, int]:
    """Pre-populate translations for a single card.

    Returns dict with counts: {"generated": n, "cached": n, "failed": n}
    """
    stats = {"generated": 0, "cached": 0, "failed": 0}

    for lang in languages:
        # Skip if already cached
        if card.translations and lang in card.translations:
            stats["cached"] += 1
            continue

        if dry_run:
            print(f"  [DRY RUN] Would translate card {card.id} to {lang}")
            stats["generated"] += 1
            continue

        try:
            await get_card_translation(session, card, lang)
            stats["generated"] += 1
            print(f"  Translated card {card.id} to {lang}")
        except Exception as e:
            stats["failed"] += 1
            print(f"  ERROR translating card {card.id} to {lang}: {e}")

    return stats


async def prepopulate_deck_translations(
    session: AsyncSession,
    deck: Deck,
    languages: list[str],
    dry_run: bool = False,
) -> dict[str, int]:
    """Pre-populate translations for all cards in a deck."""
    print(f"\nProcessing deck: {deck.title} ({deck.id})")

    cards = await get_deck_cards(session, deck.id)
    print(f"  Found {len(cards)} cards")

    total_stats = {"generated": 0, "cached": 0, "failed": 0}

    for card in cards:
        if not card.front_text or not card.back_text:
            print(f"  Skipping card {card.id} (missing front/back text)")
            continue

        card_stats = await prepopulate_card_translations(
            session, card, languages, dry_run
        )
        for key in total_stats:
            total_stats[key] += card_stats[key]

    return total_stats


async def main(
    deck_id: str | None = None,
    languages: list[str] | None = None,
    dry_run: bool = False,
):
    """Main entry point for pre-population script."""
    # Use priority languages if not specified
    if not languages:
        languages = PRIORITY_LANGUAGES

    # Validate languages
    invalid_langs = [l for l in languages if l not in SUPPORTED_LANGUAGES]
    if invalid_langs:
        print(f"ERROR: Invalid languages: {invalid_langs}")
        print(f"Supported languages: {list(SUPPORTED_LANGUAGES.keys())}")
        sys.exit(1)

    print(f"Languages to populate: {languages}")
    print(f"Dry run: {dry_run}")

    # Create database session
    engine = create_async_engine(settings.DATABASE_URL)
    async_session = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

    async with async_session() as session:
        if deck_id:
            # Process specific deck
            result = await session.execute(
                select(Deck).where(Deck.id == deck_id)
            )
            deck = result.scalar_one_or_none()
            if not deck:
                print(f"ERROR: Deck {deck_id} not found")
                sys.exit(1)
            decks = [deck]
        else:
            # Process all shared decks
            decks = await get_shared_decks(session)
            print(f"Found {len(decks)} shared decks")

        if not decks:
            print("No decks to process")
            return

        grand_total = {"generated": 0, "cached": 0, "failed": 0}

        for deck in decks:
            deck_stats = await prepopulate_deck_translations(
                session, deck, languages, dry_run
            )
            for key in grand_total:
                grand_total[key] += deck_stats[key]

        print("\n" + "=" * 50)
        print("SUMMARY")
        print("=" * 50)
        print(f"Total translations generated: {grand_total['generated']}")
        print(f"Total already cached: {grand_total['cached']}")
        print(f"Total failed: {grand_total['failed']}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Pre-populate translations for shared deck cards"
    )
    parser.add_argument(
        "--deck-id",
        type=str,
        help="Specific deck ID to process (default: all shared decks)",
    )
    parser.add_argument(
        "--languages",
        type=str,
        help=f"Comma-separated list of language codes (default: {','.join(PRIORITY_LANGUAGES)})",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Show what would be translated without making API calls",
    )

    args = parser.parse_args()

    languages = args.languages.split(",") if args.languages else None

    asyncio.run(main(
        deck_id=args.deck_id,
        languages=languages,
        dry_run=args.dry_run,
    ))
