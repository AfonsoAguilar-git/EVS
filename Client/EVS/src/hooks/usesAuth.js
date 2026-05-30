import { useEffect, useState } from "react"

function useAuth() {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)


    async function signup(username, password){
        setLoading(true)
        setError(null)
        try {
            const response = await fetch("http://localhost:8000/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            })

            const data = await response.json()
            if (!response.ok) {
                throw new Error(data.detail || "Falha no registo");
            }

            setUser(data)
            return true

        } catch (err) {
            setError(err.message)
            return false
        } finally{
            setLoading(false)
        }
    }
  

   
    async function login(username, password) {
        setLoading(true)
        setError(null)
        try {
            const response = await fetch("http://localhost:8000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            })

            const data = await response.json()
            if (!response.ok) {
                throw new Error(data.detail || "Falha no login")
            }

            setUser(data)
            
            return true 
        } catch (err) {
            setError(err.message)
            return false
        }finally{
            setLoading(false)
        }
    }

   
    function logout() {
        setUser(null)
       
    }

    
    return { user, loading, error, login, signup, logout, isLoggedIn: !!user }
}

export default useAuth