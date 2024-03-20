from api import api
from flask_restful import Resource
from ..Schemas import pet_grooming_schema
from ..Services import pet_grooming_services
from ..Services import employee_services
from flask import make_response, request, jsonify
from flask_jwt_extended import jwt_required


class AllSchedules(Resource):
    @jwt_required()
    def get(self):
        pet_list = pet_grooming_services.filter_all_schedules()
        schema = pet_grooming_schema.PetSchedules(many=True)
        response = schema.dump(pet_list)
        return make_response(
            response
            , 201
        )
        
    def post(self):
        schema = pet_grooming_schema.UpdateSchedulesState()  
        errors = schema.validate(request.json)   

        if errors:
            return make_response(jsonify({'errors': errors}), 400)
        else:
            schedules_id = request.json.get("id")
            status = request.json.get("status")
            employee_services.update_status(schedules_id, status)

        
        


api.add_resource(AllSchedules, '/all-schedules')
