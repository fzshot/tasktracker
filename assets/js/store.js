import {createStore, combineReducers} from "redux";
import deepFreeze from "deep-freeze";

function users(state = [], action) {
    switch(action.type) {
        case "GET_USER":
            return action.users;
        default:
            return state;
    }
}

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

let empty_task = {
    title: "",
    body: "",
}

function taskform(state = empty_task, action) {
    switch(action.type) {
        case "UPDATE_TASKFORM":
            return Object.assign({}, state, action.form);
        case "CLEAN_TASKFORM":
            return empty_task;
        default:
            return state;
    }
}

function tasks(state = [], action) {
    switch(action.type) {
        case "GET_TASKS":
            return action.tasks;
        default:
            return state;
    }
}


function root_reducer(state0, action) {
    let reducer = combineReducers({token, users, taskform, tasks});
    let state1 = reducer(state0, action);
    return deepFreeze(state1);
}

let store = createStore(root_reducer);
export default store;
