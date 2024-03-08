from api import api
from flask_restful import Resource
from ..Schemas import pet_grooming_schema
from ..Services import pet_grooming_services
from flask import make_response
from flask_jwt_extended import jwt_required, get_jwt_identity


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
        

api.add_resource(AllSchedules, '/all-schedules')
