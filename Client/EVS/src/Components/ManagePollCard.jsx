function ManagePollcard({title, creator, onclosepoll,userid,pollid}){ 

    function handleclosepoll(){
        onclosepoll(pollid,userid)
    }

    return(
        <li className="col list-unstyled align-self-center">
            <div className="PollCard p-3 d-flex flex-column overflow-hidden">
                <div className="my-2 align-self-start">
                    <p className="h1 text-start">{title}</p>
                    <p className="h5 text-start">{creator}</p>
                </div>
                <div className="mt-2 w-100 d-flex flex-column justify-content-around gap-2 m-2">
                    <button className="btn btn-dark w-100">View</button>
                    <button className="btn btn-outline-danger w-100">Delete</button>
                    <button className="btn btn-outline-danger w-100" onClick={handleclosepoll}>Close</button>
                </div>
            </div>
        </li>
    )

}

export default ManagePollcard