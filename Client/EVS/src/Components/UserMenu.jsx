function UserMenu ({onlogout , setView}) {
    

    return (
       <ul className="nav nav-underline navbar-nav align-items-center ms-auto">
        <li className="nav-item">
            <button className="nav-link text-decoration-none text-dark "  onClick={() => setView("PollsPage")}>Find polls</button>
        </li>
        <li className="nav-item">
            <button className="nav-link text-decoration-none text-dark"  onClick={() => setView("CreatePolls")}>create poll</button>
        </li>
        <li className="nav-item">
            <button className="nav-link text-decoration-none text-dark"  onClick={() => setView("ManagePolls")}>manage your polls</button> 
        </li>
        <li className="nav-item">
            <button className="btn btn-dark my-1 my-md-0 mx-md-1" onClick={ () => {
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