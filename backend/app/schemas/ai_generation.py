from pydantic import BaseModel, Field


class AIGenerateRequest(BaseModel):
    topic: str = Field(..., min_length=1, max_length=5000)
    count: int = Field(10, ge=1, le=100)
    include_deck_info: bool = False
    existing_fronts: list[str] | None = None
    language: str | None = Field(None, max_length=50)


class AIGeneratedCard(BaseModel):
    front_text: str
    back_text: str


class AIGenerateResponse(BaseModel):
    cards: list[AIGeneratedCard]
    suggested_title: str | None = None
    suggested_tags: list[str] | None = None


# --- Bulk AI Edit schemas ---

class AIEditCardInput(BaseModel):
    id: str
    front_text: str = Field(..., max_length=1000)
    back_text: str = Field(..., max_length=1000)


class AIEditCardsRequest(BaseModel):
    cards: list[AIEditCardInput] = Field(..., min_length=1, max_length=50)
    instruction: str = Field(..., min_length=1, max_length=500)


class AIEditedCard(BaseModel):
    id: str
    front_text: str
    back_text: str


class AIEditCardsResponse(BaseModel):
    cards: list[AIEditedCard]
