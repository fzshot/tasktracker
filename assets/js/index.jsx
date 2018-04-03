import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

import Login from "./login";
import Tasks from "./tasks";

import api from "./api";

function Index(props) {
    return (
        <div>
            <Check token={props.token}/>
        </div>
    );
}


function Check(props) {
    console.log(props.token);
    if (props.token) {
        return (
            <div>
                <div className="row justify-content-between">
                    <div className="col-auto">
                        <h3>Listing Tasks (Login as: {props.token.user_name})</h3>
                    </div>
                    <div className="col-auto">
                        <Link to="/newtask">
                            <button className="btn btn-primary">
                                New Task
                            </button>
                        </Link>
                    </div>
                </div>
                <Tasks onEnter={api.get_tasks()}/>
            </div>
        );
    } else {
        return <Login/>;
    }
}

function state2props(state) {
    return {
        token: state.token,
    }
}

export default connect(state2props)(Index);
