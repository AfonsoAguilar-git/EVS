function Pollcard({title, creator}){
    return(
        <li className="col list-unstyled align-self-center">
            <div className="PollCard p-3 d-flex flex-column overflow-hidden">
                <div className="my-2 align-self-start">
                    <p className="h1 text-start">{title}</p>
                    <p className="h5 text-start">{creator}</p>
                </div>
                <div className="mt-auto w-100 m-2">
                    <button className="btn btn-dark w-100">PARTICIPATE</button>
                </div>
            </div>
        </li>
    )

}

export default Pollcard