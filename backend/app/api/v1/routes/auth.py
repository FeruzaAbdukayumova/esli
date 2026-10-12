import asyncio
import time
import uuid

from fastapi import APIRouter, Cookie, Depends, HTTPException, Response, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.core.security import (
    create_access_token,
    create_password_reset_token,
    hash_password,
    password_fingerprint_matches,
    read_password_reset_token,
    verify_password,
)
from app.db.session import get_db
from app.db.models.user import User
from app.schemas.auth import (
    ForgotPasswordRequest,
    LoginRequest,
    RegisterRequest,
    ResetPasswordRequest,
    TokenResponse,
    UserResponse,
    UserUpdateRequest,
)
from app.services.user_service import get_user_by_email, get_user_by_id, create_user
from app.services.refresh_token_service import (
    create_refresh_token,
    revoke_all_user_tokens,
    revoke_refresh_token,
    validate_refresh_token,
)
from app.services.email_service import send_password_reset_email
from app.api.v1.deps import get_current_user
from app.services import subscription_service
from app.services.telegram_service import notify_registration

router = APIRouter()

REFRESH_COOKIE_KEY = "refresh_token"
REFRESH_COOKIE_MAX_AGE = settings.REFRESH_TOKEN_EXPIRE_DAYS * 24 * 60 * 60  # seconds
REFRESH_COOKIE_PATH = "/api/v1/auth"


def _set_refresh_cookie(response: Response, raw_token: str) -> None:
    response.set_cookie(
        key=REFRESH_COOKIE_KEY,
        value=raw_token,
        httponly=True,
        secure=True,
        samesite="lax",
        path=REFRESH_COOKIE_PATH,
        max_age=REFRESH_COOKIE_MAX_AGE,
    )


def _clear_refresh_cookie(response: Response) -> None:
    response.delete_cookie(
        key=REFRESH_COOKIE_KEY,
        httponly=True,
        secure=True,
        samesite="lax",
        path=REFRESH_COOKIE_PATH,
    )


@router.post("/register", response_model=TokenResponse)
async def register(
    payload: RegisterRequest,
    response: Response,
    db: AsyncSession = Depends(get_db),
):
    try:
        existing = await get_user_by_email(db, payload.email)
        if existing:
            raise HTTPException(status_code=409, detail="Email already registered")

        from sqlalchemy import select
        existing_username = (await db.execute(
            select(User).where(User.username == payload.username)
        )).scalar_one_or_none()
        if existing_username:
            raise HTTPException(status_code=409, detail="Username already taken")

        user = await create_user(db, payload.email, hash_password(payload.password), username=payload.username)
        await subscription_service.create_free_subscription(db, user.id)
        asyncio.create_task(notify_registration(payload.email, payload.username))
        access_token = create_access_token(str(user.id))
        raw_refresh = await create_refresh_token(db, user.id)
        _set_refresh_cookie(response, raw_refresh)
        return TokenResponse(access_token=access_token)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Registration failed: {str(e)}")


@router.post("/login", response_model=TokenResponse)
async def login(
    payload: LoginRequest,
    response: Response,
    db: AsyncSession = Depends(get_db),
):
    user = await get_user_by_email(db, payload.email)
    if not user or not user.password_hash or not verify_password(payload.password, user.password_hash):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

    access_token = create_access_token(str(user.id))
    raw_refresh = await create_refresh_token(db, user.id)
    _set_refresh_cookie(response, raw_refresh)
    return TokenResponse(access_token=access_token)


# One reset email per address per minute (in-memory, per process)
_RESET_EMAIL_COOLDOWN = 60
_last_reset_email: dict[str, float] = {}


@router.post("/forgot-password", status_code=status.HTTP_204_NO_CONTENT)
async def forgot_password(
    payload: ForgotPasswordRequest,
    db: AsyncSession = Depends(get_db),
):
    # Always 204 so the endpoint can't be used to check which emails have accounts
    email = payload.email.lower()
    now = time.time()
    if now - _last_reset_email.get(email, 0) < _RESET_EMAIL_COOLDOWN:
        return None
    _last_reset_email[email] = now

    user = await get_user_by_email(db, payload.email)
    if user:
        token = create_password_reset_token(str(user.id), user.password_hash)
        reset_url = f"{settings.FRONTEND_URL.rstrip('/')}/reset-password?token={token}"
        # Fire-and-forget so response time doesn't reveal whether the account exists
        asyncio.create_task(send_password_reset_email(user.email, reset_url))
    return None


@router.post("/reset-password", response_model=TokenResponse)
async def reset_password(
    payload: ResetPasswordRequest,
    response: Response,
    db: AsyncSession = Depends(get_db),
):
    invalid = HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST,
        detail="This reset link is invalid or has expired. Request a new one.",
    )
    parsed = read_password_reset_token(payload.token)
    if not parsed:
        raise invalid
    user_id_str, fingerprint = parsed
    try:
        user = await get_user_by_id(db, uuid.UUID(user_id_str))
    except ValueError:
        raise invalid
    # Fingerprint mismatch = password already changed, so the link was used
    if not user or not password_fingerprint_matches(user.password_hash, fingerprint):
        raise invalid

    user.password_hash = hash_password(payload.new_password)
    await db.commit()
    # Sign out every other session, then sign this one in
    await revoke_all_user_tokens(db, user.id)
    access_token = create_access_token(str(user.id))
    raw_refresh = await create_refresh_token(db, user.id)
    _set_refresh_cookie(response, raw_refresh)
    return TokenResponse(access_token=access_token)


@router.post("/refresh", response_model=TokenResponse)
async def refresh(
    response: Response,
    db: AsyncSession = Depends(get_db),
    refresh_token: str | None = Cookie(None),
):
    if not refresh_token:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="No refresh token")

    user = await validate_refresh_token(db, refresh_token)
    if user is None:
        _clear_refresh_cookie(response)
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid or expired refresh token")

    # Rotate: revoke old, issue new
    await revoke_refresh_token(db, refresh_token)
    new_access = create_access_token(str(user.id))
    new_refresh = await create_refresh_token(db, user.id)
    _set_refresh_cookie(response, new_refresh)
    return TokenResponse(access_token=new_access)


@router.post("/logout", status_code=status.HTTP_204_NO_CONTENT)
async def logout(
    response: Response,
    db: AsyncSession = Depends(get_db),
    refresh_token: str | None = Cookie(None),
):
    if refresh_token:
        await revoke_refresh_token(db, refresh_token)
    _clear_refresh_cookie(response)
    return None


@router.get("/me", response_model=UserResponse)
async def get_me(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Get current authenticated user information."""
    tier = await subscription_service.get_user_tier(db, current_user.id)
    sub = await subscription_service.get_user_subscription(db, current_user.id)
    sub_status = sub.status if sub else "active"
    data = UserResponse.model_validate(current_user)
    data.subscription_tier = tier
    data.subscription_status = sub_status
    return data


@router.patch("/me", response_model=UserResponse)
async def update_me(
    payload: UserUpdateRequest,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Update current user's settings (e.g., preferred_language)."""
    from app.services.translation_service import SUPPORTED_LANGUAGES

    if payload.preferred_language is not None:
        if payload.preferred_language != "en" and payload.preferred_language not in SUPPORTED_LANGUAGES:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Unsupported language: {payload.preferred_language}",
            )
        current_user.preferred_language = payload.preferred_language

    if payload.daily_new_card_limit is not None:
        current_user.daily_new_card_limit = payload.daily_new_card_limit

    if payload.username is not None:
        # Check uniqueness
        from sqlalchemy import select
        existing = (await db.execute(
            select(User).where(User.username == payload.username, User.id != current_user.id)
        )).scalar_one_or_none()
        if existing:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Username already taken",
            )
        current_user.username = payload.username

    if payload.theme is not None:
        valid_themes = {"indigo", "emerald", "rose", "amber", "violet", "slate"}
        if payload.theme not in valid_themes:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Invalid theme: {payload.theme}",
            )
        current_user.theme = payload.theme

    if payload.dark_mode is not None:
        valid_dark_modes = {"light", "dark", "system"}
        if payload.dark_mode not in valid_dark_modes:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Invalid dark mode: {payload.dark_mode}. Must be one of: light, dark, system",
            )
        current_user.dark_mode = payload.dark_mode

    await db.commit()
    await db.refresh(current_user)
    tier = await subscription_service.get_user_tier(db, current_user.id)
    sub = await subscription_service.get_user_subscription(db, current_user.id)
    sub_status = sub.status if sub else "active"
    data = UserResponse.model_validate(current_user)
    data.subscription_tier = tier
    data.subscription_status = sub_status
    return data
