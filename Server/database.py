from pymongo import MongoClient
import os

# A URL usa o nome do serviço definido no docker-compose ('mongodb')
MONGO_URL = os.getenv("MONGO_URL", "mongodb://localhost:27017/")

client = MongoClient(MONGO_URL)
db = client.sve_database  # Nome da sua base de dados

# Coleções para o seu projeto
users_collection = db.users
polls_collection = db.polls