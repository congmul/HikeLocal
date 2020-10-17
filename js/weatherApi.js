const queryWeather = async (latitude, longitude) => {
    const apiKey = "55b9b01153577ab02bdcfe93626df0e5";

    let queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&exclude=hourly,minutely&units=imperial&appid=" + apiKey;

<<<<<<< HEAD

function weatherDisplay(latitude, longitude) {

    var apiKey = "55b9b01153577ab02bdcfe93626df0e5";

    var queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&exclude=hourly,minutely&units=imperial&appid=" + apiKey;


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
    });


    
}

});
=======
    // send asynchronous request
    const request = await fetch(queryURL);
    const data = await request.json();
    return data;
}
>>>>>>> develop
