"""empty message

Revision ID: eec6b881034b
Revises: 6920659f9d90
Create Date: 2024-03-06 20:44:28.897758

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'eec6b881034b'
down_revision = '6920659f9d90'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('employee', schema=None) as batch_op:
        batch_op.add_column(sa.Column('phone', sa.String(length=20), nullable=False))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('employee', schema=None) as batch_op:
        batch_op.drop_column('phone')

    # ### end Alembic commands ###