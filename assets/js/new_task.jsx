import React from "react";
import {connect} from "react-redux";
import {Link, Redirect} from "react-router-dom";

import api from "./api";

function NewTask(props) {
    function update(ev) {
        let tgt = $(ev.target);
        let form = {};
        form[tgt.attr("name")] = tgt.val();
        let action = {
            type: "UPDATE_TASKFORM",
            form: form
        }
        props.dispatch(action);
    }

    if(props.token) {
        if (props.redirect) {
            return <Redirect to="/"/>;
        } else {
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
                        <form onSubmit={(e) => api.new_task(e, props.token, props.form)}>
                            <div className="form-group">
                                <label htmlFor="user">Assign To</label>
                                <select className="form-control" name="user">
                                    <AllUser users={props.users} user_id={props.token.user_id}/>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <input type="text" className="form-control"
                                    name="title" value={props.form.title} onChange={(ev) => {
                                            update(ev);
                                    }}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="body">Body</label>
                                <textarea className="form-control" name="body"
                                        value={props.form.body} onChange={(ev) => {
                                                update(ev);}}/>
                            </div>
                            <div className="row justify-content-end">
                                <div className="col-auto">
                                    <button type="submit" className="btn btn-primary">
                                        Create Task
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            );
        }
    } else {
        return <Redirect to="/"/>;
    }
}

function AllUser(props) {
    let users = props.users;
    let result = []
    _.each(users, (u) => {
        result.push(
            <option value={u.id} key={u.id}>
                {u.name}
            </option>
        );
    });
    return result;
}

function state2props(state) {
    return {
        token: state.token,
        users: state.users,
        form: state.taskform,
        redirect: state.redirect,
    }
}

export default connect(state2props)(NewTask);
