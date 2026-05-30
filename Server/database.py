from pymongo import MongoClient
import os


MONGO_URL = os.getenv("MONGO_URL", "mongodb://localhost:27017/")

client = MongoClient(MONGO_URL)
db = client.sve_database  


users_collection = db.users
polls_collection = db.polls