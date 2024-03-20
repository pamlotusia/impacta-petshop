from api import ma
from marshmallow import fields
from ..Models import pet_grooming_model



class PetSchedules(ma.Schema):
    class Meta:
        model = pet_grooming_model.PetGroomingSchedules
        fields = ('id', 'guardian_id', 'pet_id', 'pet_name', 'pet_type', 'schedules'
                  , 'price', 'type_service', 'service', 'nameOwner', 'pet_size', "status")
        
    id = fields.Integer(required=True)
    guardian_id = fields.Integer(required=True)
    pet_id = fields.Integer(required=True)
    pet_size = fields.String(required=True)
    pet_name = fields.String(required=True)
    pet_type = fields.String(required=True)
    schedules = fields.DateTime(required=True)
    price = fields.Decimal(required=True)
    type_service = fields.String(required=True)
    service = fields.String(required=True)
    nameOwner = fields.String(required=True)
    status = fields.String(required=True)
    

class CreateSchedules(ma.Schema):
    class Meta:
        model = pet_grooming_model.PetGroomingSchedules
        fields = ('pet_id', 'schedules', 'price', 'type_service', 'service')
    
    pet_id = fields.Integer(required=True)
    schedules = fields.DateTime(required=True)
    price = fields.Decimal(required=True)
    type_service = fields.String(required=True)
    service = fields.String(required=True)
    
    
    
class UpdateSchedulesState(ma.Schema):
    class Meta:
        model = pet_grooming_model.PetGroomingSchedules
        fields = ('id', 'status')
    
    id = fields.Integer(required=True)
    status = fields.String(required=True)

