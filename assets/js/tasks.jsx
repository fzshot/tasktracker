import React from "react";
import api from "./api"
import {connect} from "react-redux";

function Tasks(props) {
    let name = props.token.user_name;
    let user_id = props.token.user_id;

    let tasks = _.filter(props.tasks, (t) => {
        return(t.creator.id == user_id) || (t.user.id == user_id)
    });
    return <Cards tasks={tasks} user_id={user_id}/>;
}


function Cards(props) {
    function Card(props) {
        let t = props.task;
        let complete = "No";
        if (t.complete) {
            complete = "Yes"
        }

        return (
            <div className="row justify-content-center">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">
                                {t.title}
                            </h5>
                            <h6 className="card-subtitle mb-2 text-muted">
                                Creator: {t.creator.name} Assigned to: {t.user.name} Time Spent: {t.hours} hours {t.mins} minutes Complete: {complete}
                            </h6>
                            <p className="card-text">
                                {t.body}
                            </p>
                            <div style={{textAlign: "right"}}>
                                <DeleteButton creator_id={t.creator.id} task_id={t.id} user_id={props.user_id}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    let cards = [];
    let tasks = props.tasks;

    _.each(tasks, (task) => {
        cards.push(<Card task={task} key={task.id} user_id={props.user_id}/>);
    });

    return cards;
}

function DeleteButton(props) {
    let id = props.task_id;
    let creator_id = props.creator_id;
    let user_id = props.user_id;
    if (user_id == creator_id) {
        return(
            <button className="btn btn-danger" onClick={() => api.delete_task(id)}>
                Delete
            </button>
        );
    } else {
        return null;
    }
}

function state2props(state) {
    return {
        token: state.token,
        tasks: state.tasks,
    };
}

export default connect(state2props)(Tasks);
