from api import ma
from marshmallow import fields
from ..Models import pet_grooming_model



class PetSchedules(ma.Schema):
    class Meta:
        model = pet_grooming_model.PetGroomingSchedules
        fields = ('id', 'guardian_id', 'pet_id', 'schedules', 'price')
        
    id = fields.Integer(required=True)
    guardian_id = fields.Integer(required=True)
    pet_id = fields.Integer(required=True)
    schediules = fields.DateTime(required=True)
    price = fields.Decimal(required=True)
    

class CreateSchedules(ma.Schema):
    class Meta:
        model = pet_grooming_model.PetGroomingSchedules
        fields = ('pet_id', 'schedules', 'price')
    
    pet_id = fields.Integer(required=True)
    schedules = fields.DateTime(required=True)
    price = fields.Decimal(required=True)
    

