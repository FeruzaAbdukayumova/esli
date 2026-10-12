import asyncio
import logging
import secrets

from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.core.security import create_access_token
from app.db.models.user import User
from app.db.session import get_db
from app.schemas.auth import OAuthCallbackRequest, TokenResponse
from app.services import subscription_service
from app.services.telegram_service import notify_oauth_signup
from app.services.oauth_service import (
    exchange_google_code,
    get_google_authorize_url,
)
from app.services.refresh_token_service import create_refresh_token
from app.services.user_service import (
    create_oauth_user,
    get_user_by_email,
    get_user_by_google_sub,
    link_google_account,
)

logger = logging.getLogger(__name__)

router = APIRouter()

REFRESH_COOKIE_KEY = "refresh_token"
REFRESH_COOKIE_MAX_AGE = settings.REFRESH_TOKEN_EXPIRE_DAYS * 24 * 60 * 60
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


async def _issue_tokens(response: Response, db: AsyncSession, user: User) -> TokenResponse:
    access_token = create_access_token(str(user.id), user.password_hash)
    raw_refresh = await create_refresh_token(db, user.id)
    _set_refresh_cookie(response, raw_refresh)
    return TokenResponse(access_token=access_token)


# ── Google ────────────────────────────────────────────────────────────


@router.get("/google/authorize")
async def google_authorize():
    if not settings.GOOGLE_CLIENT_ID:
        raise HTTPException(status_code=status.HTTP_501_NOT_IMPLEMENTED, detail="Google OAuth not configured")
    state = secrets.token_urlsafe(32)
    url = get_google_authorize_url(state)
    return {"authorize_url": url, "state": state}


@router.post("/google/callback", response_model=TokenResponse)
async def google_callback(
    payload: OAuthCallbackRequest,
    response: Response,
    db: AsyncSession = Depends(get_db),
):
    try:
        google_user = await exchange_google_code(payload.code)
    except Exception:
        logger.exception("Google OAuth code exchange failed")
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Failed to authenticate with Google")

    google_sub = google_user.get("sub")
    email = google_user.get("email")
    name = google_user.get("name")

    if not email:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Google account has no email")

    # 1. Returning Google user
    user = await get_user_by_google_sub(db, google_sub)

    if not user:
        # 2. Link to existing account by email
        user = await get_user_by_email(db, email)
        if user:
            user = await link_google_account(db, user, google_sub)
        else:
            # 3. Create new user
            try:
                user = await create_oauth_user(
                    db,
                    email=email,
                    auth_provider="google",
                    google_sub=google_sub,
                    username=name,
                )
            except IntegrityError:
                await db.rollback()
                user = await create_oauth_user(
                    db,
                    email=email,
                    auth_provider="google",
                    google_sub=google_sub,
                    username=None,
                )
            await subscription_service.create_free_subscription(db, user.id)
            asyncio.create_task(notify_oauth_signup(email, "google", name))

    return await _issue_tokens(response, db, user)
