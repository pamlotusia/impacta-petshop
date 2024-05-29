from api import db
from .client_model import User
from .pet_model import Pet

class PetGroomingSchedules(db.Model):
    __tablename__ = 'pet_schedules'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True, index=True)
    
    guardian_id = db.Column(db.Integer, db.ForeignKey('user_client.id'), nullable=False)
    guardian = db.relationship('User', lazy='joined')
    
    pet_id = db.Column(db.Integer, db.ForeignKey('pet.id'), nullable=False)
    pet = db.relationship('Pet', lazy='joined')
    
    schedules = db.Column(db.DateTime, nullable=False, index=True)
    price = db.Column(db.DECIMAL(18, 2), nullable=False)
    type_service = db.Column(db.String(20), nullable=False)
    service = db.Column(db.String(20), nullable=False)
    status = db.Column(db.String(20), default="Ativo", nullable=False)
    

