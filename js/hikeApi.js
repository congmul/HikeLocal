// Hiking API

function hiking(latitude, longitude) {
    console.log("latitude: " + latitude + " longitude:" + longitude);

    var maxDistance = "10"; // in mile
    var apiKey = "200940876-5be905d45fc6163d6540d3be7aff0c86";
    var queryURL = "https://www.hikingproject.com/data/get-trails?lat=" + latitude + "&lon=" + longitude + "&maxDistance=" + maxDistance + "&key=" + apiKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
    });
}