from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, field_validator
from typing import List, Optional
from Server.database import users_collection, polls_collection
from bson import ObjectId
import time
import uuid

app = FastAPI(title="SVE - Sistema de Votação Eletrónica")




# Configuração do CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], 
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"], 
)



def generate_secure_int_id() -> int:
    timestamp = int(time.time() * 100000)
    random_suffix = uuid.uuid4().int % 10000
    return int(f"{timestamp}{random_suffix}") % 100000000


class User(BaseModel):
    user_id: Optional[int] = None
    username: str = Field(..., min_length=3, max_length=30)
    password: str = Field(..., min_length=4)

    @field_validator('username')
    def username_whitespace(cls, v):
        if not v.strip():
            raise ValueError('O username não pode ser composto apenas por espaços em branco')
        return v.strip()
    
    

class PollCreate(BaseModel):
    title: str = Field(..., min_length=4, max_length=150)
    options: List[str]
    creator_id: int
    creator_name: str = Field(..., min_length=3)

    @field_validator('title')
    def title_whitespace(cls, v):
        if not v.strip():
            raise ValueError('O título da votação não pode estar vazio')
        return v.strip()

    @field_validator('options')
    def validate_options_list(cls, v):
        cleaned_options = [opt.strip() for opt in v if opt.strip()]
        
        if len(cleaned_options) < 2:
            raise ValueError('A urna necessita de pelo menos 2 opções válidas preenchidas')
        
        lowercase_options = [opt.lower() for opt in cleaned_options]
        if len(lowercase_options) != len(set(lowercase_options)):
            raise ValueError('Não são permitidas opções duplicadas na mesma urna')
            
        return cleaned_options

class LoginData(BaseModel):
    username: str
    password: str

class Poll(BaseModel):
    poll_id: Optional[int] = None
    title: str
    creator_id: int
    creator_name: str
    options: List[str]
    voters: List[int]
    is_active: bool

class VoteData(BaseModel):
    option_name: str 
    user_id: int


@app.post("/signup")
async def create_user(user_in: User): 
    if users_collection.find_one({"username": user_in.username}):
        raise HTTPException(status_code=400, detail="Este utilizador já existe")
    
    secure_id = generate_secure_int_id()

    user_dict = {
        "user_id": secure_id,
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
    
    if polls_collection.find_one({"title": poll.title}):
        raise HTTPException(
            status_code=400, 
            detail="Já existe uma votação com esse título. Escolha um nome diferente."
        )
    
    secure_poll_id = generate_secure_int_id()

    new_poll = {
        "poll_id": secure_poll_id,
        "title": poll.title,
        "creator_id": poll.creator_id,
        "creator_name":poll.creator_name,
        "options": formatted_options,
        "voters": [], 
        "is_active": True
    }
    
    result = polls_collection.insert_one(new_poll)
    return {"id": str(result.inserted_id),"poll_id":secure_poll_id, "is_active": True, "message": "Urna criada"}


@app.post("/polls/{poll_id}/vote")
async def vote(poll_id: str, data: VoteData):
    poll = polls_collection.find_one({"_id": ObjectId(poll_id)})
    if not poll:
        raise HTTPException(status_code=404, detail="Urna não encontrada")
  
    if not poll.get("is_active", True):
        raise HTTPException(status_code=400, detail="Esta votação já está encerrada")

    if data.user_id in poll.get("voters", []):
        raise HTTPException(status_code=400, detail="Já votou nesta urna")

    polls_collection.update_one(
        {"_id": ObjectId(poll_id), "options.name": data.option_name},
        {"$inc": {"options.$.votes": 1}, "$push": {"voters": data.user_id}}
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


@app.patch("/polls/{poll_id}/open")
async def open_poll(poll_id: str, user_id: int):

    poll = polls_collection.find_one({"_id": ObjectId(poll_id)})
    
    if not poll:
        raise HTTPException(status_code=404, detail="Urna não encontrada")
    if poll["creator_id"] != user_id:
        raise HTTPException(status_code=403, detail="Apenas o criador pode abrir a urna")

    polls_collection.update_one(
        {"_id": ObjectId(poll_id)},
        {"$set": {"is_active": True}}
    )
    return {"message": "Urna aberta com sucesso"}