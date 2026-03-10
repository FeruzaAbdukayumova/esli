import logging
import secrets

from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.core.security import create_access_token
from app.db.session import get_db
from app.schemas.auth import OAuthCallbackRequest, TokenResponse
from app.services import subscription_service
from app.services.oauth_service import (
    exchange_github_code,
    exchange_google_code,
    get_github_authorize_url,
    get_google_authorize_url,
)
from app.services.refresh_token_service import create_refresh_token
from app.services.user_service import (
    create_oauth_user,
    get_user_by_email,
    get_user_by_github_id,
    get_user_by_google_sub,
    link_github_account,
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


async def _issue_tokens(response: Response, db: AsyncSession, user_id) -> TokenResponse:
    access_token = create_access_token(str(user_id))
    raw_refresh = await create_refresh_token(db, user_id)
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

    return await _issue_tokens(response, db, user.id)


# ── GitHub ────────────────────────────────────────────────────────────


@router.get("/github/authorize")
async def github_authorize():
    if not settings.GITHUB_CLIENT_ID:
        raise HTTPException(status_code=status.HTTP_501_NOT_IMPLEMENTED, detail="GitHub OAuth not configured")
    state = secrets.token_urlsafe(32)
    url = get_github_authorize_url(state)
    return {"authorize_url": url, "state": state}


@router.post("/github/callback", response_model=TokenResponse)
async def github_callback(
    payload: OAuthCallbackRequest,
    response: Response,
    db: AsyncSession = Depends(get_db),
):
    try:
        github_user = await exchange_github_code(payload.code)
    except Exception:
        logger.exception("GitHub OAuth code exchange failed")
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Failed to authenticate with GitHub")

    github_id = str(github_user["id"])
    email = github_user.get("email")
    username = github_user.get("login")

    if not email:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Could not retrieve email from GitHub. Please make your email public or add a verified email.",
        )

    # 1. Returning GitHub user
    user = await get_user_by_github_id(db, github_id)

    if not user:
        # 2. Link to existing account by email
        user = await get_user_by_email(db, email)
        if user:
            user = await link_github_account(db, user, github_id)
        else:
            # 3. Create new user
            try:
                user = await create_oauth_user(
                    db,
                    email=email,
                    auth_provider="github",
                    github_id=github_id,
                    username=username,
                )
            except IntegrityError:
                await db.rollback()
                user = await create_oauth_user(
                    db,
                    email=email,
                    auth_provider="github",
                    github_id=github_id,
                    username=None,
                )
            await subscription_service.create_free_subscription(db, user.id)

    return await _issue_tokens(response, db, user.id)
