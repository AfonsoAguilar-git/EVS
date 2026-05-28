function Pollcard({title, creator, onSelect}){
    return(
        <li className="col list-unstyled align-self-center">
            <div className="PollCard p-3 d-flex flex-column overflow-hidden">
                <div className="my-2 align-self-start">
                    <h1 className="text-start">{title}</h1>
                    <h5 className="text-start">by {creator}</h5>
                </div>
                <div className="mt-auto w-100 m-2">
                    <button className="btn btn-dark w-100" onClick={onSelect}>Participate</button>
                </div>
            </div>
        </li>
    )

}

export default Pollcard