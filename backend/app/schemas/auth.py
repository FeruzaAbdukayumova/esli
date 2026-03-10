from datetime import datetime
from pydantic import BaseModel, EmailStr, Field
import uuid

class RegisterRequest(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8, max_length=72)
    username: str = Field(min_length=1, max_length=50)

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"

class UserResponse(BaseModel):
    id: uuid.UUID
    email: str
    auth_provider: str
    username: str | None = None
    theme: str = "indigo"
    dark_mode: str = "system"
    preferred_language: str = "en"
    daily_new_card_limit: int = 20
    subscription_tier: str = "free"
    subscription_status: str = "active"
    is_admin: bool = False
    created_at: datetime

    class Config:
        from_attributes = True


class OAuthCallbackRequest(BaseModel):
    code: str
    state: str


class UserUpdateRequest(BaseModel):
    preferred_language: str | None = Field(None, max_length=10)
    daily_new_card_limit: int | None = Field(None, ge=0, le=9999)
    username: str | None = Field(None, min_length=1, max_length=50)
    theme: str | None = Field(None, max_length=20)
    dark_mode: str | None = Field(None, max_length=10)
