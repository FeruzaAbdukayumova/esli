from typing import Literal

from pydantic import BaseModel, Field


class CardReviewIn(BaseModel):
    """Request body for POST /cards/{card_id}/review."""

    response: Literal["again", "hard", "good", "easy"] = Field(
        ...,
        description="Self-assessment of recall quality: again (forgot), hard (struggled), good (correct), easy (effortless)"
    )


class CardIntervalsResponse(BaseModel):
    """Response showing next review intervals for each response option."""

    again: str = Field(..., description="Interval if 'again' is chosen (e.g., '1m')")
    hard: str = Field(..., description="Interval if 'hard' is chosen (e.g., '10m')")
    good: str = Field(..., description="Interval if 'good' is chosen (e.g., '1d')")
    easy: str = Field(..., description="Interval if 'easy' is chosen (e.g., '4d')")
