from api import api
from flask_restful import Resource
from ..Entities import pet_grooming_ident
from ..Schemas import pet_grooming_schema
from ..Services import pet_grooming_services, pet_services
from flask import request, make_response, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity


class CreateSchedules(Resource):
    @jwt_required()
    def post(self):
        schema = pet_grooming_schema.CreateSchedules()
        errors = schema.validate(request.json)

        if errors:
            return make_response(jsonify({'errors': errors}), 400)
        
        guardian_id = get_jwt_identity()
        pet_id = request.json.get('pet_id')
        schedules = request.json.get('schedules')
        
        guardian_pets = pet_services.filter_all_pets_by_guardian(guardian_id)
        pet_exist = any(data.id == pet_id for data in guardian_pets)
        schedules_exist = pet_grooming_services.schedules_exist(schedules)
        
        print('\n', pet_exist, '\n')
        print('\n', schedules_exist, '\n')
        
        if not schedules_exist:
            if not pet_exist:
                return make_response(jsonify({"error": "Pet does not exists"}), 400)
            else:
                new_schedules = pet_grooming_ident.PetGrooming(
                    guardian_id = guardian_id
                    , pet_id = pet_id
                    , schedules = schedules
                )
                
                create = pet_grooming_services.create_schedules(new_schedules)
                response = schema.dump(create)
                return make_response(
                    response
                    , 201     
                )
        else:
            return make_response(
                jsonify({"error": "Schedules already exists"})
                , 400)
            
        
        
class ListSchedules(Resource):
    @jwt_required()
    def get(self):
        pet_list = (pet_grooming_services
                    .filter_schedules_by_petGuardian(get_jwt_identity()))
        schema = pet_grooming_schema.PetSchedules(many=True)
        response = schema.dump(pet_list)
        return make_response(
            response
            , 201
        )
        

api.add_resource(CreateSchedules, '/create-schedules')
api.add_resource(ListSchedules, '/list-schedules')