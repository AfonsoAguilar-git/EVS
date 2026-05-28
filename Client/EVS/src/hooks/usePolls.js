import { useEffect, useState } from "react"


function usePolls(user){
    const [polls, setPolls] = useState([])
    const [pollsloading, setLoading] = useState(false)
    const [pollserror, setError] = useState(null)

    async function getpolls() {
        setLoading(true)
        setError(null)

        try {
            const response = await fetch("http://localhost:8000/polls/");
            if (!response.ok) throw new Error("Erro ao carregar votações")
            const data = await response.json();
            setPolls(data)
            setLoading(false) 

        } catch (err) {
            setError(err.message)
        } finally{
            setLoading(false)
        }
    }

    async function createpoll(title,options,creator_id,creator_name){
        try{
            const response = await fetch("http://localhost:8000/polls/",
                {
                headers:{
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify({title,options,creator_id,creator_name})
            });
        
            const data = await response.json();
            return data;
        
        }
        catch(err){
            setError(err.message);
        }
    }

    async function closepoll(pollId, userId){
        try{
            const response = await fetch(`http://localhost:8000/polls/${pollId}/close?user_id=${userId}`,
                {
                headers:{
                    "Content-Type": "application/json"
                },
                method: "PATCH",
            });
        
        
        const data = await response.json();
        return data;
        }
        catch(err){
            setError(err.message);
        }
    }
    // ya muda isto se tiver a cometer um fatal sin
    async function openpoll(pollId, userId){
        try{
            const response = await fetch(`http://localhost:8000/polls/${pollId}/open?user_id=${userId}`,
                {
                headers:{
                    "Content-Type": "application/json"
                },
                method: "PATCH",
            });
        
        
        const data = await response.json();
        return data;
        }
        catch(err){
            setError(err.message);
        }
    }

    return {polls,pollsloading, pollserror, getpolls, createpoll, closepoll, openpoll}
}

export default usePolls