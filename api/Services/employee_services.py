from ..Models.employees_model import Employee
from api import db


def create_employee(client):
    new_user = Employee(
        name = client.name
        , email = client.email
        , phone = client.phone
        , office = client.office
    )

    new_user.set_password(client.password)
    
    # Adiciona o novo usuário ao banco de dados
    db.session.add(new_user)
    db.session.commit()
    
    return new_user



def employee_exist(name, email, office):
    employee = Employee.query.filter_by(name=name, email=email, office=office).one_or_none()
    return employee

def filter_employee_by_email(email):
    user = Employee.query.filter_by(email=email).one_or_none()
    return user