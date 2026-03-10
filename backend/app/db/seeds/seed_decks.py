"""
Seed script for premade flashcard decks.

Creates a system user and inserts shared public decks from JSON fixtures.
Idempotent — skips decks that already exist (matched by title + system user).

Usage (from backend dir):
    python3 -m app.db.seeds.seed_decks

Or with Docker:
    docker compose exec backend python -m app.db.seeds.seed_decks
"""
from __future__ import annotations

import asyncio
import json
import os
import uuid
from datetime import datetime, timezone
from pathlib import Path

from dotenv import load_dotenv
from sqlalchemy import Column, String, Boolean, Integer, Float, DateTime, ForeignKey, text
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker, declarative_base

# Load .env for DATABASE_URL
load_dotenv(Path(__file__).resolve().parents[3] / ".env")

DATABASE_URL = os.environ.get("DATABASE_URL")
if not DATABASE_URL:
    raise RuntimeError("DATABASE_URL not set. Check your .env file.")

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


engine = create_async_engine(DATABASE_URL, echo=False)
AsyncSessionLocal = sessionmaker(bind=engine, class_=AsyncSession, expire_on_commit=False)


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
            "preferred_language, daily_new_card_limit, theme, dark_mode, created_at) "
            "VALUES (:id, :email, NULL, :auth_provider, :username, "
            "'en', 20, 'indigo', 'system', :created_at)"
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


async def main():
    print("Seeding premade decks...")
    print()

    fixture_files = sorted(FIXTURES_DIR.glob("*.json"))
    if not fixture_files:
        print("No fixture files found!")
        return

    async with AsyncSessionLocal() as session:
        async with session.begin():
            user_id = await get_or_create_system_user(session)
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
