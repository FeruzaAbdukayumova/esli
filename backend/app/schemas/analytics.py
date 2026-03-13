"""Analytics schemas for event tracking and admin dashboard."""

from pydantic import BaseModel, Field


class TrackEventRequest(BaseModel):
    event_name: str = Field(max_length=100)
    properties: dict | None = None
    session_id: str | None = Field(None, max_length=64)


class TimeSeriesPoint(BaseModel):
    date: str
    value: int


class UserGrowthResponse(BaseModel):
    signups: list[TimeSeriesPoint]
    active_users: list[TimeSeriesPoint]
    app_opens: list[TimeSeriesPoint]
    unique_visitors: list[TimeSeriesPoint]
    total_users: int
    retention_rate: float


class StudyEngagementResponse(BaseModel):
    reviews_over_time: list[TimeSeriesPoint]
    response_distribution: dict[str, int]
    peak_hours: list[int]


class ContentMetricsResponse(BaseModel):
    decks_over_time: list[TimeSeriesPoint]
    cards_over_time: list[TimeSeriesPoint]
    popular_decks: list[dict]
    category_breakdown: dict[str, int]
    shared_vs_private: dict[str, int]


class SubscriptionResponse(BaseModel):
    users_by_tier: dict[str, int]
    promo_usage: list[dict]


class CustomEventsResponse(BaseModel):
    events: dict[str, int]
