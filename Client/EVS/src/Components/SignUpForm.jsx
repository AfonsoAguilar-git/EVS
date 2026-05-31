import { useState } from "react";
import useAuth  from "../hooks/usesAuth";

function SignUpForm({setView , signup, error}){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const sucesso = await signup(username, password); 
        if (sucesso) {
            setView("LandingPage");
        }
    };


    return (
    <form className="container-fluid px-4 pb-3" onSubmit={handleSubmit}>
        <div className="container-fluid pt-4" >
            <h1 className="text-center fw-bold">Sign Up</h1>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="mb-3">
            <label className="form-label">Username</label>
            <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} required></input>
            <div className="form-text text-muted font-sans-serif" style={{ fontSize: "0.8rem" }}>
        Must be between 3 and 30 characters.
            </div>
        </div>
        <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required></input>
            <div className="form-text text-muted font-sans-serif" style={{ fontSize: "0.8rem" }}>
        Must have atleast 4 characters.
            </div>
        </div>
        <div className="container d-flex flex-column gap-2 mb-4">
            <div className="row">
                <button href="#" type="submit" className="btn btn-dark my-1 my-sm-0 mx-sm-1">
                    Sign Up
                </button>
            </div>
            <div className="row">
                <button href="#" type="button" className="btn btn-outline-dark my-1 my-sm-0 mx-sm-1" onClick={() => setView("Login")}>
                    Login
                </button>
            </div>
        </div>
    </form>
    )
}

export default SignUpForm