// import store from "./store";
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
}

export default new API();
