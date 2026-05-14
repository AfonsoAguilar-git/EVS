function UserMenu ({onlogout}) {
    

    return (
       <ul className="navbar-nav ms-auto">
        <li className="nav-item">
            <button className="nav-link font-monospace" onClick={onlogout}>
                Log out
            </button>    
        </li>
       </ul>
    )
}

export default UserMenu