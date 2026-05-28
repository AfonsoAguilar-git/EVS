function PollAdmin({poll, setSelected}){
    const totalVotes = poll.options.reduce((sum, opt) => sum + opt.votes, 0); // isto foi john claudio idk if this works

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
                    const percent = totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0; // isto foi roblox studio ball knowledge com healthbars
                    return (
                        <div key={index}>
                            <div className="border rounded d-flex justify-content-between align-items-center p-3">
                                <div className="text-center">{option.name}</div>
                                <div className="text-secondary">{option.votes} votes / {percent}%</div>
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