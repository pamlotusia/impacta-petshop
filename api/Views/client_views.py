from flask_restful import Resource
from flask import request, jsonify, make_response
from flask_jwt_extended import create_access_token
from datetime import datetime
from api import api
from ..Services import client_services
from ..Schemas import client_schema
from ..Entities import client_ident
from ..Models.client_model import User


class Login(Resource):
    def post(self):
        email = request.json.get('email')
        password = request.json.get('password')

        # Verificar se o cliente existe
        existing_user = User.query.filter_by(email = email).first()

        if existing_user:
            if (existing_user.check_password(password) and 
                existing_user.email):
                user_data = {
                    "access": 'allowed',
                    'token': create_access_token(
                        identity=existing_user.id
                        , additional_claims= {
                            "acess_time": datetime.utcnow().isoformat(),
                            "client_ip": request.remote_addr,
                            "clint_id": existing_user.id
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
                jsonify({'error': 'user does not exist'})
                , 401)


class CreateAccount(Resource):
    def post(self):
        schema = client_schema.ClientRegisterSchema()
        errors = schema.validate(request.json)

        if errors:
            return make_response(jsonify({'errors': errors}), 400)
        
        name = request.json.get('name')
        password = request.json.get('password')
        email = request.json.get('email')
        phone = request.json.get('phone')

        # Verificar se o usuário já existe com base no CPF ou email
        existing_user = client_services.filter_client_by_email(email)
        

        if existing_user:
            if existing_user.email:
                return make_response(
                    jsonify(
                        {"error": 
                            "User already exists"}
                        ), 400)
        else:
            new_client = client_ident.ClientRegister(
                name=name
                , password=password
                , email = email
                , phone = phone
                , register_date=datetime.now()  # Ou a data desejada
            )

            register = client_services.client_register(new_client)
            response = schema.dump(register)
            return make_response(response, 201)


# Criando rotas
api.add_resource(Login, '/login')
api.add_resource(CreateAccount, '/create-account')
