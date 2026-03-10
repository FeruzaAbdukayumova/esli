import uuid

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.models.user import User


async def get_user_by_email(db: AsyncSession, email: str) -> User | None:
    res = await db.execute(select(User).where(User.email == email))
    return res.scalar_one_or_none()


async def get_user_by_id(db: AsyncSession, user_id: uuid.UUID) -> User | None:
    res = await db.execute(select(User).where(User.id == user_id))
    return res.scalar_one_or_none()


async def get_user_by_google_sub(db: AsyncSession, google_sub: str) -> User | None:
    res = await db.execute(select(User).where(User.google_sub == google_sub))
    return res.scalar_one_or_none()


async def get_user_by_github_id(db: AsyncSession, github_id: str) -> User | None:
    res = await db.execute(select(User).where(User.github_id == github_id))
    return res.scalar_one_or_none()


async def create_user(db: AsyncSession, email: str, password_hash: str, username: str | None = None) -> User:
    user = User(email=email, password_hash=password_hash, username=username)
    db.add(user)
    await db.flush()
    await db.commit()
    await db.refresh(user)
    return user


async def create_oauth_user(
    db: AsyncSession,
    email: str,
    auth_provider: str,
    google_sub: str | None = None,
    github_id: str | None = None,
    username: str | None = None,
) -> User:
    user = User(
        email=email,
        password_hash=None,
        auth_provider=auth_provider,
        google_sub=google_sub,
        github_id=github_id,
        username=username,
    )
    db.add(user)
    await db.flush()
    await db.commit()
    await db.refresh(user)
    return user


async def link_google_account(db: AsyncSession, user: User, google_sub: str) -> User:
    user.google_sub = google_sub
    await db.commit()
    await db.refresh(user)
    return user


async def link_github_account(db: AsyncSession, user: User, github_id: str) -> User:
    user.github_id = github_id
    await db.commit()
    await db.refresh(user)
    return user
