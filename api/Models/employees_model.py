from api import db, bcrypt
from sqlalchemy.orm import Mapped
from datetime import datetime

class Employee(db.Model):
    __tablename__ = 'employee'
    
    
    id: Mapped[int] = db.Column(db.Integer, primary_key=True, autoincrement=True
                                , nullable=False, index=True)
    
    name: Mapped[str] = db.Column(db.String(50), nullable=False)
    email: Mapped[str] = db.Column(db.String(60), nullable=False)
    password_hash: Mapped[str] = db.Column(db.String(250), nullable=False)
    phone: Mapped[str] = db.Column(db.String(20), nullable=False)
    office: Mapped[str] = db.Column(db.String(50), nullable=False)
    register_date: Mapped[datetime] = db.Column(db.DateTime, nullable=False
                                    , default=datetime.now, index=True)
     
    def set_password(self, password):
        self.password_hash = (bcrypt
                              .generate_password_hash(password)
                              .decode('utf-8'))
    
    def check_password(self, password):
        return bcrypt.check_password_hash(self.password_hash, password)
    
    def __repr__(self) -> str:
        return f'<Employee: {self.id}>'


