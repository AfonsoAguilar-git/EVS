from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
# Dentro de Server.py
from Server.database import users_collection, polls_collection
from bson import ObjectId

app = FastAPI(title="SVE - Sistema de Votação Eletrónica")


class User(BaseModel):
    user_id: int  # ID artificial
    username: str
    password: str

class PollCreate(BaseModel):
    title: str
    options: List[str]
    creator_id: int



# 1. Criar Utilizador (com ID artificial)
@app.post("/users/")
async def create_user(user: User):
    if users_collection.find_one({"user_id": user.user_id}):
        raise HTTPException(status_code=400, detail="ID de utilizador já existe")
    
    user_dict = user.dict()
    users_collection.insert_one(user_dict)
    return {"message": "Utilizador criado com sucesso"}

# 2. Criar Urna (Poll)
@app.post("/polls/")
async def create_poll(poll: PollCreate):
    # Formata as opções para terem contagem de votos
    formatted_options = [{"name": opt, "votes": 0} for opt in poll.options]
    
    new_poll = {
        "title": poll.title,
        "creator_id": poll.creator_id,
        "options": formatted_options,
        "voters": [],  # Lista de IDs que já votaram
        "status": True
    }
    
    result = polls_collection.insert_one(new_poll)
    return {"id": str(result.inserted_id), "status": "Urna criada"}

# --- Rota de Votação (Atualizada) ---
@app.post("/polls/{poll_id}/vote")
async def vote(poll_id: str, option_name: str, user_id: int):
    poll = polls_collection.find_one({"_id": ObjectId(poll_id)})
    
    if not poll:
        raise HTTPException(status_code=404, detail="Urna não encontrada")
    
    # VERIFICAÇÃO: A urna está aberta?
    if not poll.get("is_active", True):
        raise HTTPException(status_code=400, detail="Esta votação já está encerrada")

    # Verificar se o utilizador já votou
    if user_id in poll.get("voters", []):
        raise HTTPException(status_code=400, detail="Já votou nesta urna")

    # Registar o voto...
    polls_collection.update_one(
        {"_id": ObjectId(poll_id), "options.name": option_name},
        {"$inc": {"options.$.votes": 1}, "$push": {"voters": user_id}}
    )
    return {"message": "Voto registado"}



# 4. Ver Resultados (Público)
@app.get("/polls/")
async def get_all_polls():
    polls = []
    for p in polls_collection.find():
        p["_id"] = str(p["_id"]) # Converter ObjectId para string
        polls.append(p)
    return polls

# 5. Apagar Urna
@app.delete("/polls/{poll_id}")
async def delete_poll(poll_id: str, user_id: int):
    # Só o criador deveria poder apagar (lógica simples)
    result = polls_collection.delete_one({"_id": ObjectId(poll_id), "creator_id": user_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=403, detail="Não autorizado ou urna inexistente")
    return {"message": "Urna removida"}


# Rota para Fechar a Urna 
@app.patch("/polls/{poll_id}/close")
async def close_poll(poll_id: str, user_id: int):
    # Procura a urna e verifica se quem está a fechar é o criador
    poll = polls_collection.find_one({"_id": ObjectId(poll_id)})
    
    if not poll:
        raise HTTPException(status_code=404, detail="Urna não encontrada")
    if poll["creator_id"] != user_id:
        raise HTTPException(status_code=403, detail="Apenas o criador pode fechar a urna")

    # Atualiza o estado para False
    polls_collection.update_one(
        {"_id": ObjectId(poll_id)},
        {"$set": {"is_active": False}}
    )
    return {"message": "Urna encerrada com sucesso"}