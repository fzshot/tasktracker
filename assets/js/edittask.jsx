import React from "react";
import {connect} from "react-redux";
import {Link, Redirect} from "react-router-dom";

import api from "./api";

function EditTask(props) {
    if(props.token) {
        if (props.redirect) {
            return <Redirect to="/"/>;
        } else {
            let id = props.edittask.id;
            if (props.token.user_id == props.edittask.creator.id) {
                return(
                    <form onSubmit={(e) => api.edit_task(e, props.token, id, "creator")}>
                        <Creator task={props.edittask} users={props.users}/>
                        <User task={props.edittask} users={props.users}/>
                        <NavButton/>
                    </form>
                );
            } else {
                return(
                    <form onSubmit={(e) => api.edit_task(e, props.token, id, "user")}>
                        <User task={props.edittask} users={props.users}/>
                        <NavButton/>
                    </form>
                );
            }
        }
    } else {
        return <Redirect to="/"/>;
    }
}

function NavButton() {
    return(
        <div className="row justify-content-end align-items-center">
            <div className="col-auto">
                <Link to="/">
                    Back to Index
                </Link>
            </div>
            <div className="col-auto">
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </div>
        </div>
    );
}

function Creator(props) {
    let user_id = props.user_id;
    return(
        <div>
            <div className="form-group">
                <label htmlFor="user">Assign To</label>
                <select className="form-control" name="user" id="user_id" defaultValue={props.task.user.id}>
                    <AllUser users={props.users}/>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input type="text" className="form-control" id="title"
                    name="title" defaultValue={props.task.title}/>
            </div>
            <div className="form-group">
                <label htmlFor="body">Body</label>
                <textarea className="form-control" name="body" id="body"
                        defaultValue={props.task.body}/>
            </div>
        </div>
    );
}

function User(props) {
    return(
        <div>
            <div className="form-group">
                <label htmlFor="hour">Hours Spent</label>
                <input className="form-control" type="number" min="0" name="hours" defaultValue={props.task.hours} id="hours"/>
            </div>
            <div className="form-group">
                <label htmlFor="mins">Minutes Spent(minutes, 15min increment)</label>
                <input className="form-control" type="number" min="0" max="45" step="15" name="mins" defaultValue={props.task.mins} id="mins"/>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" id="complete" name="complete"
                       defaultChecked={props.task.complete}/>
                <label className="form-check-label" htmlFor="complete">Complete?</label>
            </div>
        </div>
    );
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
        redirect: state.redirect,
        token: state.token,
        edittask: state.edittask,
        users: state.users,
    };
}

export default connect(state2props)(EditTask)
