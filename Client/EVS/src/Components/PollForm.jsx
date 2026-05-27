function PollForm({setView, title, creator}){ // man n faço ideia como adicionar mais options para o backend
    return(
        <form className="createPollCard p-4">
            <div className="mt-2">
                <label className="form-label">Poll title</label>
                <input type="text" className="form-control"></input>
            </div>
            <div className="mt-2">
                <label className="form-label">Options</label>
                <div className="d-flex flex-column gap-2">
                    <input type="text" className="form-control" placeholder="Option1"/>
                    <input type="text" className="form-control" placeholder="Option2"/>
                    <input type="text" className="form-control" placeholder="Option3"/>
                    <input type="text" className="form-control" placeholder="etc..."/>
                    <button className="btn btn-link text-dark text-decoration-none text-start">+ Add option</button>
                </div>
            </div>
            <div className="d-flex flex-column justify-content-end gap-2 pt-2">
                <button className="btn btn-dark" onClick={() => setView("ManagePolls")}>Create</button>
                <button className="btn btn-outline-danger" onClick={() => setView("ManagePolls")}>Back</button>
            </div>
        </form>
    )

}

export default PollForm