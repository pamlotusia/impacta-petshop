from flask_restful import Resource
from flask import request, jsonify, make_response
from flask_jwt_extended import (jwt_required, get_jwt_identity
                                ,create_access_token)
from datetime import datetime
from api import api
from ..Services import employee_services
from ..Schemas import employee_schema
from ..Entities import employee_ident
from ..Models.employees_model import Employee



class CreateEmployee(Resource):
    def post(self):
        schema = employee_schema.CreateEmployeeSchema()
        errors = schema.validate(request.json)
        
        
        if errors:
            return make_response(jsonify({'errors': errors}), 400)
        
        
        name = request.json.get('name')
        email = request.json.get('email')
        phone = request.json.get('phone')
        office = request.json.get('office')
        password = request.json.get('password')
        
        
        employee_exist = employee_services.employee_exist(name, email, office)
  
        if employee_exist:
            return make_response(
                jsonify(
                    {"error": "employee already exist"}
                ), 400)      
        else:
            new_employee = employee_ident.Employee(
                name = name
                , email = email
                , phone = phone
                , office = office
                , password = password
            )
            
            create_employee = employee_services.create_employee(new_employee)
            response = schema.dump(create_employee)
            
            return make_response(
                response
                , 201
            )
            

class EmployeeLogin(Resource):
    def post(self):
        schema = employee_schema.EmployeeLoginSchema()
        errors = schema.validate(request.json)
        
        if errors:
            return make_response(jsonify({'errors': errors}), 400)    
    
        email = request.json.get('email')
        password = request.json.get('password')
        
        employee_exist = employee_services.filter_employee_by_email(email)
        
        if employee_exist:
            if (employee_exist.email  and 
                employee_exist.check_password(password)):
                user_data = {
                    "access": "allowed"
                    , "token": create_access_token(
                        identity= employee_exist.id
                        , additional_claims= {
                            "acess_time": datetime.utcnow().isoformat()
                            , "client_ip": request.remote_addr
                            , "client_id": employee_exist.id
                            }
                        )
                    }
                return make_response(jsonify(user_data), 200)        
            else: 
                return make_response(
                    jsonify({'error': 'invalid credentials'})
                    , 401)    
        else:
            return make_response(
                jsonify({'error': 'Employee does not exist'})
                , 401)
                      

            
api.add_resource(CreateEmployee, '/create-employee')
api.add_resource(EmployeeLogin, '/employee-login')