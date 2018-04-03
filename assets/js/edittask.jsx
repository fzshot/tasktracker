import {connect} from "react-redux";
import {Link, Redirect} from "react-router-dom";

import api from "./api";

function Edittask(props) {
    if (props.redirect) {
        return <Redirect to="/"/>;
    } else {
        return null;
    }
}


function state2props(state) {
    return {
        redirect: state.redirect,
    };
}

export default connect(state2props)(Edittask)
