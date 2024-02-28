from api import db
from typing import List
from ..Models.pet_grooming_model import PetGroomingSchedules 

def create_schedules(pet):
    new_schedules: PetGroomingSchedules = PetGroomingSchedules(
        guardian_id = pet.guardian_id
        , pet_id = pet.pet_id
        , schedules = pet.schedules
        , price = pet.price
    )
    db.session.add(new_schedules)
    db.session.commit()
    return new_schedules


def filter_schedules_by_petGuardian(guardian_id: int):
    schedules: List = PetGroomingSchedules.query.filter_by(guardian_id = guardian_id).all()
    return schedules


def filter_schedules_by_pet(pet_id: int):
    schedules: List = PetGroomingSchedules.query.filter_by(pet_id = pet_id).all()
    return schedules

def schedules_exist(date):
    scheduless = (PetGroomingSchedules
                 .query
                 .filter(PetGroomingSchedules.schedules == date)
                 .one_or_none())
    return scheduless