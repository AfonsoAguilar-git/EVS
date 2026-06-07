import Navbar from "../Components/Navbar"
import Pollcard from "../Components/Pollcard"
import ViewPoll from "../Components/ViewPoll";
import {useState, useEffect } from "react";

function PollsPage({currentView, setView, isLoggedIn, user, onlogout, polls, ongetpolls, selectedPoll, setSelected, onvotepoll}){
    
    const [activeTab, setActiveTab] = useState("not_voted");

    useEffect(() => {
        ongetpolls();
        }, []
    );
    const filteredPolls = polls.filter(poll => {
        const isCommunityPoll = poll.is_active === true && poll.creator_id !== user?.user_id;
        if (!isCommunityPoll) return false;

        const votersList = poll.voters || [];
        const hasUserVoted = votersList.includes(user?.user_id);

        if (activeTab === "not_voted") {
            return !hasUserVoted;
        } else {
            return hasUserVoted;
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
                            className={`nav-link ${activeTab === "not_voted" ? "active fw-bold text-primary" : "text-secondary"}`}
                            onClick={() => setActiveTab("not_voted")}> Pending Polls </button>
                    </li>
                    <li className="nav-item">
                        <button 
                            className={`nav-link ${activeTab === "voted" ? "active fw-bold text-primary" : "text-secondary"}`}
                            onClick={() => setActiveTab("voted")}>Voted Polls</button>
                    </li>
                </ul>
            </div>
            <nav className="container-fluid p-4 pt-0">
                <ul className="row m-0 p-0 row-cols-1 row-cols-sm-2 row-cols-lg-3 g-5">
                    {filteredPolls.map(poll => (
                        <Pollcard key={poll._id} poll={poll} onSelect={() => setSelected(poll)} activeTab={activeTab}/>
                    ))}
                </ul>
            </nav>
        </section>
    )
}

export default PollsPage