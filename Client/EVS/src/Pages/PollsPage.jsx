import Navbar from "../Components/Navbar"
import Pollcard from "../Components/Pollcard"
import ViewPoll from "../Components/ViewPoll";
import { useEffect } from "react";

function PollsPage({currentView, setView, isLoggedIn, user, onlogout, polls, ongetpolls, selectedPoll, setSelected, onvotepoll}){
    
    useEffect(() => {
        ongetpolls();
        }, []
    );

    const activepolls = polls.filter(poll => poll.is_active === true && poll.creator_id != user.user_id );

    return(
        <section>
            <Navbar currentView={currentView} setView={setView} isLoggedIn={isLoggedIn} onlogout={onlogout}/>
            {selectedPoll && <ViewPoll poll={selectedPoll} setSelected={setSelected} user={user} onvotepoll={onvotepoll} />}
            <nav className="container-fluid p-4 pt-0">
                <ul className="row m-0 p-0 row-cols-1 row-cols-sm-2 row-cols-lg-3 g-5">
                    {activepolls.map(poll => (
                        <Pollcard key={poll._id} poll={poll} onSelect={() => setSelected(poll)}/>
                    ))}
                </ul>
            </nav>
        </section>
    )
}

export default PollsPage