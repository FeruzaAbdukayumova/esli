"""Add daily_new_card_limit to users

Revision ID: f6a7b8c9d0e1
Revises: e5f6a7b8c9d0
Create Date: 2026-02-06 18:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision: str = "f6a7b8c9d0e1"
down_revision: Union[str, None] = "e5f6a7b8c9d0"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column(
        "users",
        sa.Column("daily_new_card_limit", sa.Integer(), nullable=False, server_default="20"),
    )
    op.alter_column("users", "daily_new_card_limit", server_default=None)


def downgrade() -> None:
    op.drop_column("users", "daily_new_card_limit")
