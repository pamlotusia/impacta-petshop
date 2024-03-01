


# Rotas da api 
### **/create-account:**
```JSON
{
    "name": "João",
    "password": "joao2451",
    "email": "joao@example.com", 
    "phone": "123456789"
}
```



### **/login:**
Devolve um token jwt
```JSON
{
    "email": "joao@example.com",
     "password": "joao2451"
}
```

### **/creat-pet**
Necessário estar autenticado pelo token jwt
```JSON
{
    "name": "Fido",
    "age": 3,
    "pet_type": "Dog",
    "weight": 10,
    "size": "Medium",
    "temper": "Friendly"
}
```

### **/schedules**
Necessário estar autenticado pelo token jwt
```JSON
{
    "pet_id": 1,
    "schedules": "2024-03-05T15:30:00"
}
```
