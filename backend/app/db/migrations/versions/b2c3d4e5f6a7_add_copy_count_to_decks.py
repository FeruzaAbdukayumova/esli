"""add copy_count to decks

Revision ID: b2c3d4e5f6a7
Revises: a1b2c3d4e5f6
Create Date: 2026-02-05 12:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'b2c3d4e5f6a7'
down_revision: Union[str, Sequence[str], None] = 'a1b2c3d4e5f6'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Add copy_count column to decks table."""
    op.add_column(
        'decks',
        sa.Column('copy_count', sa.Integer(), nullable=False, server_default='0')
    )


def downgrade() -> None:
    """Remove copy_count column from decks table."""
    op.drop_column('decks', 'copy_count')
