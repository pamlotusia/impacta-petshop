"""empty message

Revision ID: 09bf90ec4741
Revises: 36fc80cefb76
Create Date: 2024-03-04 19:16:21.434772

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '09bf90ec4741'
down_revision = '36fc80cefb76'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('pet_schedules', schema=None) as batch_op:
        batch_op.add_column(sa.Column('type_service', sa.String(length=20), nullable=False))
        batch_op.add_column(sa.Column('service', sa.String(length=20), nullable=False))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('pet_schedules', schema=None) as batch_op:
        batch_op.drop_column('service')
        batch_op.drop_column('type_service')

    # ### end Alembic commands ###
