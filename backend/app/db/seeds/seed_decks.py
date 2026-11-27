"""
Seed script for premade flashcard decks.

Creates a system user and inserts shared public decks from JSON fixtures.
Idempotent — skips decks that already exist (matched by title + system user).

Usage (from backend dir):
    python3 -m app.db.seeds.seed_decks                   # add new decks only
    python3 -m app.db.seeds.seed_decks --update          # DRY RUN: show what would change
    python3 -m app.db.seeds.seed_decks --update --apply  # update existing decks in place
    python3 -m app.db.seeds.seed_decks --reset           # delete old shared decks, then re-seed

--update keeps deck IDs (public links, sitemap URLs and copy counts survive).
Decks are matched by title, cards by front text: changed backs are updated,
new cards are added, cards no longer in the fixture are removed. Decks owned by
the system user that are not in the fixtures are reported, never deleted.
Users' copied decks are separate decks and are never touched.

Or with Railway:
    railway run python -m app.db.seeds.seed_decks --update
"""
from __future__ import annotations

import asyncio
import json
import os
import sys
import uuid
from collections import defaultdict
from datetime import datetime, timezone
from pathlib import Path

from dotenv import load_dotenv
from sqlalchemy import Column, String, Boolean, Integer, Float, DateTime, ForeignKey, text
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker, declarative_base

# Load .env for DATABASE_URL
load_dotenv(Path(__file__).resolve().parents[3] / ".env")

DATABASE_URL = os.environ.get("DATABASE_URL")

SYSTEM_EMAIL = "system@flashcards.app"
FIXTURES_DIR = Path(__file__).parent / "fixtures"

# Minimal ORM models (standalone, no app imports)
Base = declarative_base()


class User(Base):
    __tablename__ = "users"
    id = Column(String, primary_key=True)
    email = Column(String(320), unique=True, nullable=False)
    password_hash = Column(String(255), nullable=True)
    auth_provider = Column(String(32), default="password")
    username = Column(String(50), nullable=True)
    preferred_language = Column(String(10), default="en")
    daily_new_card_limit = Column(Integer, default=20)
    theme = Column(String(20), default="indigo")
    dark_mode = Column(String(10), default="system")
    created_at = Column(DateTime(timezone=True))


class Deck(Base):
    __tablename__ = "decks"
    id = Column(String, primary_key=True)
    owner_id = Column(String, ForeignKey("users.id"))
    title = Column(String(255), nullable=False)
    category_tags = Column(String(500), default="")
    is_shared = Column(Boolean, default=False)
    copy_count = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True))
    updated_at = Column(DateTime(timezone=True))


class Card(Base):
    __tablename__ = "cards"
    id = Column(String, primary_key=True)
    deck_id = Column(String, ForeignKey("decks.id"))
    front_text = Column(String(1000), nullable=True)
    back_text = Column(String(1000), nullable=True)
    front_image_url = Column(String(500), nullable=True)
    back_image_url = Column(String(500), nullable=True)
    ease_factor = Column(Float, default=2.5)
    interval = Column(Integer, default=0)
    repetitions = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True))
    updated_at = Column(DateTime(timezone=True))


def make_engine():
    if not DATABASE_URL:
        raise RuntimeError("DATABASE_URL not set. Check your .env file.")
    return create_async_engine(DATABASE_URL, echo=False)


async def get_or_create_system_user(session: AsyncSession):
    result = await session.execute(
        text("SELECT id FROM users WHERE email = :email"),
        {"email": SYSTEM_EMAIL},
    )
    row = result.fetchone()
    if row:
        user_id = str(row[0])
        print(f"  System user already exists: {user_id}")
        return user_id

    user_id = str(uuid.uuid4())
    now = datetime.now(timezone.utc)
    await session.execute(
        text(
            "INSERT INTO users (id, email, password_hash, auth_provider, username, "
            "preferred_language, daily_new_card_limit, theme, dark_mode, is_admin, created_at) "
            "VALUES (:id, :email, NULL, :auth_provider, :username, "
            "'en', 20, 'indigo', 'system', false, :created_at)"
        ),
        {
            "id": user_id,
            "email": SYSTEM_EMAIL,
            "auth_provider": "system",
            "username": "Flashcards",
            "created_at": now,
        },
    )
    print(f"  Created system user: {user_id}")
    return user_id


async def seed_deck(session: AsyncSession, user_id: str, fixture_path: Path) -> bool:
    with open(fixture_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    title = data["title"]

    # Check if deck already exists for this user
    result = await session.execute(
        text("SELECT id FROM decks WHERE title = :title AND owner_id = :owner_id"),
        {"title": title, "owner_id": user_id},
    )
    if result.fetchone():
        print(f"  SKIP (exists): {title}")
        return False

    now = datetime.now(timezone.utc)
    deck_id = str(uuid.uuid4())

    await session.execute(
        text(
            "INSERT INTO decks (id, owner_id, title, category_tags, is_shared, copy_count, created_at, updated_at) "
            "VALUES (:id, :owner_id, :title, :category_tags, TRUE, 0, :now, :now)"
        ),
        {
            "id": deck_id,
            "owner_id": user_id,
            "title": title,
            "category_tags": data.get("category_tags", ""),
            "now": now,
        },
    )

    for card_data in data["cards"]:
        await session.execute(
            text(
                "INSERT INTO cards (id, deck_id, front_text, back_text, ease_factor, interval, repetitions, created_at, updated_at) "
                "VALUES (:id, :deck_id, :front, :back, 2.5, 0, 0, :now, :now)"
            ),
            {
                "id": str(uuid.uuid4()),
                "deck_id": deck_id,
                "front": card_data["front"],
                "back": card_data["back"],
                "now": now,
            },
        )

    print(f"  ADDED: {title} ({len(data['cards'])} cards)")
    return True


def plan_card_changes(existing, fixture_cards):
    """Diff the cards in the DB against a fixture.

    existing: list of (card_id, front, back) currently in the deck.
    fixture_cards: list of {"front", "back"} dicts from the JSON fixture.
    Returns (updates, inserts, deletes):
      updates: [(card_id, front, new_back)] for cards whose back changed
      inserts: [card_dict] for fixture cards with no matching front
      deletes: [(card_id, front)] for DB cards no longer in the fixture
    """
    by_front = defaultdict(list)
    for card_id, front, back in existing:
        by_front[front].append((card_id, back))

    updates, inserts = [], []
    for card in fixture_cards:
        bucket = by_front.get(card["front"])
        if bucket:
            card_id, back = bucket.pop(0)
            if back != card["back"]:
                updates.append((card_id, card["front"], card["back"]))
        else:
            inserts.append(card)

    deletes = [(card_id, front) for front, items in by_front.items() for card_id, _ in items]
    return updates, inserts, deletes


async def get_system_user_id(session: AsyncSession):
    result = await session.execute(
        text("SELECT id FROM users WHERE email = :email"),
        {"email": SYSTEM_EMAIL},
    )
    row = result.fetchone()
    return str(row[0]) if row else None


async def update_deck(session: AsyncSession, user_id, fixture_path: Path, apply: bool) -> str:
    """Update one shared deck in place. Returns 'new', 'changed' or 'same'."""
    with open(fixture_path, "r", encoding="utf-8") as f:
        data = json.load(f)
    title = data["title"]
    tags = data.get("category_tags", "")

    row = None
    if user_id:
        result = await session.execute(
            text("SELECT id, category_tags FROM decks WHERE title = :title AND owner_id = :owner_id"),
            {"title": title, "owner_id": user_id},
        )
        row = result.fetchone()

    if not row:
        print(f"  NEW: {title} ({len(data['cards'])} cards)")
        if apply:
            await seed_deck(session, user_id, fixture_path)
        return "new"

    deck_id, current_tags = str(row[0]), row[1] or ""
    result = await session.execute(
        text("SELECT id, front_text, back_text FROM cards WHERE deck_id = :deck_id ORDER BY created_at, id"),
        {"deck_id": deck_id},
    )
    existing = [(str(r[0]), r[1], r[2]) for r in result.fetchall()]
    updates, inserts, deletes = plan_card_changes(existing, data["cards"])
    tags_changed = current_tags != tags

    if not (updates or inserts or deletes or tags_changed):
        print(f"  SAME: {title}")
        return "same"

    print(f"  UPDATE: {title}: {len(updates)} changed, {len(inserts)} added, {len(deletes)} removed"
          + (", tags changed" if tags_changed else ""))
    for _, front, _ in updates:
        print(f"      ~ {front}")
    for card in inserts:
        print(f"      + {card['front']}")
    for _, front in deletes:
        print(f"      - {front}")

    if not apply:
        return "changed"

    now = datetime.now(timezone.utc)
    for card_id, _, back in updates:
        await session.execute(
            text("UPDATE cards SET back_text = :back, updated_at = :now WHERE id = :id"),
            {"back": back, "now": now, "id": card_id},
        )
    for card in inserts:
        await session.execute(
            text(
                "INSERT INTO cards (id, deck_id, front_text, back_text, ease_factor, interval, repetitions, created_at, updated_at) "
                "VALUES (:id, :deck_id, :front, :back, 2.5, 0, 0, :now, :now)"
            ),
            {"id": str(uuid.uuid4()), "deck_id": deck_id, "front": card["front"], "back": card["back"], "now": now},
        )
    for card_id, _ in deletes:
        await session.execute(text("DELETE FROM cards WHERE id = :id"), {"id": card_id})
    await session.execute(
        text("UPDATE decks SET category_tags = :tags, updated_at = :now WHERE id = :id"),
        {"tags": tags, "now": now, "id": deck_id},
    )
    return "changed"


async def report_orphan_decks(session: AsyncSession, user_id, fixture_titles):
    if not user_id:
        return
    result = await session.execute(
        text("SELECT title FROM decks WHERE owner_id = :owner_id AND is_shared = TRUE"),
        {"owner_id": user_id},
    )
    orphans = sorted(r[0] for r in result.fetchall() if r[0] not in fixture_titles)
    for title in orphans:
        print(f"  NOT IN FIXTURES (left untouched): {title}")


async def run_update(session_factory, fixture_files, apply: bool):
    print("Updating premade decks in place" + ("" if apply else " (DRY RUN, nothing is written)") + "...")
    print()
    counts = defaultdict(int)
    async with session_factory() as session:
        async with session.begin():
            user_id = await get_system_user_id(session)
            if not user_id:
                print("  System user not found." + (" Creating it." if apply else ""))
                if apply:
                    user_id = await get_or_create_system_user(session)
            titles = set()
            for fixture_path in fixture_files:
                with open(fixture_path, "r", encoding="utf-8") as f:
                    titles.add(json.load(f)["title"])
                counts[await update_deck(session, user_id, fixture_path, apply)] += 1
            await report_orphan_decks(session, user_id, titles)
    print()
    verb = "Applied" if apply else "Would apply"
    print(f"{verb}: {counts['changed']} updated, {counts['new']} new, {counts['same']} unchanged.")
    if not apply and (counts["changed"] or counts["new"]):
        print("Run again with --update --apply to write these changes.")


async def reset_shared_decks(session: AsyncSession, user_id: str):
    """Delete all shared decks (and their cards) owned by the system user."""
    result = await session.execute(
        text("SELECT id, title FROM decks WHERE owner_id = :owner_id AND is_shared = TRUE"),
        {"owner_id": user_id},
    )
    decks = result.fetchall()
    if not decks:
        print("  No existing shared decks to delete.")
        return

    deck_ids = [str(row[0]) for row in decks]
    for deck_id in deck_ids:
        await session.execute(
            text("DELETE FROM cards WHERE deck_id = :deck_id"),
            {"deck_id": deck_id},
        )
        await session.execute(
            text("DELETE FROM decks WHERE id = :id"),
            {"id": deck_id},
        )

    print(f"  Deleted {len(decks)} shared deck(s) and their cards.")


async def main():
    reset = "--reset" in sys.argv
    update = "--update" in sys.argv
    apply = "--apply" in sys.argv
    if update and reset:
        print("Use either --update or --reset, not both.")
        return
    if apply and not update:
        print("--apply only works together with --update.")
        return

    engine = make_engine()
    AsyncSessionLocal = sessionmaker(bind=engine, class_=AsyncSession, expire_on_commit=False)

    if update:
        fixture_files = sorted(FIXTURES_DIR.glob("*.json"))
        await run_update(AsyncSessionLocal, fixture_files, apply)
        await engine.dispose()
        return

    print("Seeding premade decks...")
    if reset:
        print("  (--reset flag: will delete existing shared decks first)")
    print()

    fixture_files = sorted(FIXTURES_DIR.glob("*.json"))
    if not fixture_files:
        print("No fixture files found!")
        return

    async with AsyncSessionLocal() as session:
        async with session.begin():
            user_id = await get_or_create_system_user(session)
            print()

            if reset:
                await reset_shared_decks(session, user_id)
                print()

            added = 0
            for fixture_path in fixture_files:
                if await seed_deck(session, user_id, fixture_path):
                    added += 1

    await engine.dispose()

    print()
    print(f"Done! Added {added} new deck(s) from {len(fixture_files)} fixture(s).")


if __name__ == "__main__":
    asyncio.run(main())
