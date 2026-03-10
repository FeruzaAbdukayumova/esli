"""
Card review service implementing SM-2 spaced repetition algorithm.

SM-2 Algorithm (SuperMemo 2):
- Each card has an ease factor (starting at 2.5, minimum 1.3)
- Each card tracks interval (days) and repetitions (consecutive correct answers)
- User responses: Again (forgot), Hard, Good, Easy
- Intervals grow exponentially based on ease factor
"""

import uuid
from datetime import datetime, timedelta, timezone
from typing import Literal

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.models.card import Card
from app.db.models.deck import Deck
from app.db.models.review_log import ReviewLog

# Response types (renamed from "rating" to be clearer)
Response = Literal["again", "hard", "good", "easy"]

# Constants for SM-2
MIN_EASE_FACTOR = 1.3
DEFAULT_EASE_FACTOR = 2.5


def compute_sm2(
    response: Response,
    current_ease: float,
    current_interval: int,
    current_reps: int,
) -> tuple[float, int, int, timedelta]:
    """
    SM-2 algorithm implementation.

    Returns: (new_ease, new_interval, new_reps, time_delta)

    Response effects:
    - Again: Reset progress, review in 1 minute (learning mode)
    - Hard: Slightly increase interval, decrease ease
    - Good: Normal progression using ease factor
    - Easy: Larger interval increase, boost ease
    """
    ease = current_ease
    interval = current_interval
    reps = current_reps

    if response == "again":
        # Forgot - reset to learning mode
        reps = 0
        interval = 0
        ease = max(MIN_EASE_FACTOR, ease - 0.2)
        delta = timedelta(minutes=1)

    elif response == "hard":
        # Struggled but got it
        if reps == 0:
            # Still in learning phase
            interval = 1
            delta = timedelta(minutes=10)
        else:
            # Review phase - small interval increase
            interval = max(1, int(interval * 1.2))
            delta = timedelta(days=interval)
        ease = max(MIN_EASE_FACTOR, ease - 0.15)
        reps += 1

    elif response == "good":
        # Normal recall
        if reps == 0:
            # First time correct - graduate from learning
            interval = 1
            delta = timedelta(days=1)
        elif reps == 1:
            # Second correct - 3 days
            interval = 3
            delta = timedelta(days=3)
        else:
            # Use ease factor for exponential growth
            interval = max(1, int(interval * ease))
            delta = timedelta(days=interval)
        reps += 1

    elif response == "easy":
        # Easy recall - accelerate
        if reps == 0:
            interval = 4
        else:
            interval = max(1, int(interval * ease * 1.3))
        ease = min(3.0, ease + 0.15)  # Cap ease at 3.0
        delta = timedelta(days=interval)
        reps += 1

    else:
        raise ValueError(f"Invalid response: {response}")

    return ease, interval, reps, delta


def get_next_intervals(
    current_ease: float,
    current_interval: int,
    current_reps: int,
) -> dict[str, str]:
    """
    Calculate what the next interval would be for each response option.
    Returns human-readable strings for UI display.
    """
    results = {}

    for response in ["again", "hard", "good", "easy"]:
        _, interval, _, delta = compute_sm2(
            response, current_ease, current_interval, current_reps
        )

        # Format for display
        if delta < timedelta(hours=1):
            results[response] = f"{int(delta.total_seconds() / 60)}m"
        elif delta < timedelta(days=1):
            results[response] = f"{int(delta.total_seconds() / 3600)}h"
        elif delta.days == 1:
            results[response] = "1d"
        elif delta.days < 30:
            results[response] = f"{delta.days}d"
        elif delta.days < 365:
            results[response] = f"{delta.days // 30}mo"
        else:
            results[response] = f"{delta.days // 365}y"

    return results


async def record_review(
    db: AsyncSession,
    card_id: uuid.UUID,
    owner_id: uuid.UUID,
    response: Response,
) -> Card | None:
    """
    Record a card review using SM-2 algorithm.

    - Loads card and verifies ownership
    - Computes new ease factor, interval, and repetitions
    - Updates next_review_at
    - Returns updated card or None if not found/not owned
    """
    result = await db.execute(
        select(Card).join(Deck).where(Card.id == card_id, Deck.owner_id == owner_id)
    )
    card = result.scalar_one_or_none()
    if not card:
        return None

    now = datetime.now(timezone.utc)

    # Compute new SM-2 values
    new_ease, new_interval, new_reps, delta = compute_sm2(
        response,
        card.ease_factor,
        card.interval,
        card.repetitions,
    )

    # Update card
    card.last_reviewed_at = now
    card.next_review_at = now + delta
    card.ease_factor = new_ease
    card.interval = new_interval
    card.repetitions = new_reps

    # Log the review for stats
    log = ReviewLog(
        user_id=owner_id,
        card_id=card_id,
        deck_id=card.deck_id,
        response=response,
        reviewed_at=now,
    )
    db.add(log)

    await db.commit()
    await db.refresh(card)
    return card


async def get_card_intervals(
    db: AsyncSession,
    card_id: uuid.UUID,
    owner_id: uuid.UUID,
) -> dict[str, str] | None:
    """
    Get the next intervals for each response option for a card.
    Used by frontend to show "Again (1m) | Hard (10m) | Good (1d) | Easy (4d)"
    """
    result = await db.execute(
        select(Card).join(Deck).where(Card.id == card_id, Deck.owner_id == owner_id)
    )
    card = result.scalar_one_or_none()
    if not card:
        return None

    return get_next_intervals(card.ease_factor, card.interval, card.repetitions)
