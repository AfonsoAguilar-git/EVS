import Navbar from "../Components/Navbar"

function LandingPage({setView, currentView, isLoggedIn, onlogout}) {
    return(
      <section>
        <header>
          <Navbar currentView={currentView} setView={setView} isLoggedIn={isLoggedIn} onlogout={onlogout} />
        </header>
        <section>
            <div className="container-fluid py-4 bg-secondary bg-opacity-10" >
              <h1 className="pageTitle p-2 text-center fw-bold">Voting System</h1>
              <p className="pageTitle text-center text-secondary-emphasis" >Welcome to the Voting System idk</p>
            </div>
        </section>
        <footer>
          
        </footer>
      </section>
    )
}

export default LandingPage