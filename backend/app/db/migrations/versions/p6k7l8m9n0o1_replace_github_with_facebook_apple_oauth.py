"""Remove GitHub OAuth support

Revision ID: p6k7l8m9n0o1
Revises: o5j6k7l8m9n0
Create Date: 2026-03-13 12:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision: str = "p6k7l8m9n0o1"
down_revision: Union[str, None] = "o5j6k7l8m9n0"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.drop_constraint("uq_users_github_id", "users", type_="unique")
    op.drop_column("users", "github_id")


def downgrade() -> None:
    op.add_column("users", sa.Column("github_id", sa.String(), nullable=True))
    op.create_unique_constraint("uq_users_github_id", "users", ["github_id"])
