"""Add Paddle billing columns and events table

Revision ID: q7l8m9n0o1p2
Revises: p6k7l8m9n0o1
Create Date: 2026-04-22 10:30:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects.postgresql import UUID

# revision identifiers, used by Alembic.
revision: str = "q7l8m9n0o1p2"
down_revision: Union[str, None] = "p6k7l8m9n0o1"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Paddle IDs on users (alongside stripe_customer_id for now — Stripe will be removed later)
    op.add_column(
        "users",
        sa.Column("paddle_customer_id", sa.String(255), nullable=True, unique=True),
    )

    # Paddle IDs on subscriptions
    op.add_column(
        "subscriptions",
        sa.Column("paddle_customer_id", sa.String(255), nullable=True),
    )
    op.add_column(
        "subscriptions",
        sa.Column("paddle_subscription_id", sa.String(255), nullable=True),
    )
    op.create_index(
        "ix_subscriptions_paddle_customer_id",
        "subscriptions",
        ["paddle_customer_id"],
    )
    op.create_index(
        "ix_subscriptions_paddle_subscription_id",
        "subscriptions",
        ["paddle_subscription_id"],
    )

    # Idempotency table for webhook events
    op.create_table(
        "paddle_events",
        sa.Column("id", UUID(as_uuid=True), primary_key=True),
        sa.Column("event_id", sa.String(100), nullable=False, unique=True, index=True),
        sa.Column("event_type", sa.String(100), nullable=False),
        sa.Column("processed_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.func.now()),
    )


def downgrade() -> None:
    op.drop_table("paddle_events")
    op.drop_index("ix_subscriptions_paddle_subscription_id", table_name="subscriptions")
    op.drop_index("ix_subscriptions_paddle_customer_id", table_name="subscriptions")
    op.drop_column("subscriptions", "paddle_subscription_id")
    op.drop_column("subscriptions", "paddle_customer_id")
    op.drop_column("users", "paddle_customer_id")
