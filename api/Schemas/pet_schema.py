from api import ma
from ..Models import pet_model, comments_model
from marshmallow import fields



class PetSchema(ma.Schema):
    class Meta:
        model = pet_model.Pet
        fields = ('id','name', 'age', 'pet_type'
                  , 'weight', 'size', 'temper', 'guardian_id', 'register_date')
        
    id = fields.Integer(required=True)
    name = fields.String(required=True)
    age = fields.Integer(required=True)
    pet_type = fields.String(required=True)
    weight = fields.Float(required=True)
    size = fields.String(required=True)
    temper = fields.String(required=True)
    guardian_id = fields.Integer(required=True)
    register_date = fields.DateTime('%Y-%m-%d')
   

class CreatePetSchema(ma.Schema):
    class Meta:
        model = pet_model.Pet
<<<<<<< HEAD
        fields = ('name', 'age', 'pet_type', 'weight', 'size'
                  , 'temper', 'comment')
=======
        fields = ('name', 'age', 'pet_type', 'weight', 'size', 'temper', 'comment')
>>>>>>> 05477f3cb8ab03ecc30c44ac17b6cd8b1cd1dd5c
        
    name = fields.String(required=True)
    age = fields.Integer(required=True)
    pet_type = fields.String(required=True)
    weight = fields.Float(required=True)
    size = fields.String(required=True)
    temper = fields.String(required=True)
<<<<<<< HEAD
    comment = fields.String(required=True)
=======
    comment = fields.String(required=False)

>>>>>>> 05477f3cb8ab03ecc30c44ac17b6cd8b1cd1dd5c
