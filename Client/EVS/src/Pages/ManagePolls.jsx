import Navbar from "../Components/Navbar"
import ManagePollcard from "../Components/ManagePollCard"
import { useEffect } from "react";

function PollsPage({setView, isLoggedIn, onlogout, user, polls, ongetpolls}){
    useEffect(() => {
        ongetpolls();
        }, []);
    
    
    const mypolls = polls.filter(poll => poll.creator_id === user?.user_id);

    

    return(
        <section>
            <Navbar setView={setView} isLoggedIn={isLoggedIn} onlogout={onlogout}/>
            <h1 className="pageTitle text-black text-center p-4 pb-0 fw-bold">Manage your Polls</h1>
            <nav className="container-fluid p-4 pt-0">
                <ul className="row m-0 p-0 row-cols-1 row-cols-sm-2 row-cols-lg-3 g-5">
                    {mypolls.map(poll => (
                        <ManagePollcard title={poll.title} creator={poll.creator_name}/>
                    ))}
                </ul>
            </nav>
        </section>
    )
}

export default PollsPage