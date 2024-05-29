from ..Models.employees_model import Employee
from api import db
from ..Services import pet_grooming_services

def create_employee(client: Employee):
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



def employee_exist(name: str, email: str, office: str):
    employee = Employee.query.filter_by(name=name, email=email, office=office).one_or_none()
    return employee

def filter_employee_by_email(email: str):
    user = Employee.query.filter_by(email=email).one_or_none()
    return user


def update_status(schedules_id: int, status: str):
    schedule = pet_grooming_services.filter_schedules_by_id(schedules_id)
    
    if schedule:
        schedule.status = status
        db.session.commit()
    