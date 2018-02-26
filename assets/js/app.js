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
    $(".folow-button").each((_,bb) => {
        if ($(bb).data("employee_id") == employee_id) {
            $(bb).data("manage_id", value);
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
        sucess: (resp) => {set_button(employee_id, resp.data.id);}
    });
}

function unmanage(manage_id) {
    $.ajax(manager_path + "/" + manage_id, {
        method: "delete",
        dataType: "json",
        contentType: "application/json; charset=UTF-8",
        data: "",
        success: () => {set_button(manage_id, "");}
    });
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
        unmanage(manage_id);
    }

}

function init_button() {
    $(".manage-button").click(manage_click);
    // $(".manage-button").click(() => {
    //     alert("Test");
    // });
    update_button();
}

$(init_button);
