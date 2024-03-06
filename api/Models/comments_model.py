from api import db
from sqlalchemy.orm import Mapped

class petComments(db.Model):
    __tablename__ = 'pet_comments'
    
    
    
    id: Mapped[int] = db.Column(db.Integer, primary_key=True, autoincrement=True
                        , nullable=False, index=True)
    
    comment: Mapped[str] = db.Column(db.String(255), nullable=False)
    
    pet_id: Mapped[int] = db.Column(db.Integer, db.ForeignKey("pet.id")
                               , nullable=False, index=True)
    
    guardian_id: Mapped[int] = db.Column(db.Integer, db.ForeignKey("user_client.id")
                               , nullable=False, index=True)
    