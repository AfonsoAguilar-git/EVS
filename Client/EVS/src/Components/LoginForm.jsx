function LoginForm(){
    return (
    <div className="container  border border-black">
        <form>
        <div className="mb-3">
            <label className="form-label">Username</label>
            <input type="text" className="form-control"  placeholder="Insert Username" />
        </div>
        <div className="mb-3">
            <label  className="form-label">Password</label>
            <input type="text" className="form-control" placeholder="Insert Password" />
        </div>
        </form>
    </div>
    )
}

export default LoginForm