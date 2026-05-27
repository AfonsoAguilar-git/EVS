import LoginForm from "../Components/LoginForm.jsx"
import SignUpForm from "../Components/SignUpForm.jsx"

function AuthPage({ setView, currentView, onLogin, onSignup, authError }){
    return (
        <section className="container-fluid position-relative top-50 start-50 translate-middle">
            <div className="row mb-3 align-items-center justify-content-center">
                <div className="authLogo container text-center">
                    <button className="text-black fs-1 p-2 fw-bold" onClick={() => setView("LandingPage")}>Voting System</button>
                </div>
            </div>
            <div className="row align-items-center justify-content-center">
                <div className="loginCard">
                    {currentView === "SignUp" && <SignUpForm setView={setView} signup={onSignup} error={authError}/>}
                    {currentView === "Login" && <LoginForm setView={setView} login={onLogin} error={authError}/>}
                </div>
            </div>
        </section>
    )
}

export default AuthPage