# criar o projeto no firebase

# criar o database

# interação com o database (api rest)
import requests
import json


link = "https://petshop-impacta-ae693-default-rtdb.firebaseio.com/"

# criar uma venda(post)
# dados = {'produto': 'pendrive', 'quantidade': 2, 'valor': 20}
# requisicao = requests.post(f'{link}/vendas/.json', data=json.dumps(dados))
# print(requisicao)
# print(requisicao.text)

# criar um novo produto(post)
dados = {'nome': 'caneta', 'descricao': 'azul', 'quantidade': 10}
requisicao = requests.post(f'{link}/produto/.json', data=json.dumps(dados))
print(requisicao)
print(requisicao.text)

# criar editar a venda(patch)
# dados = {'produto': 'isqueiro'}
# requisicao = requests.patch(f'{link}/vendas/-NctCgOwcA86dzh-hdYO/.json', data=json.dumps(dados))
# print(requisicao)
# print(requisicao.text)

# pegar uma venda especifico ou todas as vendas (get)
requisicao = requests.get(f'{link}/produto/.json')
print(requisicao)
dic_requisicao = requisicao.json()
print(dic_requisicao)
id_caderno = None

for id_produto in dic_requisicao:
    produto = dic_requisicao[id_produto]['nome']
    print(produto)
    if produto == 'caderno':
        print(id_produto)
        id_caderno = id_produto


# deletar uma venda (delete)
requisicao = requests.delete(f'{link}/produto/{id_caderno}/.json')
print(requisicao)
print(requisicao.text)

# o que seria de legal após isso?
# autenticação
