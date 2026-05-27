import Navbar from "../Components/Navbar"
import ManagePollcard from "../Components/ManagePollCard"

function PollsPage({setView, isLoggedIn, onlogout}){ // i got no idear how to do this
    return(
        <section>
            <Navbar setView={setView} isLoggedIn={isLoggedIn} onlogout={onlogout}/>
            <h1 class="pageTitle text-black text-center p-4 pb-0 fw-bold">Manage your Polls</h1>
            <nav className="container-fluid p-4 pt-0">
                <ul className="row m-0 p-0 row-cols-1 row-cols-sm-2 row-cols-lg-3 g-5">
                    <ManagePollcard title="Lorem ipsum dolor sit amet, consectetur adipiscing elit." creator="Lorem ipsum dolor"/>
                    <ManagePollcard title="Lorem ipsum dolor sit amet," creator="Lorem ipsum"/>
                    <ManagePollcard title="Lorem ipsum" creator="Lorem"/>
                </ul>
            </nav>
        </section>
    )
}

export default PollsPage