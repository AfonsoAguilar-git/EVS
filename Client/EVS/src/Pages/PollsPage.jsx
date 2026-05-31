import Navbar from "../Components/Navbar"
import Pollcard from "../Components/Pollcard"
import ViewPoll from "../Components/ViewPoll";
import {useState, useEffect } from "react";

function PollsPage({currentView, setView, isLoggedIn, user, onlogout, polls, ongetpolls, selectedPoll, setSelected, onvotepoll}){
    
    const [activeTab, setActiveTab] = useState("all");

    useEffect(() => {
        ongetpolls();
        }, []
    );
    const filteredPolls = polls.filter(poll => {
        if (activeTab === "all") {
            return poll.is_active === true && poll.creator_id !== user?.user_id;
        } else {
            return poll.creator_id === user?.user_id;
        }
    });
    return(
        <section>
            <Navbar currentView={currentView} setView={setView} isLoggedIn={isLoggedIn} onlogout={onlogout}/>
            {selectedPoll && <ViewPoll poll={selectedPoll} setSelected={setSelected} user={user} onvotepoll={onvotepoll} />}

            
            <div className="container-fluid px-4 pt-3">
                <ul className="nav nav-tabs mb-4">
                    <li className="nav-item">
                        <button 
                            className={`nav-link ${activeTab === "all" ? "active fw-bold text-primary" : "text-secondary"}`}
                            onClick={() => setActiveTab("all")}> Community Polls </button>
                    </li>
                    <li className="nav-item">
                        <button 
                            className={`nav-link ${activeTab === "mine" ? "active fw-bold text-primary" : "text-secondary"}`}
                            onClick={() => setActiveTab("mine")}>My Polls</button>
                    </li>
                </ul>
            </div>
            <nav className="container-fluid p-4 pt-0">
                <ul className="row m-0 p-0 row-cols-1 row-cols-sm-2 row-cols-lg-3 g-5">
                    {filteredPolls.map(poll => (
                        <Pollcard key={poll._id} poll={poll} onSelect={() => setSelected(poll)}/>
                    ))}
                </ul>
            </nav>
        </section>
    )
}

export default PollsPage