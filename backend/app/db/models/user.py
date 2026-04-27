import uuid
from datetime import datetime, timezone

from sqlalchemy import Boolean, String, DateTime, Integer
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base


class User(Base):
    __tablename__ = "users"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email: Mapped[str] = mapped_column(String(320), unique=True, index=True, nullable=False)
    password_hash: Mapped[str | None] = mapped_column(String(255), nullable=True)
    auth_provider: Mapped[str] = mapped_column(String(32), nullable=False, default="password")
    google_sub: Mapped[str | None] = mapped_column(String, nullable=True, unique=True)
    username: Mapped[str | None] = mapped_column(String(50), nullable=True, unique=True)
    theme: Mapped[str] = mapped_column(String(20), nullable=False, default="indigo")
    dark_mode: Mapped[str] = mapped_column(String(10), nullable=False, default="system")

    preferred_language: Mapped[str] = mapped_column(
        String(10),
        default="en",
        nullable=False,
    )
    daily_new_card_limit: Mapped[int] = mapped_column(
        Integer,
        default=20,
        nullable=False,
    )

    stripe_customer_id: Mapped[str | None] = mapped_column(String(255), nullable=True, unique=True)
    paddle_customer_id: Mapped[str | None] = mapped_column(String(255), nullable=True, unique=True)
    is_admin: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False,
    )
