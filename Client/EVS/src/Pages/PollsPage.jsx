import Navbar from "../Components/Navbar"
import Pollcard from "../Components/Pollcard"
import { useEffect } from "react";

function PollsPage({setView, isLoggedIn, onlogout, polls, ongetpolls}){
    
    useEffect(() => {
    ongetpolls();
    }, []);

    return(
        <section>
            <Navbar setView={setView} isLoggedIn={isLoggedIn} onlogout={onlogout}/>
            <h1 className="pageTitle text-black text-center p-4 pb-0 fw-bold">Find Polls</h1>
            <nav className="container-fluid p-4 pt-0">
                <ul className="row m-0 p-0 row-cols-1 row-cols-sm-2 row-cols-lg-3 g-5">
                    {polls.map(poll => (
                        <Pollcard title={poll.title} creator={poll.creator_name}/>
                    ))}

                    
                </ul>
            </nav>
        </section>
    )
}

export default PollsPage