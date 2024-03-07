from ..Models.client_model import User
from api import db


def client_register(client):
    new_user = User(
        name = client.name
        , email = client.email
        , phone = client.phone
    )

    new_user.set_password(client.password)
    
    # Adiciona o novo usuário ao banco de dados
    db.session.add(new_user)
    db.session.commit()
    
    return new_user



def filter_client_by_email(email):
    user = User.query.filter_by(email=email).one_or_none()
    return user

def filter_client_by_id(id):
    user = User.query.filter_by(id=id).one_or_none()
    return user