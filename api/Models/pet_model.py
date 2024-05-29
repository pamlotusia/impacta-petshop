from api import db
from datetime import datetime
from sqlalchemy.orm import Mapped


class Pet(db.Model):
    __tablename__ = 'pet'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False, index=True)
    name: Mapped[str] = db.Column(db.String(50), nullable=False)
    age: Mapped[int] = db.Column(db.Integer, nullable=False)
    pet_type: Mapped[str] = db.Column(db.String(50), nullable=False)
    weight: Mapped[float] = db.Column(db.Float, nullable=False)
    size: Mapped[str] = db.Column(db.String(20), nullable=False)
    temper: Mapped[str] = db.Column(db.String(50), nullable=False)
    guardian_id: Mapped[int]  = db.Column(db.Integer, db.ForeignKey("user_client.id"), nullable=False, index=True)
    register_date: Mapped[datetime] = db.Column(db.DateTime, nullable=False
                                    , default=datetime.now, index=True)

    def __repr__(self) -> str:
        return f'<Pet: {self.id}>'