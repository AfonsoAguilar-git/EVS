import useAuth  from "../hooks/usestates";
import { useState } from "react";

function LoginForm({ setView, login ,error}){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const sucesso = await login(username, password); // Usa o login que veio do App
        if (sucesso) {
            setView("LandingPage");
        }
    };
    return (
    <form className="container-fluid px-4 pb-3" onSubmit={handleSubmit}>
        <div class="container-fluid pt-4" >
            <h1 class="text-center fw-bold">Login</h1>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="mb-3">
            <label className="form-label">Username</label>
            <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} required></input>
        </div>
        <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)}></input>
        </div>
        <div className="container">
            <div className="row p-2">
                <button href="#" type="submit" className="btn btn-dark my-1 my-sm-0 mx-sm-1" >
                    Login
                </button>
            </div>
            <div className="row p-2">
                <button type="button" className="btn btn-outline-dark my-1 my-sm-0 mx-sm-1" onClick={() => setView("SignUp")}>
                    Sign Up
                </button>
            </div>
        </div>
    </form>
    )
}

export default LoginForm