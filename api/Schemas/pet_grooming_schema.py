from api import ma
from marshmallow import fields
from ..Models import pet_grooming_model



<<<<<<< HEAD
=======
# class PetSchedules(ma.Schema):
#     class Meta:
#         model = pet_grooming_model.PetGroomingSchedules
#         fields = ('id', 'guardian_id', 'pet_id', 'schedules', 'price'
#                   , 'type_service', 'service')
        
#     id = fields.Integer(required=True)
#     guardian_id = fields.Integer(required=True)
#     pet_id = fields.Integer(required=True)
#     schediules = fields.DateTime(required=True)
#     price = fields.Decimal(required=True)
#     type_service = fields.String(required=True)
#     service = fields.String(required=True)

>>>>>>> 05477f3cb8ab03ecc30c44ac17b6cd8b1cd1dd5c
class PetSchedules(ma.Schema):
    class Meta:
        model = pet_grooming_model.PetGroomingSchedules
        fields = ('id', 'guardian_id', 'pet_id', 'pet_name', 'pet_type', 'schedules'
                  , 'price', 'type_service', 'service')
        
    id = fields.Integer(required=True)
    guardian_id = fields.Integer(required=True)
    pet_id = fields.Integer(required=True)
    schedules = fields.DateTime(required=True)
    price = fields.Decimal(required=True)
<<<<<<< HEAD
    
=======
    type_service = fields.String(required=True)
    service = fields.String(required=True)
    pet_name = fields.String(required=True)
    pet_type = fields.String(required=True)

>>>>>>> 05477f3cb8ab03ecc30c44ac17b6cd8b1cd1dd5c

class CreateSchedules(ma.Schema):
    class Meta:
        model = pet_grooming_model.PetGroomingSchedules
        fields = ('pet_id', 'schedules', 'price', 'type_service', 'service')
    
    pet_id = fields.Integer(required=True)
    schedules = fields.DateTime(required=True)
    price = fields.Decimal(required=True)
    type_service = fields.String(required=True)
    service = fields.String(required=True)
    

