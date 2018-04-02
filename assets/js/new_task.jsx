import React from "react";
import {connect} from "react-redux";
import {Link, Redirect} from "react-router-dom";

import api from "./api";

function NewTask(props) {
    if(props.token) {
        return(
            <div className="row justify-content-center">
                <div className="col-6">
                    <div className="row justify-content-between align-items-center">
                        <div className="col-auto">
                            <h5>New Task</h5>
                        </div>
                        <div className="col-auto" style={{marginBottom: "0.4rem"}}>
                            <Link to="/">
                                Back to Index
                            </Link>
                        </div>
                    </div>
                    <form onSubmit={(e) => api.new_task(e)}>
                        <div className="form-group">
                            <label htmlFor="user">Assign To</label>
                            <select className="form-control" id="user">
                                <AllUser users={props.users} user_id={props.token.user_id}/>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input type="text" className="form-control"
                            id="title"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="body">Body</label>
                            <textarea className="form-control" id="body"/>
                        </div>
                    </form>
                </div>
            </div>
        );
    } else {
        return <Redirect to="/"/>;
    }
}

function AllUser(props) {
    console.log(props.user_id);
    let users = props.users;
    let result = []
    _.each(users, (u) => {
        if (u.id != props.user_id){
            result.push(
                <option value={u.id} key={u.id}>
                    {u.name}
                </option>
            );
        }
    });
    return result;
}

function state2props(state) {
    return {
        token: state.token,
        users: state.users,
    }
}

export default connect(state2props)(NewTask);
