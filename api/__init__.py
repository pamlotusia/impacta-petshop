from flask import Flask
from flask_restful import Api
from flask_marshmallow import Marshmallow
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt
from flask_cors import CORS # Adicione esta linha

app = Flask(__name__)
app.config.from_object('config')
    
db = SQLAlchemy(app)
ma = Marshmallow(app)
migrate = Migrate(app, db)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)
api = Api(app)
CORS(app)

CORS(app, resources={r"/*": {"origins": ["http://localhost:3000"]}}) # Permite solicitações apenas de http://localhost:3000

# importando nossas rotas (precisa estar no modulo inicial)
from .Views import (client_pet_views, client_views, petgrooming_views
                    , employee_views)
from .Models import (client_model, pet_grooming_model, pet_model
                     , comments_model, employees_model)