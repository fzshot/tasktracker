import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";

import api from "./api";

import Index from "./index";
import NewUser from "./new_user";
import NewTask from "./new_task";

export default function Index_router(root) {
    return(
        <Router>
            <div>
                <Route path="/" exact={true} render={() =>
                    <Index/>
                }/>
                <Route path="/newuser" exact={true} render={() =>
                    <NewUser/>
                }/>
                <Route path="/newtask" exact={true} render={() =>
                    <NewTask/>
                } onEnter={api.get_user()}/>
                <Route path="/edittask/:id" exact={true}/>
            </div>
        </Router>
    );
}
