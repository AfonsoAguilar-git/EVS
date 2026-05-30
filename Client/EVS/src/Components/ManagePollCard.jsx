import { use, useState } from "react"

function ManagePollcard({poll, onclosepoll, onopenpoll, userid, onSelect, ondeletepoll}){
    
    const [isActive, setActive] = useState(poll.is_active)

    

    function handlepoll(){
        {isActive ? onclosepoll(poll._id,userid) : onopenpoll(poll._id,userid)}
        setActive(!isActive) 
    }

    async function handledeletepoll() {
            try {
                await ondeletepoll(poll._id, userid);
                alert("Poll eliminada com sucesso!");
            } catch (err) {
                alert("Erro ao eliminar a poll.");
                console.error(err);
            }
    }

    return(
        <li className="col list-unstyled align-self-center">
            <div className="PollCard p-3 d-flex flex-column overflow-hidden">
                <div className="my-2 align-self-start">
                    <h1 className="text-start">{poll.title}</h1>
                    <h5 className="text-start">by {poll.creator_name}</h5>
                    <div className="d-flex align-items-center gap-2">
                        {isActive && <span className="spinner-border spinner-border-sm text-primary"></span>}
                        <p className={`text-center m-0 ${isActive ? "text-primary" : "text-warning" }`}>{isActive ? "Opened" : "Closed"}</p>
                    </div>
                </div>
                <div className="mt-2 w-100 d-flex flex-column justify-content-around gap-2 m-2">
                    <button className="btn btn-dark w-100" onClick={onSelect}>View</button>
                    <div className="btn-group">
                        <button className={`btn  w-100 ${isActive ? "btn-outline-warning" : "btn-outline-primary"}`} onClick={handlepoll}>{isActive ? "Close" : "Open"}</button>
                        <button className="btn btn-outline-danger w-100" onClick={handledeletepoll} >Delete</button>
                    </div>
                </div>
            </div>
        </li>
    )

}

export default ManagePollcard