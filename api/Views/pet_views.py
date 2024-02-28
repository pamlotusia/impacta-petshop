from api import api
from datetime import datetime
from ..Schemas import pet_schema
from flask_restful import Resource
from ..Services import pet_services
from ..Entities import pet_ident
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask import request, jsonify, make_response


class CreatePet(Resource):
    @jwt_required()
    def post(self):
        schema = pet_schema.CreatePetSchema()
        errors = schema.validate(request.json)
        
        if errors:
            return make_response(jsonify({'errors': errors}), 400)
        
        pet_name = request.json.get('name')
        pet_age = request.json.get('age')  
        pet_type = request.json.get('pet_type')
        pet_weight = request.json.get('weight')
        pet_size = request.json.get('size')
        pet_temper = request.json.get('temper')
        pet_guardian_id = get_jwt_identity()
        
        pet_exist = pet_services.filter_pet_by_name_and_guardian(pet_name
                                                                , pet_guardian_id)
        
        if pet_exist:
            return make_response(
                        jsonify(
                            {"error": 
                                "Pet already exists"}
                            ), 400)
        else:
            new_pet = pet_ident.Pet(
                name = pet_name
                , age = pet_age
                , pet_type = pet_type
                , weight = pet_weight
                , size = pet_size
                , temper = pet_temper
                , guardian = pet_guardian_id
            )

            create_pet = pet_services.create_pet(new_pet)
            response = schema.dump(create_pet)

            return make_response(
                response
                , 201
            )
            
class ListPets(Resource):
    @jwt_required()
    def get(self):
        guardian_id = get_jwt_identity()
        pet_list = pet_services.list_all_pets(guardian_id)
        print('\n', pet_list, '\n')
        schema = pet_schema.PetSchema(many=True)
        response = schema.dump(pet_list)
        return make_response(
            response
            , 200
        )
        

api.add_resource(CreatePet, '/create-pet')
api.add_resource(ListPets, '/pet-list')