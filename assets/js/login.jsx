import React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";

import api from "./api";

function Login(props) {
    return(
        <div className="row justify-content-center">
            <div className="col-auto">
                <Warning login={props.login}/>
                <h3>Login</h3>
                <form onSubmit={(e) => {api.submit_login(e);}}>
                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input type="email" className="form-control"
                        id="email" placeholder="demo@example.com" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control"
                        id="password" placeholder="Password" required />
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

function Warning(props) {
    let login = props.login;
    if (login) {
        return(
            <div className="alert alert-danger" role="alert">
                Incorrect Email or Password!
            </div>
        );
    } else {
        return null;
    }
}

function state2props(state) {
    return {
        login: state.login,
    };
}

export default connect(state2props)(Login)
