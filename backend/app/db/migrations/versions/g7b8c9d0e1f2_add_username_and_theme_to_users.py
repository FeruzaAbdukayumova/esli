"""Add username and theme to users

Revision ID: g7b8c9d0e1f2
Revises: f6a7b8c9d0e1
Create Date: 2026-02-07 10:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision: str = "g7b8c9d0e1f2"
down_revision: Union[str, None] = "f6a7b8c9d0e1"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column(
        "users",
        sa.Column("username", sa.String(50), nullable=True, unique=True),
    )
    op.add_column(
        "users",
        sa.Column("theme", sa.String(20), nullable=False, server_default="indigo"),
    )
    op.alter_column("users", "theme", server_default=None)


def downgrade() -> None:
    op.drop_column("users", "theme")
    op.drop_column("users", "username")
