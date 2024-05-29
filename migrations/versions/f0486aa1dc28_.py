"""empty message

Revision ID: f0486aa1dc28
Revises: 2bd301daa747
Create Date: 2024-03-02 14:54:50.581167

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f0486aa1dc28'
down_revision = '2bd301daa747'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('pet_comments',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('comment', sa.String(length=255), nullable=False),
    sa.Column('pet_id', sa.Integer(), nullable=False),
    sa.Column('guardia_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['guardia_id'], ['user_client.id'], ),
    sa.ForeignKeyConstraint(['pet_id'], ['pet.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('pet_comments', schema=None) as batch_op:
        batch_op.create_index(batch_op.f('ix_pet_comments_guardia_id'), ['guardia_id'], unique=False)
        batch_op.create_index(batch_op.f('ix_pet_comments_id'), ['id'], unique=False)
        batch_op.create_index(batch_op.f('ix_pet_comments_pet_id'), ['pet_id'], unique=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('pet_comments', schema=None) as batch_op:
        batch_op.drop_index(batch_op.f('ix_pet_comments_pet_id'))
        batch_op.drop_index(batch_op.f('ix_pet_comments_id'))
        batch_op.drop_index(batch_op.f('ix_pet_comments_guardia_id'))

    op.drop_table('pet_comments')
    # ### end Alembic commands ###