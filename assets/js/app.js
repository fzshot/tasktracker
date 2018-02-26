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
import "phoenix_html"

// Import local files
//
// Local files can be imported directly using relative
// paths "./socket" or full ones "web/static/js/socket".

// import socket from "./socket"

function set_button() {
}

function manage() {
}

function unmanage() {
}

function update_button() {
    $(".manage-button").each((_, bb) => {
        let employee_id = $(bb).data("employee-id");
        let manager_id = $(bb).data("manager-id");
        if (manager_id == "") {
            $(bb).text("Manage");
        }
        else {
            $(bb).text("UnManage");
        }
    });
}

function manage_click(ev) {
    let btn = $(ev.target);
    let employee_id = btn.data("employee-id");
    let manager_id = btn.data("manager-id");
    if (manager_id == "") {
        manage(employee)
    }

}

function init_button() {
    $(".follow-button").click(manage_click);
}

$(init_button);
