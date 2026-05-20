from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from Server.database import users_collection, polls_collection
from bson import ObjectId

app = FastAPI(title="SVE - Sistema de Votação Eletrónica")




# Configuração do CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], # URL onde o seu React está a correr
    allow_credentials=True,
    allow_methods=["*"], # Permite todos os métodos (POST, GET, etc.)
    allow_headers=["*"], # Permite todos os headers
)


class User(BaseModel):
    user_id: Optional[int] = None
    username: str
    password: str

class PollCreate(BaseModel):
    title: str
    options: List[str]
    creator_id: int

class LoginData(BaseModel):
    username: str
    password: str




@app.post("/signup")
async def create_user(user_in: User): 
    if users_collection.find_one({"username": user_in.username}):
        raise HTTPException(status_code=400, detail="Este utilizador já existe")
    
    import random
    user_dict = {
        "user_id": random.randint(1000, 9999),
        "username": user_in.username,
        "password": user_in.password
    }
    
    users_collection.insert_one(user_dict)
    return {"user_id": user_dict["user_id"], "username": user_dict["username"]}




@app.post("/login")
async def login(data: LoginData):
    user = users_collection.find_one({"username": data.username, "password": data.password})
    if not user:
        raise HTTPException(status_code=401, detail="Credenciais inválidas")
    
    return {
        "user_id": user["user_id"], 
        "username": user["username"],
        "message": "Login realizado com sucesso"
    }




@app.post("/polls/")
async def create_poll(poll: PollCreate):
    formatted_options = [{"name": opt, "votes": 0} for opt in poll.options]
    
    new_poll = {
        "title": poll.title,
        "creator_id": poll.creator_id,
        "options": formatted_options,
        "voters": [], 
        "is_active": True
    }
    
    result = polls_collection.insert_one(new_poll)
    return {"id": str(result.inserted_id), "is_active": True, "message": "Urna criada"}


@app.post("/polls/{poll_id}/vote")
async def vote(poll_id: str, option_name: str, user_id: int):
    poll = polls_collection.find_one({"_id": ObjectId(poll_id)})
    if not poll:
        raise HTTPException(status_code=404, detail="Urna não encontrada")
  
    if not poll.get("is_active", True):
        raise HTTPException(status_code=400, detail="Esta votação já está encerrada")

    if user_id in poll.get("voters", []):
        raise HTTPException(status_code=400, detail="Já votou nesta urna")

    polls_collection.update_one(
        {"_id": ObjectId(poll_id), "options.name": option_name},
        {"$inc": {"options.$.votes": 1}, "$push": {"voters": user_id}}
    )
    return {"message": "Voto registado"}



@app.get("/polls/")
async def get_all_polls():
    polls = []
    for p in polls_collection.find():
        p["_id"] = str(p["_id"])
        polls.append(p)
    return polls



@app.delete("/polls/{poll_id}")
async def delete_poll(poll_id: str, user_id: int):
    result = polls_collection.delete_one({"_id": ObjectId(poll_id), "creator_id": user_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=403, detail="Não autorizado ou urna inexistente")
    return {"message": "Urna removida"}



@app.patch("/polls/{poll_id}/close")
async def close_poll(poll_id: str, user_id: int):

    poll = polls_collection.find_one({"_id": ObjectId(poll_id)})
    
    if not poll:
        raise HTTPException(status_code=404, detail="Urna não encontrada")
    if poll["creator_id"] != user_id:
        raise HTTPException(status_code=403, detail="Apenas o criador pode fechar a urna")

    polls_collection.update_one(
        {"_id": ObjectId(poll_id)},
        {"$set": {"is_active": False}}
    )
    return {"message": "Urna encerrada com sucesso"}