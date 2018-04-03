import React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

import api from "./api"

function NewUser(props) {
    if (props.redirect) {
        return <Redirect to="/"/>;
    } else {
        return(
            <div className="row justify-content-center">
                <div className="col-auto">
                    <h3> Create New User</h3>
                    <form onSubmit={(e) => {api.create_user(e);}}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" className="form-control"
                            id="name" placeholder="John Doe" required />
                        </div>
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
                        <div className="row justify-content-end">
                            <div className="col-auto">
                                <button type="submit" className="btn btn-primary">
                                    Submit
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

function state2props(state) {
    return {
        redirect: state.redirect,
    };
}

export default connect(state2props)(NewUser)
