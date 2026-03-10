from pydantic import BaseModel


class LastStudiedDeck(BaseModel):
    id: str
    title: str


class DeckProgress(BaseModel):
    deck_id: str
    title: str
    new_count: int
    learning_count: int
    mature_count: int
    total: int


class DayForecast(BaseModel):
    date: str
    count: int


class DashboardStatsResponse(BaseModel):
    last_studied_deck: LastStudiedDeck | None = None
    cards_due_today: int = 0
    new_cards_available: int = 0
    cards_reviewed_today: int = 0
    total_cards: int = 0
    total_decks: int = 0
    mastery_percent: float = 0.0
    streak_days: int = 0
    retention_percent: float = 0.0
    deck_progress: list[DeckProgress] = []
    review_forecast: list[DayForecast] = []
