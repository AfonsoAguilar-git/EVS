import { useState } from "react";

function PollForm({setView, user, oncreatepoll}){ 

    const [title, setTitle] = useState("");
    const [polloptions, setPolloptions] = useState(["", ""]);

    const handleOptionChange = (index, value) => {
        const updatedOptions = [...polloptions]; 
        updatedOptions[index] = value;          
        setPolloptions(updatedOptions);         
    };

    const addOptionField = (e) => {
    e.preventDefault();
    setPolloptions([...polloptions, ""]);
    };

    async function handleSubmit(e){
        e.preventDefault();
        const validOptions = polloptions.filter(opt => opt.trim() !== "");
        
        if (validOptions.length < 2) {
            alert("Por favor, preenche pelo menos duas opções!");
            return;
        }
        try{
        await oncreatepoll(title,validOptions, user.user_id,user.username)
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
                    {polloptions.map((option, index) => (
                        <input 
                            key={index}
                            type="text" 
                            className="form-control" 
                            placeholder={`Option ${index + 1}`}
                            value={option} 
                            onChange={(e) => handleOptionChange(index, e.target.value)} 
                            required={index < 2}
                        />
                    ))}
                    <button className="btn btn-link text-dark text-decoration-none text-start" onClick={addOptionField}>+ Add option</button>
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