from api import db
from typing import List
from ..Models.pet_grooming_model import PetGroomingSchedules 
from .email_services import Email

def create_schedules(pet):
    new_schedules: PetGroomingSchedules = PetGroomingSchedules(
        guardian_id = pet.guardian_id
        , pet_id = pet.pet_id
        , schedules = pet.schedules
        , price = pet.price
        , type_service = pet.type_service
        , service = pet.service
    )
    db.session.add(new_schedules)
    db.session.commit()
    
    with Email() as email:
        if ('outlook' in new_schedules.guardian.email
            or 'hotmail' in new_schedules.guardian.email):
            email.send_outlook(new_schedules.guardian.email
                            , 'Confirmação de Agendamento'
                            , new_schedules.guardian.name
                            , new_schedules.schedules
                            , new_schedules.service
                            , new_schedules.pet.name) 
        else:
             email.send_gmail(new_schedules.guardian.email
                            , 'Confirmação de Agendamento'
                            , new_schedules.guardian.name
                            , new_schedules.schedules
                            , new_schedules.service
                            , new_schedules.pet.name)            

    return new_schedules


def filter_schedules_by_petGuardian(guardian_id: int):
    pet_schedules: List = PetGroomingSchedules.query.filter_by(guardian_id = guardian_id).all()
    json_data = []
    for schedule in pet_schedules:
    # Montar um dicionário com as informações necessárias, incluindo o nome do pet
        schedule_data = {
            "guardian_id": schedule.guardian_id
            , "id": schedule.id
            , "pet_id": schedule.pet_id
            , "price": str(schedule.price) # Convertendo para string, se necessário
            , "schedules": schedule.schedules # Formatando a data e hora no formato ISO 8601
            , "service": schedule.service
            , "type_service": schedule.type_service
            , "pet_name": schedule.pet.name  # Obtendo o nome do pet através do relacionamento
            , "pet_type": schedule.pet.pet_type  # Obtendo o nome do pet através do relacionamento
            , "nameOwner": schedule.guardian.name  # Obtendo o nome do pet através do relacionamento
        }
        
        json_data.append(schedule_data)
    return json_data

def filter_all_schedules():
    pet_schedules: List = PetGroomingSchedules.query.all()
    json_data = []
    for schedule in pet_schedules:
    # Montar um dicionário com as informações necessárias, incluindo o nome do pet
        schedule_data = {
            "guardian_id": schedule.guardian_id
            , "id": schedule.id
            , "pet_id": schedule.pet_id
            , "pet_size": schedule.pet.size
            , "price": str(schedule.price) # Convertendo para string, se necessário
            , "schedules": schedule.schedules # Formatando a data e hora no formato ISO 8601
            , "service": schedule.service
            , "type_service": schedule.type_service
            , "pet_name": schedule.pet.name  # Obtendo o nome do pet através do relacionamento
            , "pet_type": schedule.pet.pet_type  # Obtendo o nome do pet através do relacionamento
            , "nameOwner": schedule.guardian.name  # Obtendo o nome do pet através do relacionamento
            , "status": schedule.status # Obtendo o nome do pet através do relacionamento
        }
        
        json_data.append(schedule_data)
    return json_data


def filter_schedules_by_pet(pet_id: int):
    schedules: List = PetGroomingSchedules.query.filter_by(pet_id = pet_id).all()
    return schedules

def filter_schedules_by_id(schedules_id: int):
    schedule: PetGroomingSchedules = PetGroomingSchedules.query.filter_by(id = schedules_id).one_or_none()
    return schedule

def schedules_exist(date):
    scheduless = (PetGroomingSchedules
                 .query
                 .filter(PetGroomingSchedules.schedules == date)
                 .one_or_none())
    return scheduless