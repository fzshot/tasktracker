function newuser() {
    $("#newuser").submit(function(e){
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

        let host = window.location.hostname;

        $.ajax(user_path, {
            method: "post",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            data: text,
        });
    });
}
