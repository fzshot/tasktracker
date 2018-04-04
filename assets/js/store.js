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

function redirect(state = false, action) {
    switch(action.type) {
        case "REDIRECT":
            return true;
        case "NOREDIRECT":
            return false;
        default:
            return state;
    }
}

function login(state = false, action) {
    switch(action.type) {
        case "LOGIN_ERROR":
            return true;
        case "LOGIN_OK":
            return false;
        default:
            return state;
    }
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

function edittask(state = {}, action) {
    switch(action.type) {
        case "SAVE":
            return action.task;
        default:
            return state;
    }
}


function root_reducer(state0, action) {
    let reducer = combineReducers({token, users, taskform, tasks, redirect, login, edittask});
    let state1 = reducer(state0, action);
    return deepFreeze(state1);
}

let store = createStore(root_reducer);
export default store;
