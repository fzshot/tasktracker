import store from "./store";

class API {
    create_user(e){
        e.preventDefault();

        let email = $("#email").val();
        let name = $("#name").val();
        let pass = $("#password").val();

        console.log(name);
        console.log(email);
        console.log(pass);

        let text = JSON.stringify({
            user: {
                email: email,
                name: name,
                password_hash: pass,
            }
        });

        let host = window.location.host;

        $.ajax(user_path, {
            method: "post",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            data: text,
            success: () => {
                window.location.replace("http://"+host);
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
                console.log(resp);
                store.dispatch({
                    type: "SET_TOKEN",
                    token: resp,
                });
            }
        });
    }

    get_tasks() {
        $.ajax(task_path, {
            method: "get",
            success: (resp) => {
                return resp;
            }
        });
    }

    new_task(e, creator_id) {
        e.preventDefault();

        let user_id = $("#user-id").val();
        let title = $("#title").val();
        let body = $("#body").val();

        let text = {
            task: {
                body: body,
                title: title,
                user_id: user_id,
                creator_id: creator_id,
            }
        };

        $.ajax(task_path, {
            method: "post",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            data: text,
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
}

export default new API();
