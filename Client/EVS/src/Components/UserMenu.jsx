function UserMenu ({onlogout , setView, currentView}) {
    return (
       <ul className="nav nav-underline navbar-nav align-items-center ms-auto">
        <li className="nav-item">
            <button className={`nav-link text-dark ${currentView === "PollsPage" && "active"}`}  onClick={() => setView("PollsPage")}>Find polls</button>
        </li>
        <li className="nav-item">
            <button className={`nav-link text-dark ${currentView === "ManagePolls" && "active"}`}  onClick={() => setView("ManagePolls")}>manage your polls</button> 
        </li>
        <li className="nav-item">
            <button className="btn btn-outline-danger my-1 my-md-0 mx-md-1" onClick={ () => {
                onlogout(); 
                setView("LandingPage")
                }}>
                Log out
            </button>
        </li>
       </ul>
    )
}

export default UserMenu