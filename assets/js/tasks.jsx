import React from "react";

export default function tasks(props) {
    let name = props.token.user_name;
    return(
        <h3>Welcome Back {name}</h3>
    );
}
