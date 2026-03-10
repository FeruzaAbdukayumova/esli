"""Add promo codes

Revision ID: k1f2g3h4i5j6
Revises: j0e1f2g3h4i5
Create Date: 2026-02-10 17:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects.postgresql import UUID

# revision identifiers, used by Alembic.
revision: str = "k1f2g3h4i5j6"
down_revision: Union[str, None] = "j0e1f2g3h4i5"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # 1. Create promo_codes table
    op.create_table(
        "promo_codes",
        sa.Column("id", UUID(as_uuid=True), primary_key=True),
        sa.Column("code", sa.String(50), nullable=False, unique=True, index=True),
        sa.Column("tier", sa.String(20), nullable=False),
        sa.Column("duration_days", sa.Integer(), nullable=False),
        sa.Column("max_redemptions", sa.Integer(), nullable=False, server_default="-1"),
        sa.Column("current_redemptions", sa.Integer(), nullable=False, server_default="0"),
        sa.Column("valid_from", sa.DateTime(timezone=True), nullable=True),
        sa.Column("valid_until", sa.DateTime(timezone=True), nullable=True),
        sa.Column("is_active", sa.Boolean(), nullable=False, server_default="true"),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.func.now()),
    )

    # 2. Add promo columns to subscriptions
    op.add_column("subscriptions", sa.Column("promo_tier", sa.String(20), nullable=True))
    op.add_column("subscriptions", sa.Column("promo_expires_at", sa.DateTime(timezone=True), nullable=True))
    op.add_column(
        "subscriptions",
        sa.Column(
            "promo_code_id",
            UUID(as_uuid=True),
            sa.ForeignKey("promo_codes.id", ondelete="SET NULL"),
            nullable=True,
        ),
    )

    # 3. Add is_admin to users
    op.add_column(
        "users",
        sa.Column("is_admin", sa.Boolean(), nullable=False, server_default="false"),
    )
    op.alter_column("users", "is_admin", server_default=None)


def downgrade() -> None:
    op.drop_column("users", "is_admin")
    op.drop_column("subscriptions", "promo_code_id")
    op.drop_column("subscriptions", "promo_expires_at")
    op.drop_column("subscriptions", "promo_tier")
    op.drop_table("promo_codes")
