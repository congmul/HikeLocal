$(document).ready(function () {

    $("#join-btn").on("click", function(e){
        e.preventDefault();

        console.log($("#name-input").val());
        console.log($("#email-input").val());
        console.log($("#password-input").val());
    })

})