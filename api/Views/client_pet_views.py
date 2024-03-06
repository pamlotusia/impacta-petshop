from api import api
from datetime import datetime
from ..Schemas import pet_schema
from flask_restful import Resource
from ..Services import pet_services
from ..Entities import pet_ident, comments_ident
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask import request, jsonify, make_response


class Pets(Resource):
    @jwt_required()
    def post(self):
        schema = pet_schema.CreatePetSchema()
        errors = schema.validate(request.json)
        
        if errors:
            print(errors)
            return make_response(jsonify({'errors': errors}), 400)
        
        pet_name = request.json.get('name')
        pet_age = request.json.get('age')  
        pet_type = request.json.get('pet_type')
        pet_weight = request.json.get('weight')
        pet_size = request.json.get('size')
        pet_temper = request.json.get('temper')
        pet_guardian_id = get_jwt_identity()
        pet_comment = request.json.get('comment')
        
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
            
          

            create_pet = pet_services.create_pet(new_pet, pet_comment) # alterado
            response = schema.dump(create_pet)

            return make_response(
                response
                , 201
            )
            
    @jwt_required()
    def get(self):
        guardian_id = get_jwt_identity()
        pet_list = pet_services.filter_all_pets_by_guardian(guardian_id)
        print('\n', pet_list, '\n')
        schema = pet_schema.PetSchema(many=True)
        response = schema.dump(pet_list)
        return make_response(
            response
            , 200
        )
        

api.add_resource(Pets, '/pets')
