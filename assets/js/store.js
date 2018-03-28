import {createStore, combineReducers} from "redux";
import deepFreeze from "deep-freeze";

function token(state = null, action) {
    switch(action.type) {
        case "SET_TOKEN":
            return action.token;
        default:
            return state;
    }
}

function name(state, action) {
    switch(action.type) {
        case "LOGIN":
            return action.data;
        case "LOGOUT":
            return "";
        default:
            return "";
    }
}

function root_reducer(state0, action) {
    let reducer = combineReducers({token, name});
    let state1 = reducer(state0, action);
    return deepFreeze(state1);
}

let store = createStore(root_reducer);
export default store;
