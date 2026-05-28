import { useState } from "react";

function PollGuest({poll, setSelected}){
    const [selectedOption, setSelectedOption] = useState(null);

    return (
        <div className="PollCard modal-content p-4">
            <div className="container-fluid">
                <h1 className="mb-1">{poll.title}</h1>
                <h4 className="mb-0">By {poll.creator_name}</h4>
            </div>
            <div className="container-fluid d-flex flex-column gap-2 m-4">
                Pick an option.
                {poll.options.map((option, index) => (
                    <button key={index} className={`btn text-start ${selectedOption === option.name ? "btn-primary" : "btn-outline-secondary"}`} onClick={() => setSelectedOption(option.name)}>
                        {option.name}
                    </button>
                ))}
            </div>
            <div className="container-fluid d-flex flex-column gap-2">
                <button className="btn btn-success w-100" disabled={!selectedOption}>Submit vote</button>
                <button className="btn btn-outline-danger w-100" onClick={() => setSelected(null)}>Cancel</button>
            </div>
        </div>
    )
}

export default PollGuest