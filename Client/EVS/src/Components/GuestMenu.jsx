function GuestMenu ({setView}) {
    return (
        <ul className="nav nav-underline navbar-nav align-items-end ms-auto pt-3 pt-md-0">
            <li className="btn-group nav-item my-md-0 mx-md-1">
                <button type="button" className="btn btn-dark border-end" onClick={() => setView("SignUp")}>
                    Sign Up
                </button>
                <button type="button" className="btn btn-dark border-start" onClick={() => setView("Login")}>
                    Login
                </button>
            </li>
        </ul>
    )
}

export default GuestMenu