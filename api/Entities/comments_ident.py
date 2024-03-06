class Comment:
    def __init__(self, comment) -> None:
        self.__comments = comment       
    
    @property
    def comments(self):
        return self.__comments
    
    @comments.setter
    def comments(self, comment):
        self.__comments = comment
        
    