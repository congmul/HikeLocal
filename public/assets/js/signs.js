$(document).ready(function () {

    $("#join-btn").on("click", function (e) {
        e.preventDefault();

        console.log($("#name-input").val());
        console.log($("#email-input").val());
        console.log($("#password-input").val());

        const userInformation = {
            "name": $("#name-input").val(),
            "email": $("#email-input").val(),
            "password": $("#password-input").val()
        }

        console.log(userInformation);

        async function signUp(userInformation){
            const response = await fetch("/api/signup/", {
                method: 'POST',
                body: JSON.stringify(userInformation),
                headers: { "Content-type": "application/json; charset=UTF-8" }
            })
                return response.json();
        }

        signUp(userInformation)
        .then(data => console.log(data.err));

    })

})