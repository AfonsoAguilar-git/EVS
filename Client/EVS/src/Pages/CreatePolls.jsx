import Navbar from "../Components/Navbar"
import PollForm from "../Components/PollForm"

function CreatePolls({setView, isLoggedIn, onlogout, user , oncreatepoll}){ // title e creator para backend idk how ur gonna do that mas supposably pensei reutilizar este form component para editar polls tmb idk if u can do that
    return(
        <section>
            <Navbar setView={setView} isLoggedIn={isLoggedIn} onlogout={onlogout}/>
            <h1 className="pageTitle text-black text-center p-4 pb-0 fw-bold">Create a Poll</h1>
            <div className="d-flex justify-content-center align-items-center p-4">
                <PollForm setView={setView} user={user} oncreatepoll={oncreatepoll} ></PollForm>
            </div>
        </section>
    )
}

export default CreatePolls