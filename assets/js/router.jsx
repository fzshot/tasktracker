import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";

import Index from "./index";
import NewUser from "./new_user";

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
            </div>
        </Router>
    );
}
