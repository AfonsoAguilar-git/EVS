import PollGuest from "./PollGuest"
import PollAdmin from "./PollAdmin"

function ViewPoll({poll, setSelected, user, onvotepoll}){
    return(
        <div className="viewPollFade modal show d-block">
            <div className="modal-dialog modal-dialog-centered p-4">
                {poll.creator_id === user.user_id ? <PollAdmin poll={poll} setSelected={setSelected}/> : <PollGuest poll={poll} setSelected={setSelected} onvotepoll={onvotepoll} user={user}/>}
            </div>
        </div>
    )
}

export default ViewPoll