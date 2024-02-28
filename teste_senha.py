# import hashlib

# def generate_hash_from_number(number):
#     # Converte o número para uma string antes de calcular o hash
#     number_str = str(number)

#     # Cria um objeto de hash SHA256
#     hasher = hashlib.sha256()

#     # Atualiza o hash com os bytes da string do número
#     hasher.update(number_str.encode('utf-8'))

#     # Retorna a representação hexadecimal do hash
#     return hasher.hexdigest()

# # Exemplo de uso
# number = 20230152024
# hash_value = generate_hash_from_number(number)
# print("Número original:", number)
# print("Hash gerado:", hash_value)

# Lista de dicionários
lista_de_dicionarios = [
    {"nome": "Alicee", "idade": 30},
    {"nome": "Bob", "idade": 25},
    {"nome": "Charlie", "idade": 35}
]

# Valor a ser verificado
valor_procurado = "Alice"

# Verifica se o valor está presente na chave "nome" de algum dicionário na lista
valor_presente = any(dicionario["nome"] == valor_procurado for dicionario in lista_de_dicionarios)

# Imprime o resultado
if valor_presente:
    print(f'O valor "{valor_procurado}" está presente na lista de dicionários.')
else:
    print(f'O valor "{valor_procurado}" não está presente na lista de dicionários.')



