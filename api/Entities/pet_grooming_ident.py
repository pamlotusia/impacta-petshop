from datetime import datetime
class PetGrooming:
    def __init__(self, guardian_id: int, pet_id: int, schedules: datetime, price: float, type_service: str, service: str) -> None:
        self.__guardian_id = guardian_id
        self.__pet_id = pet_id
        self.__schedules = schedules
        self.__price = price
        self.__type_service = type_service
        self.__service = service
        
    
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
        
    @property
    def price(self):
        return self.__price
    
    @price.setter
    def price(self, price):
        self.__price = price
        
    @property
    def type_service(self):
        return self.__type_service
    
    @type_service.setter
    def type_service(self, type_service):
        self.__type_service = type_service
        
    @property
    def service(self):
        return self.__service
    
    @service.setter
    def service(self, service):
        self.__service = service