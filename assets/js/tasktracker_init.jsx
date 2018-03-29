import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";

import Index_router from "./router.jsx";

export default function tasktracker_init(store, root) {
    ReactDOM.render(
        <Provider store={store}>
            <Index_router/>
        </Provider>, root
    );
}
