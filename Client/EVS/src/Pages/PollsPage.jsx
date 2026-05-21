import Navbar from "../Components/Navbar"
import Pollcard from "../Components/Pollcard"

function PollsPage({setView, isLoggedIn, onlogout}){
    return(
        <section>
            <Navbar setView={setView} isLoggedIn={isLoggedIn} onlogout={onlogout}/>
                <nav className="container-fluid p-4">
                <ul className="row m-0 p-0 row-cols-1 row-cols-sm-2 row-cols-lg-3 g-5">
                    <Pollcard title="Lorem ipsum dolor sit amet, consectetur adipiscing elit." creator="Lorem ipsum dolor"/>
                    <Pollcard title="Lorem ipsum dolor sit amet," creator="Lorem ipsum"/>
                    <Pollcard title="Lorem ipsum" creator="Lorem"/>
                    <Pollcard title="Lorem ipsum dolor sit amet, consectetur adipiscing elit." creator="Lorem ipsum dolor"/>
                    <Pollcard title="Lorem ipsum dolor sit amet," creator="Lorem ipsum"/>
                    <Pollcard title="Lorem ipsum" creator="Lorem"/>
                    <Pollcard title="Lorem ipsum dolor sit amet, consectetur adipiscing elit." creator="Lorem ipsum dolor"/>
                    <Pollcard title="Lorem ipsum dolor sit amet," creator="Lorem ipsum"/>
                    <Pollcard title="Lorem ipsum" creator="Lorem"/>
                    <Pollcard title="Lorem ipsum dolor sit amet, consectetur adipiscing elit." creator="Lorem ipsum dolor"/>
                    <Pollcard title="Lorem ipsum dolor sit amet," creator="Lorem ipsum"/>
                    <Pollcard title="Lorem ipsum" creator="Lorem"/>
                    <Pollcard title="Lorem ipsum dolor sit amet, consectetur adipiscing elit." creator="Lorem ipsum dolor"/>
                    <Pollcard title="Lorem ipsum dolor sit amet," creator="Lorem ipsum"/>
                    <Pollcard title="Lorem ipsum" creator="Lorem"/>
                    <Pollcard title="Lorem ipsum dolor sit amet, consectetur adipiscing elit." creator="Lorem ipsum dolor"/>
                    <Pollcard title="Lorem ipsum dolor sit amet," creator="Lorem ipsum"/>
                    <Pollcard title="Lorem ipsum" creator="Lorem"/>
                    <Pollcard title="Lorem ipsum dolor sit amet, consectetur adipiscing elit." creator="Lorem ipsum dolor"/>
                    <Pollcard title="Lorem ipsum dolor sit amet," creator="Lorem ipsum"/>
                    <Pollcard title="Lorem ipsum" creator="Lorem"/>
                </ul>
                </nav>
        </section>
    )
}

export default PollsPage