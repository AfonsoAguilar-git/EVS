import { useState } from "react";

function PollForm({setView, user, oncreatepoll}){ 

    const [title, setTitle] = useState("");
    const [polloptions, setPolloptions] = useState(["", "", "", ""]);

    const handleOptionChange = (index, value) => {
        const updatedOptions = [...polloptions]; 
        updatedOptions[index] = value;          
        setPolloptions(updatedOptions);         
    };

    async function handleSubmit(e){
        e.preventDefault();
        const validOptions = polloptions.filter(opt => opt.trim() !== "");
        
        if (validOptions.length < 2) {
            alert("Por favor, preenche pelo menos duas opções!");
            return;
        }
        try{
        oncreatepoll(title,validOptions, user.user_id,user.username)
        setView("ManagePolls");

        }catch(err){
            console.log(err);    
        }
        
    }

    return(
        <form className="createPollCard p-4" onSubmit={handleSubmit}>
            <div className="mt-2">
                <label className="form-label">Poll title</label>
                <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required></input>
            </div>
            <div className="mt-2">
                <label className="form-label">Options</label>
                <div className="d-flex flex-column gap-2">
                    <input type="text" className="form-control" placeholder="Option1"value={polloptions[0]} onChange={(e) => handleOptionChange(0, e.target.value)} />
                    <input type="text" className="form-control" placeholder="Option2"value={polloptions[1]} onChange={(e) => handleOptionChange(1, e.target.value)}/>
                    <input type="text" className="form-control" placeholder="Option3"value={polloptions[2]} onChange={(e) => handleOptionChange(2, e.target.value)}/>
                    <input type="text" className="form-control" placeholder="etc..." value={polloptions[3]} onChange={(e) => handleOptionChange(3, e.target.value)}/>
                    <button className="btn btn-link text-dark text-decoration-none text-start">+ Add option</button>
                </div>
            </div>
            <div className="d-flex flex-column justify-content-end gap-2 pt-2">
                <button  type="submit" className="btn btn-dark">Create</button>
                <button className="btn btn-outline-danger" onClick={() => setView("ManagePolls")}>Back</button>
            </div>
        </form>
    )

}

export default PollForm