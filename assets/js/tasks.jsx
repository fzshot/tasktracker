import React from "react";
import api from "./api"

export default function tasks(props) {
    let name = props.token.user_name;
    let user_id = props.token.user_id;
    let tasks = api.get_tasks();

    tasks = _.filter(tasks, (t) => {
        return(t.creator.id == user_id) || (t.user.id == user_id)
    });

    return <Cards tasks={tasks}/>;
}


function Cards(props) {
    function Card(props) {
        let t = props.task;

        return (
            <div className="row justify-content-center">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">
                                {t.title}
                            </h5>
                            <h6 className="card-subtitle mb-2 text-muted">
                                Creator: {t.creator.name}
                                Assigned to: {t.user.name}
                                Time Spent: {t.hours} hours
                                {t.mins} minutes
                                Complete: {complete}
                            </h6>
                            <p className="card-text">
                                {t.body}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    let cards = [];
    let tasks = props.tasks;

    _.each(tasks, (task) => {
        cards.push(<Card task={task}/>);
    });

    return cards;
}
