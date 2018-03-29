import React from "react";
import {connect} from "react-redux";

import Login from "./login";
import Tasks from "./tasks";

function Index(props) {
    return (
        <div>
            <Check token={props.token}/>
        </div>
    );
}


function Check(props) {
    if (props.token) {
        return <Tasks token={props.token}/>;
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
