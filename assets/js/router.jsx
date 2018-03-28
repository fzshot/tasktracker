import React from "react";
import ReactDom from "react-dom";
import {BrowserRouter as Router, Route} from "react-router-dom";

import Index from "./index";
import NewUser from "./new_user";

export default function index_router(root) {
    ReactDom.render(<IndexRouter/>, root);
}


class IndexRouter extends React.Component {
    render() {
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
}
