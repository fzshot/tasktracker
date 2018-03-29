import {createStore, combineReducers} from "redux";
import deepFreeze from "deep-freeze";

// let empty_token = {
//     user_name: "",
//     user_id: "",
//     token: "",
// }

function token(state = null, action) {
    switch(action.type) {
        case "SET_TOKEN":
            return action.token;
        case "REMOVE_TOKEN":
            return null;
        default:
            return state;
    }
}


// function userform(state = empty_userform, action) {
//     switch(action.type) {
//         case "LOGIN":
//             return action.data;
//         case "LOGOUT":
//             return empty_userform;
//         default:
//             return state;
//     }
// }

function root_reducer(state0, action) {
    let reducer = combineReducers({token});
    let state1 = reducer(state0, action);
    return deepFreeze(state1);
}

let store = createStore(root_reducer);
export default store;
