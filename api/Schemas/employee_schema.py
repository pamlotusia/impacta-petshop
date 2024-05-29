from api import ma
from ..Models import employees_model
from marshmallow import fields


class EmployeeSchema(ma.Schema):
    class Meta:
        model = employees_model.Employee
        fields = ('name', 'email', 'phone', 'office')
        
    name = fields.String(required=True)
    email = fields.String(required=True)
    phone = fields.String(required=True)
    office = fields.String(required=True)
    
    

class CreateEmployeeSchema(ma.Schema):
    class Meta:
        model = employees_model.Employee
        filds = ('name', 'email', 'phone', 'office', 'password')
    
    name = fields.String(required=True)
    email = fields.String(required=True)
    phone = fields.String(required=True)
    office = fields.String(required=True)
    password = fields.String(required=True)
    

class EmployeeLoginSchema(ma.Schema):
    class Meta:
        model = employees_model.Employee
        filds = ('email', 'password')
        
        
    email = fields.String(required=True)
    password = fields.String(required=True)