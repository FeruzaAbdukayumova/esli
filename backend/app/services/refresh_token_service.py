import uuid
from datetime import datetime, timedelta, timezone

from sqlalchemy import delete, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.core.security import generate_refresh_token, hash_token
from app.db.models.refresh_token import RefreshToken
from app.db.models.user import User


async def create_refresh_token(db: AsyncSession, user_id: uuid.UUID) -> str:
    raw_token = generate_refresh_token()
    token_hash = hash_token(raw_token)
    expires_at = datetime.now(timezone.utc) + timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS)

    rt = RefreshToken(
        user_id=user_id,
        token_hash=token_hash,
        expires_at=expires_at,
    )
    db.add(rt)
    await db.commit()
    return raw_token


async def validate_refresh_token(db: AsyncSession, raw_token: str) -> User | None:
    token_hash = hash_token(raw_token)
    result = await db.execute(
        select(RefreshToken).where(RefreshToken.token_hash == token_hash)
    )
    rt = result.scalar_one_or_none()
    if rt is None:
        return None

    if rt.expires_at < datetime.now(timezone.utc):
        await db.execute(
            delete(RefreshToken).where(RefreshToken.id == rt.id)
        )
        await db.commit()
        return None

    user_result = await db.execute(select(User).where(User.id == rt.user_id))
    return user_result.scalar_one_or_none()


async def revoke_refresh_token(db: AsyncSession, raw_token: str) -> None:
    token_hash = hash_token(raw_token)
    await db.execute(
        delete(RefreshToken).where(RefreshToken.token_hash == token_hash)
    )
    await db.commit()


async def revoke_all_user_tokens(db: AsyncSession, user_id: uuid.UUID) -> None:
    await db.execute(
        delete(RefreshToken).where(RefreshToken.user_id == user_id)
    )
    await db.commit()
