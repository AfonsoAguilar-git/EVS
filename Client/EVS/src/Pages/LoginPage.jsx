import LoginForm from "../Components/LoginForm"

function LoginPage({setView}){
    return (
        <div className="flex-column ">
            <button onClick={() => setView("LandingPage")} >backbutton</button>
            <LoginForm />
        </div>
    )
}

export default LoginPage