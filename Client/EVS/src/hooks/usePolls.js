import { useEffect, useState } from "react"


function usePolls(user){
    const [polls, setPolls] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

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
    return {polls, getpolls}
}

export default usePolls