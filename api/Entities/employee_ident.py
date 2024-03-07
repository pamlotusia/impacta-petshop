class Employee:
    def __init__(self, name: str, email: str, phone: str
                 , office: str, password: str) -> None:
        self.__name = name
        self.__email = email
        self.__phone = phone
        self.__office = office
        self.__password = password
        
    
    @property
    def name(self):
        return self.__name
    
    @name.setter
    def name(self, name):
        self.name = name
        
    @property
    def email(self):
        return self.__email
    
    @email.setter
    def email(self, email):
        self.__email = email
        
    @property
    def phone(self):
        return self.__phone
    
    @phone.setter
    def phone(self, phone):
        self.__phone = phone
        
    @property
    def office(self):
        return self.__office
    
    @office.setter
    def office(self, office):
        self.__office = office
        
    
    @ property
    def password(self):
        return self.__password
    
    @password.setter
    def password(self, password):
        self.__password = password