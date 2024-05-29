from api import ma
from ..Models import client_model
from marshmallow import fields


class UserSchema(ma.Schema):
    class Meta:
        model = client_model.User
        fields = ('name', 'email', 'phone', 'register_date')
        
    name = fields.String(required=True)
    email = fields.String(required=True)
    phone = fields.String(required=True)
    register_date = fields.DateTime('%Y-%m-%d')
    
    
class ClientRegisterSchema(ma.Schema):
    class Meta:
        model = client_model.User
        fields = ('name', 'password', 'email', 'phone', 'register_date')

    name = fields.String(required=True)
    password = fields.String(required=True)
    email = fields.String(required=True)
    phone = fields.String(required=True)
    register_date = fields.DateTime('%Y-%m-%d')