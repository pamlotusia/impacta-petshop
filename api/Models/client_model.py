from api import db, bcrypt
from datetime import datetime
from typing import List
from .pet_model import Pet
from sqlalchemy.orm import Mapped
# from werkzeug.security import generate_password_hash, check_password_hash

class User(db.Model):
    __tablename__ = 'user_client'
    
    id: Mapped[int] = db.Column(db.Integer, primary_key=True
                                , autoincrement=True, index=True)
    
    name: Mapped[str] = db.Column(db.String(50), nullable=False)
    password_hash: Mapped[str] = db.Column(db.String(250), nullable=False) 
    email: Mapped[str] = db.Column(db.String(100), nullable=False)  
    phone: Mapped[str] = db.Column(db.String(25), nullable=False)
    
    register_date: Mapped[datetime] = db.Column(db.DateTime, nullable=False
                                    , default=datetime.now, index=True)
    
    pets: Mapped[List[Pet]] = db.relationship('Pet'
                                              , backref='guardian'
                                              , lazy='joined', uselist=True)  
    
 
    def set_password(self, password):
        self.password_hash = bcrypt.generate_password_hash(password)
    
    def check_password(self, password):
        return bcrypt.check_password_hash(self.password_hash, password)
    
    def __repr__(self) -> str:
        return f'<User: {self.id}>'
