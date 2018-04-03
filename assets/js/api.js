import store from "./store";

class API {
    create_user(e){
        e.preventDefault();

        let email = $("#email").val();
        let name = $("#name").val();
        let pass = $("#password").val();

        let text = JSON.stringify({
            user: {
                email: email,
                name: name,
                password_hash: pass,
            }
        });


        $.ajax(user_path, {
            method: "post",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            data: text,
            success: () => {
                store.dispatch({
                    type: "REDIRECT",
                });
                store.dispatch({
                    type: "NOREDIRECT",
                });
            }
        });
    }

    submit_login(e) {
        e.preventDefault();

        let email = $("#email").val();
        let pass = $("#password").val();

        let text = {
            email: email,
            pass: pass,
        };

        $.ajax(token_path, {
            method: "post",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            data: JSON.stringify(text),
            success: (resp) => {
                store.dispatch({
                    type: "SET_TOKEN",
                    token: resp,
                });
            },
            error: () => {
                alert("Incorrect Email or Password!");
            }
        });
    }


    new_task(e, token, form) {
        e.preventDefault();

        let creator_id = token.user_id;
        let title = form.title;
        let body = form.body;
        let user_id = $("select[name=user]").val();

        let text = {
            task: {
                body: body,
                title: title,
                user_id: user_id,
                creator_id: creator_id,
            },
            token: token.token,
        };


        let empty_task = {
            title: "",
            body: "",
        };

        let host = window.location.host;

        $.ajax(task_path, {
            method: "post",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            data: JSON.stringify(text),
            success: () => {
                store.dispatch({
                    type: "CLEAN_TASKFORM",
                });
                store.dispatch({
                    type: "REDIRECT",
                });
                store.dispatch({
                    type: "NOREDIRECT",
                });
            }
        });
    }

    get_user() {
        $.ajax(user_path, {
            method: "get",
            success: (resp) => {
                store.dispatch({
                    type: "GET_USER",
                    users: resp.data,
                });
            }
        });
    }

    get_tasks() {
        $.ajax(task_path, {
            method: "get",
            success: (resp) => {
                store.dispatch({
                    type: "GET_TASKS",
                    tasks: resp.data,
                });
            }
        });
    }

    delete_task(id) {
        $.ajax(task_path+"/"+id, {
            method: "delete",
            success: () => {
                this.get_tasks();
            }
        });
    }
}

export default new API();
