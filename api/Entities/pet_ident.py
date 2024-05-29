class Pet:
    def __init__(self, name, age, pet_type, weight, size, temper, guardian) -> None:
        self.__name = name
        self.__age = age
        self.__type = pet_type
        self.__weight = weight
        self.__size = size
        self.__temper = temper
        self.__guardian = guardian


    @property
    def name(self):
        return self.__name
    
    @name.setter
    def name(self, name):
        self.__name = name
        
    @property
    def age(self):
        return self.__age
    
    @age.setter
    def age(self, age):
        self.__age = age
        
    @property
    def pet_type(self):
        return self.__type
    
    @pet_type.setter
    def pet_type(self, pet_type):
        self.__type = pet_type
        
    @property
    def weight(self):
        return self.__weight
    
    @weight.setter
    def weight(self, weight):
        self.__weight = weight
        
    @property
    def size(self):
        return self.__size
    
    @size.setter
    def size(self, size):
        self.__size = size
        
    @property
    def temper(self):
        return self.__temper
    
    @temper.setter
    def temper(self, temper):
        self.__temper = temper
        
    @property
    def guardian(self):
        return self.__guardian
    
    @guardian.setter
    def guardian(self, guardian):
        self.__guardian = guardian
