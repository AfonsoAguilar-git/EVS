import GuestMenu from "./GuestMenu" 
import UserMenu from "./UserMenu"

function Navbar({setView, isLoggedIn, onlogout}){
    return (
    <nav className="navbar navbar-expand-sm bg-white border-bottom">
        <div className="container-fluid">
            <a className="navbar-brand fw-bold" href="#" onClick={() => setView("LandingPage")}>EVS</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menu">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="menu">
                {isLoggedIn ? <UserMenu onlogout={onlogout} /> : <GuestMenu setView={setView}/>}
            </div>
        </div>
    </nav>
    )
}

export default Navbar