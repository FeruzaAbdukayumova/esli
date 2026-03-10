"""add translations to cards and preferred_language to users

Revision ID: c3d4e5f6a7b8
Revises: b2c3d4e5f6a7
Create Date: 2026-02-05 14:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql


# revision identifiers, used by Alembic.
revision: str = 'c3d4e5f6a7b8'
down_revision: Union[str, Sequence[str], None] = 'b2c3d4e5f6a7'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Add translations column to cards and preferred_language to users."""
    # Add translations JSONB column to cards table
    op.add_column(
        'cards',
        sa.Column('translations', postgresql.JSONB(astext_type=sa.Text()), nullable=True)
    )

    # Add preferred_language column to users table
    op.add_column(
        'users',
        sa.Column('preferred_language', sa.String(10), nullable=False, server_default='en')
    )


def downgrade() -> None:
    """Remove translations and preferred_language columns."""
    op.drop_column('users', 'preferred_language')
    op.drop_column('cards', 'translations')
