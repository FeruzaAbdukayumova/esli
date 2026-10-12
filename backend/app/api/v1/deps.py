import uuid

from fastapi import Depends, HTTPException, Request, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import jwt, JWTError
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.db.session import get_db
from app.db.models.user import User
from app.services.user_service import get_user_by_id

security = HTTPBearer()
optional_security = HTTPBearer(auto_error=False)


async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: AsyncSession = Depends(get_db),
) -> User:
    """
    Extract and validate JWT token, then return the current user.
    Raises 401 if token is missing, invalid, or user not found.
    """
    token = credentials.credentials

    try:
        payload = jwt.decode(token, settings.JWT_SECRET, algorithms=[settings.JWT_ALG])
        user_id_str: str = payload.get("sub")
        # Purpose-scoped tokens (e.g. password reset) are not access tokens
        if not user_id_str or payload.get("purpose"):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token: missing subject",
            )
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
        )

    try:
        user_id = uuid.UUID(user_id_str)
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token: invalid user ID format",
        )

    user = await get_user_by_id(db, user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found",
        )

    return user


async def get_optional_current_user(
    credentials: HTTPAuthorizationCredentials | None = Depends(optional_security),
    db: AsyncSession = Depends(get_db),
) -> User | None:
    """Return the current user if a valid token is provided, otherwise None."""
    if not credentials:
        return None

    try:
        payload = jwt.decode(credentials.credentials, settings.JWT_SECRET, algorithms=[settings.JWT_ALG])
        user_id_str: str = payload.get("sub")
        if not user_id_str or payload.get("purpose"):
            return None
        user_id = uuid.UUID(user_id_str)
    except (JWTError, ValueError):
        return None

    return await get_user_by_id(db, user_id)


async def get_admin_user(
    current_user: User = Depends(get_current_user),
) -> User:
    """Require admin privileges."""
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required",
        )
    return current_user


async def get_current_user_with_tier(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> tuple[User, str]:
    """Return the current user along with their subscription tier."""
    from app.services import subscription_service
    tier = await subscription_service.get_user_tier(db, current_user.id)
    return current_user, tier
