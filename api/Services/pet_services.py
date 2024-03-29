from ..Models.pet_model import Pet
from ..Models.comments_model import petComments
from api import db


def create_pet(pet, comment):
    new_pet = Pet(
        name = pet.name
        , age = pet.age
        , pet_type = pet.pet_type
        , weight = pet.weight
        , size = pet.size
        , temper = pet.temper
        , guardian_id = pet.guardian
    )
    db.session.add(new_pet)
    db.session.commit()
    
    new_comment = petComments(
        comment = comment
        , pet_id = new_pet.id
        , guardian_id = pet.guardian
    )
    
    db.session.add(new_comment)
    db.session.commit()
    
    return new_pet


def filter_pet_by_name_and_guardian(name, guardian):
    pet = Pet.query.filter(Pet.name == name, Pet.guardian_id == guardian).one_or_none()
    return pet


def filter_all_pets_by_guardian(id):
    pets = Pet.query.filter_by(guardian_id=id).all()
    return pets


