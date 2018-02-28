// Brunch automatically concatenates all files in your
// watched paths. Those paths can be configured at
// config.paths.watched in "brunch-config.js".
//
// However, those files will only be executed if
// explicitly imported. The only exception are files
// in vendor, which are never wrapped in imports and
// therefore are always executed.

// Import dependencies
//
// If you no longer want to use a dependency, remember
// to also remove its path from "config.paths.watched".
import "phoenix_html";

// Import local files
//
// Local files can be imported directly using relative
// paths "./socket" or full ones "web/static/js/socket".

// import socket from "./socket"

function update_timestamp_button() {
    $(".timestamp-btn").each((_,bb) => {
        let time_id = $(bb).data("time-id");
        if (time_id == "") {
            $(bb).text("Start Work");
        }
        else {
            $(bb).text("Stop Work");
        }
    });
}

function update_button() {
    $(".manage-button").each((_, bb) => {
        let manage_id = $(bb).data("manage-id");
        if (manage_id == "") {
            $(bb).text("Manage");
        }
        else {
            $(bb).text("UnManage");
        }
    });
}

function set_button(employee_id, value) {
    $(".manage-button").each((_,bb) => {
        if ($(bb).data("employee-id") == employee_id) {
            $(bb).data("manage-id", value);
        }
    });
    update_button();
}

function manage(employee_id, current_id) {
    let text = JSON.stringify({
        manager: {
            manager_id: current_id,
            employee_id: employee_id
        }
    });

    $.ajax(manager_path, {
        method: "post",
        dataType: "json",
        contentType: "application/json; charset=UTF-8",
        data: text,
        success: (resp) => {set_button(employee_id, resp.data.id);}
    });
}

function unmanage(employee_id, manage_id) {
    $.ajax(manager_path + "/" + manage_id, {
        method: "delete",
        dataType: "json",
        contentType: "application/json; charset=UTF-8",
        data: "",
        success: () => {set_button(employee_id, "");}
    });
}

function set_timestamp_button(task_id, value) {
    $(".timestamp-btn").each((_, bb) => {
        if ($(bb).data("task-id") == task_id) {
            $(bb).data("time-id", value);
        }
    });
    update_timestamp_button();
}

function stop_timestamp(time_id, task_id) {
    let current_time = new Date();

    let text = JSON.stringify({
        timeblock: {
            stop_time: current_time,
        }
    });

    $.ajax(timeblock_path + "/" + time_id, {
        type: "patch",
        dataType: "json",
        contentType: "application/json; charset=UTF-8",
        data: text,
        success: () => {
            set_timestamp_button(task_id, "");
            location.reload();}
    });
}

function start_timestamp(task_id) {
    let current_time = new Date();

    let text = JSON.stringify({
        timeblock: {
            task_id: task_id,
            start_time: current_time,
            stop_time: current_time,
        }
    });

    $.ajax(timeblock_path, {
        method: "post",
        dataType: "json",
        contentType: "application/json; charset=UTF-8",
        data: text,
        success: (resp) => {set_timestamp_button(task_id, resp.data.id);}
    });
}


function time_click(ev) {
    let btn = $(ev.target);
    let task_id = btn.data("task-id");
    let time_id = btn.data("time-id");
    if (time_id == "") {
        start_timestamp(task_id);
    }
    else {
        let update_path = btn.data("update-path");
        stop_timestamp(time_id, task_id);
    }
}

function delete_interval(ev) {
    if (confirm("Are you sure?")) {
        let btn = $(ev.target);
        let time_id = btn.data("time-id");

        $.ajax(timeblock_path + "/" + time_id, {
            method: "delete",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            data: "",
            success: () => {location.reload();}
        });
    }
}

function add_interval(ev) {
    let start_time = $(".start-time-input").val();
    let start_date = $(".start-date-input").val();
    let stop_time = $(".stop-time-input").val();
    let stop_date = $(".stop-date-input").val();
    let start_datetime = new Date(start_date + "T" + start_time);
    let stop_datetime = new Date(stop_date + "T" + stop_time);

    if (start_datetime >= stop_datetime) {
        alert("Stop Time has to be after Start Time")
    }
    else {
        let task_id = $(ev.target).data("task-id");

        // console.log(start_datetime);
        // console.log(stop_datetime);

        let text = JSON.stringify({
            timeblock: {
                task_id: task_id,
                start_time: start_datetime,
                stop_time: stop_datetime
            }
        });

        $.ajax(timeblock_path, {
            method: "post",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            data: text,
            success: () => {location.reload();}
        });
    }
}

function manage_click(ev) {
    let btn = $(ev.target);
    let employee_id = btn.data("employee-id");
    let manage_id = btn.data("manage-id");
    let current_id = btn.data("current-id");
    if (manage_id == "") {
        manage(employee_id, current_id);
    }
    else {
        unmanage(employee_id, manage_id);
    }

}

function init_button() {
    $(".manage-button").click(manage_click);
    $(".timestamp-btn").click(time_click);
    $(".delete-interval").click(delete_interval);
    $(".add-interval").click(add_interval);
    update_button();
    update_timestamp_button();
}

$(init_button);
