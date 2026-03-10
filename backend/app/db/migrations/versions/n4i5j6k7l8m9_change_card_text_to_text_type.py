"""change card text columns to text type

Revision ID: n4i5j6k7l8m9
Revises: m3h4i5j6k7l8
Create Date: 2026-02-13

"""

from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = "n4i5j6k7l8m9"
down_revision = "m3h4i5j6k7l8"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.alter_column("cards", "front_text", type_=sa.Text(), existing_type=sa.String(1000))
    op.alter_column("cards", "back_text", type_=sa.Text(), existing_type=sa.String(1000))


def downgrade() -> None:
    op.alter_column("cards", "front_text", type_=sa.String(1000), existing_type=sa.Text())
    op.alter_column("cards", "back_text", type_=sa.String(1000), existing_type=sa.Text())
