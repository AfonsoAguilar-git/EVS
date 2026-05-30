import Navbar from "../Components/Navbar"

function LandingPage({setView, currentView, isLoggedIn, onlogout}) {
    return(
      <section>
        <header>
          <Navbar currentView={currentView} setView={setView} isLoggedIn={isLoggedIn} onlogout={onlogout} />
        </header>
        <section>
            <div className="container-fluid py-4 bg-secondary bg-opacity-10" >
              <h1 className="pageTitle p-2 text-center fw-bold">Electronic Voting System</h1>
              <p className="pageTitle text-center text-secondary-emphasis" >Welcome to EVS!</p>
              <p className="pageTitle text-center text-secondary-emphasis" >1. Join us by creating an account</p>
              <p className="pageTitle text-center text-secondary-emphasis" >2. Vote on community polls</p>
              <p className="pageTitle text-center text-secondary-emphasis" >3. Create your own polls for others to vote!</p>
            </div>
        </section>
        <footer>
          
        </footer>
      </section>
    )
}

export default LandingPage