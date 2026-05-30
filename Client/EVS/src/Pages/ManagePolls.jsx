import Navbar from "../Components/Navbar"
import ManagePollcard from "../Components/ManagePollCard"
import { useEffect, useState } from "react";
import CreatePolls from "../Components/CreatePolls";
import ViewPoll from "../Components/ViewPoll";

function PollsPage({currentView, setView, isLoggedIn, onlogout, user, polls, ongetpolls, onclosepoll, onopenpoll, oncreatepoll, selectedPoll, setSelected, ondeletepoll}){
    
    useEffect(() => {
        ongetpolls();
        }, []
    );
    
    const mypolls = polls.filter(poll => poll.creator_id === user?.user_id);
    const [creatingPoll, setCreatingPoll] = useState(false)

    return(
        <section>
            <Navbar currentView={currentView} setView={setView} isLoggedIn={isLoggedIn} onlogout={onlogout}/>
            {creatingPoll && <CreatePolls ongetpolls={ongetpolls} setCreatingPoll={setCreatingPoll} isLoggedIn={isLoggedIn} user={user} onlogout={onlogout} oncreatepoll={oncreatepoll} />}
            {selectedPoll && <ViewPoll poll={selectedPoll} setSelected={setSelected} user={user}/>}
            <nav className="container-fluid d-flex flex-column p-4">
                <button className="btn align-self-start btn-outline-success mx-4 mt-3" onClick={() => setCreatingPoll(true)}>
                    + Create Poll
                </button>
                <ul className="row m-0 p-0 row-cols-1 row-cols-sm-2 row-cols-lg-3 g-5">
                    {mypolls.map(poll => (
                        <ManagePollcard key={poll._id} poll={poll} userid={user.user_id} onclosepoll={onclosepoll} onopenpoll={onopenpoll} ondeletepoll={ondeletepoll} onSelect={() => setSelected(poll)}/>
                    ))}
                </ul>
            </nav>
        </section>
    )
}

export default PollsPage