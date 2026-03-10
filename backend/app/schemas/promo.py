import uuid
from datetime import datetime

from pydantic import BaseModel, Field


class PromoCodeCreate(BaseModel):
    code: str = Field(min_length=3, max_length=50)
    tier: str = Field(pattern=r"^(pro|premium)$")
    duration_days: int = Field(ge=1, le=365)
    max_redemptions: int = Field(default=-1, ge=-1)
    valid_from: datetime | None = None
    valid_until: datetime | None = None


class PromoCodeUpdate(BaseModel):
    is_active: bool | None = None
    max_redemptions: int | None = Field(None, ge=-1)
    valid_from: datetime | None = None
    valid_until: datetime | None = None


class PromoCodeResponse(BaseModel):
    id: uuid.UUID
    code: str
    tier: str
    duration_days: int
    max_redemptions: int
    current_redemptions: int
    valid_from: datetime | None
    valid_until: datetime | None
    is_active: bool
    created_at: datetime

    model_config = {"from_attributes": True}


class PromoRedeemRequest(BaseModel):
    code: str = Field(min_length=1, max_length=50)


class PromoRedeemResponse(BaseModel):
    promo_tier: str
    promo_expires_at: str
    message: str
