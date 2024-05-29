class ClientRegister():
    def __init__(self, name, password, email, phone, register_date):
        self.__name = name
        self.__password = password
        self.__email = email
        self.__phone = phone
        self.__register_date = register_date

    @property
    def name(self):
        return self.__name 
    
    @name.setter
    def name(self, name):
        self.__name = name
        
    @property
    def password(self):
        return self.__password
    
    @password.setter
    def password(self, password):
        self.__password = password 
        
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
    def register_date(self):
        return self.__register_date
    
    @register_date.setter
    def register_date(self, register_date):
        self.__register_date = register_date
