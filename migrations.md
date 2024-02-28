# Criando minha migração

entrar no diretorio: ** cd venv/Scripts **
rodar o comando: ** export FLASK_APP=api.py **
voltar para a pasta raiz do projeto: cd .. cd..
rodar o comando: ** flask db init **


# Executando migrações

** flask db migrate ** = Cria uma migração
** flask db upgrade ** = cria ou altera o estado das tabelas no banco de dados
** flask db downgrade ** = apaga ou remove a ultima alteração da tabela no banco de dados