function PollAdmin({poll, setSelected}){
    const totalVotes = poll.options.reduce((sum, opt) => sum + opt.votes, 0); 

    return (
        <div className="PollCard modal-content p-4">
            <div className="container-fluid d-flex justify-content-between align-items-center mb-3">
                <div>
                    <h1 className="mb-1">{poll.title}</h1>
                    <h4 className="mb-0">By {poll.creator_name}</h4>
                </div>
                <div>
                    <p className="mb-1">Total votes</p>
                    <p className="mb-0 text-end">{totalVotes}</p>
                </div>
            </div>
            <div className="container-fluid d-flex flex-column gap-2 mb-4">
                {poll.options.map((option, index) => {
                    const percent = totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0; 
                    let barColor = "bg-danger";
                    if (percent >= 20 && percent < 50) {
                        barColor = "bg-warning"; 
                    } else if (percent >= 50 && percent < 75) {
                        barColor = "bg-primary"; 
                    } else if (percent >= 75) {
                        barColor = "bg-success"; 
                    }
                    return (
                        <div key={index}>
                            <div className="border rounded-top d-flex justify-content-between align-items-center p-3">
                                <div className="text-center">{option.name}</div>
                                <div className="text-secondary">{option.votes} votes / {percent}%</div>
                            </div>
                            <div className="progress rounded-0" style={{ height: "6px" }}>
                                <div 
                                    className={`progress-bar progress-bar-striped progress-bar-animated ${barColor}`} 
                                    role="progressbar" 
                                    style={{ width: `${percent}%` }} 
                                    aria-valuenow={percent} 
                                    aria-valuemin="0" 
                                    aria-valuemax="100"
                                ></div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="container-fluid d-flex flex-column gap-2">
                <button className="btn btn-dark w-100" onClick={() => setSelected(null)}>Back</button>
            </div>
        </div>
    )
}

export default PollAdmin