import { use, useState } from "react"

function ManagePollcard({title, creator, active, onclosepoll, onopenpoll, userid, pollid, onSelect, ondeletepoll}){
    
    const [isActive, setActive] = useState(active)

    

    function handlepoll(){
        {isActive ? onclosepoll(pollid,userid) : onopenpoll(pollid,userid)}
        setActive(!isActive) 
    }

    async function handledeletepoll() {
            try {
                await ondeletepoll(pollid, userid);
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
                    <h1 className="text-start">{title}</h1>
                    <h5 className="text-start">by {creator}</h5>
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