import LoginForm from "../Components/LoginForm"

function LoginPage({setView}){
    return (
        <div className="loginpage">
            <nav className="navbar navbar-expand-md bg-body-secondary">
                <div className="container-fluid">
                    <button type="button" className="btn btn-primary m-4" onClick={() => setView("LandingPage")} >backbutton</button>
                </div>
            </nav>
            <div className="logincard">
                <LoginForm />
            </div>
        </div>
    )
}

export default LoginPage