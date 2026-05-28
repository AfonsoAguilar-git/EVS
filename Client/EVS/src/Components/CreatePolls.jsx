import PollForm from "./PollForm"

function CreatePolls({ongetpolls, setCreatingPoll, setView, user , oncreatepoll}){
    return(
        <div className="viewPollFade modal show d-block">
            <div className="modal-dialog modal-dialog-centered p-4">
                <PollForm ongetpolls={ongetpolls} setCreatingPoll={setCreatingPoll} setView={setView} user={user} oncreatepoll={oncreatepoll} ></PollForm>
            </div>
        </div>
    )
}

export default CreatePolls