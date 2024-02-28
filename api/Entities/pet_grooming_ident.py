from datetime import datetime
class PetGrooming:
    def __init__(self, guardian_id: int, pet_id: int, schedules: datetime) -> None:
        self.__guardian_id = guardian_id
        self.__pet_id = pet_id
        self.__schedules = schedules
        
    
    @property
    def guardian_id(self):
        return self.__guardian_id
    
    @guardian_id.setter
    def guardian_id(self, id):
        self.__guardian_id = id
        
    @property
    def pet_id(self):
        return self.__pet_id
    
    @pet_id.setter
    def pet_id(self, id):
        self.__pet_id = id
        
    @property
    def schedules(self):
        return self.__schedules
    
    @schedules.setter
    def schefules(self, schedules):
        self.__schedules = schedules