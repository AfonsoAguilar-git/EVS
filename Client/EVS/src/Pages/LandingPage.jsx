function LandingPage({setView}) {
    return(
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">EVS</a>
    <div>
      <button type="button" className="btn btn-primary m-3" onClick={() => setView("Login")}>Login</button>
      <button type="button" className="btn btn-primary ">Sign Up</button>
    </div>
    

   
    
  </div>
</nav>
    )
}

export default LandingPage