import React from "react";
import ReactDOM from "react-dom";
import {Link} from "react-router-dom";

export default function Login() {
    return(
        <div className="row justify-content-center">
            <div className="col-auto">
                <h3>Login</h3>
                <form>
                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input type="email" className="form-control"
                        id="email" placeholder="demo@example.com"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control"
                        id="password" placeholder="Password"/>
                    </div>
                    <div className="row justify-content-between align-items-center">
                        <div className="col-auto">
                            <button type="submit" className="btn btn-primary">
                                Submit
                            </button>
                        </div>
                        <div className="col-auto">
                            <Link to="/newuser">
                                New User
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
