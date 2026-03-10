"""
Dashboard stats service.

Aggregates card/review data into dashboard statistics.
"""

import uuid
from datetime import datetime, timedelta, timezone, date

from sqlalchemy import select, func, case, and_, distinct
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.models.card import Card
from app.db.models.deck import Deck
from app.db.models.review_log import ReviewLog
from app.schemas.stats import (
    DashboardStatsResponse,
    LastStudiedDeck,
    DeckProgress,
    DayForecast,
)


async def get_user_stats(db: AsyncSession, user_id: uuid.UUID, daily_new_card_limit: int = 20) -> DashboardStatsResponse:
    now = datetime.now(timezone.utc)
    today_start = now.replace(hour=0, minute=0, second=0, microsecond=0)

    # --- Last studied deck ---
    last_studied_deck = None
    last_card_result = await db.execute(
        select(Card.deck_id, Deck.title)
        .join(Deck, Card.deck_id == Deck.id)
        .where(Deck.owner_id == user_id, Card.last_reviewed_at.is_not(None))
        .order_by(Card.last_reviewed_at.desc())
        .limit(1)
    )
    row = last_card_result.first()
    if row:
        last_studied_deck = LastStudiedDeck(id=str(row.deck_id), title=row.title)

    # --- Total decks & total cards ---
    totals_result = await db.execute(
        select(
            func.count(distinct(Deck.id)).label("total_decks"),
            func.count(Card.id).label("total_cards"),
        )
        .select_from(Deck)
        .outerjoin(Card, Card.deck_id == Deck.id)
        .where(Deck.owner_id == user_id)
    )
    totals = totals_result.first()
    total_decks = totals.total_decks if totals else 0
    total_cards = totals.total_cards if totals else 0

    # --- Cards due today (split new vs review) ---
    review_due_result = await db.execute(
        select(func.count(Card.id))
        .join(Deck, Card.deck_id == Deck.id)
        .where(
            Deck.owner_id == user_id,
            Card.next_review_at <= now,
        )
    )
    review_due = review_due_result.scalar() or 0

    new_available_result = await db.execute(
        select(func.count(Card.id))
        .join(Deck, Card.deck_id == Deck.id)
        .where(
            Deck.owner_id == user_id,
            Card.next_review_at.is_(None),
        )
    )
    new_cards_available = new_available_result.scalar() or 0
    new_today = min(new_cards_available, daily_new_card_limit)
    cards_due_today = review_due + new_today

    # --- Cards reviewed today ---
    reviewed_today_result = await db.execute(
        select(func.count(ReviewLog.id))
        .where(
            ReviewLog.user_id == user_id,
            ReviewLog.reviewed_at >= today_start,
        )
    )
    cards_reviewed_today = reviewed_today_result.scalar() or 0

    # --- Mastery percent (interval >= 21 days = mature) ---
    if total_cards > 0:
        mature_result = await db.execute(
            select(func.count(Card.id))
            .join(Deck, Card.deck_id == Deck.id)
            .where(Deck.owner_id == user_id, Card.interval >= 21)
        )
        mature_count = mature_result.scalar() or 0
        mastery_percent = round(mature_count / total_cards * 100, 1)
    else:
        mastery_percent = 0.0

    # --- Streak days ---
    streak_days = 0
    day_col = func.date_trunc("day", ReviewLog.reviewed_at).label("day")
    streak_result = await db.execute(
        select(day_col)
        .where(ReviewLog.user_id == user_id)
        .group_by(day_col)
        .order_by(day_col.desc())
    )
    review_days = [row.day.date() if hasattr(row.day, "date") else row.day for row in streak_result.all()]
    if review_days:
        check_date = date.today()
        # Allow today or yesterday as streak start
        if review_days[0] == check_date:
            streak_days = 1
            check_date -= timedelta(days=1)
            for d in review_days[1:]:
                if d == check_date:
                    streak_days += 1
                    check_date -= timedelta(days=1)
                else:
                    break
        elif review_days[0] == check_date - timedelta(days=1):
            # Studied yesterday but not yet today — streak still alive
            check_date = review_days[0]
            streak_days = 1
            check_date -= timedelta(days=1)
            for d in review_days[1:]:
                if d == check_date:
                    streak_days += 1
                    check_date -= timedelta(days=1)
                else:
                    break

    # --- Retention percent (last 30 days) ---
    thirty_days_ago = now - timedelta(days=30)
    retention_result = await db.execute(
        select(
            func.count(ReviewLog.id).label("total"),
            func.count(
                case(
                    (ReviewLog.response.in_(["good", "easy"]), ReviewLog.id),
                )
            ).label("passed"),
        )
        .where(
            ReviewLog.user_id == user_id,
            ReviewLog.reviewed_at >= thirty_days_ago,
        )
    )
    ret_row = retention_result.first()
    if ret_row and ret_row.total > 0:
        retention_percent = round(ret_row.passed / ret_row.total * 100, 1)
    else:
        retention_percent = 0.0

    # --- Deck progress ---
    deck_progress_result = await db.execute(
        select(
            Deck.id.label("deck_id"),
            Deck.title,
            func.count(Card.id).label("total"),
            func.count(case((Card.repetitions == 0, Card.id))).label("new_count"),
            func.count(
                case((and_(Card.repetitions > 0, Card.interval < 21), Card.id))
            ).label("learning_count"),
            func.count(case((Card.interval >= 21, Card.id))).label("mature_count"),
        )
        .outerjoin(Card, Card.deck_id == Deck.id)
        .where(Deck.owner_id == user_id)
        .group_by(Deck.id, Deck.title)
        .order_by(Deck.title)
    )
    deck_progress = [
        DeckProgress(
            deck_id=str(row.deck_id),
            title=row.title,
            new_count=row.new_count,
            learning_count=row.learning_count,
            mature_count=row.mature_count,
            total=row.total,
        )
        for row in deck_progress_result.all()
    ]

    # --- Review forecast (next 7 days) ---
    forecast_end = now + timedelta(days=7)
    forecast_day_col = func.date_trunc("day", Card.next_review_at).label("day")
    forecast_result = await db.execute(
        select(
            forecast_day_col,
            func.count(Card.id).label("count"),
        )
        .join(Deck, Card.deck_id == Deck.id)
        .where(
            Deck.owner_id == user_id,
            Card.next_review_at.is_not(None),
            Card.next_review_at >= today_start,
            Card.next_review_at < forecast_end,
        )
        .group_by(forecast_day_col)
        .order_by(forecast_day_col)
    )
    forecast_map: dict[str, int] = {}
    for row in forecast_result.all():
        day_date = row.day.date() if hasattr(row.day, "date") else row.day
        forecast_map[str(day_date)] = row.count

    review_forecast = []
    for i in range(7):
        d = (today_start + timedelta(days=i)).date()
        review_forecast.append(DayForecast(date=str(d), count=forecast_map.get(str(d), 0)))

    return DashboardStatsResponse(
        last_studied_deck=last_studied_deck,
        cards_due_today=cards_due_today,
        new_cards_available=new_cards_available,
        cards_reviewed_today=cards_reviewed_today,
        total_cards=total_cards,
        total_decks=total_decks,
        mastery_percent=mastery_percent,
        streak_days=streak_days,
        retention_percent=retention_percent,
        deck_progress=deck_progress,
        review_forecast=review_forecast,
    )
