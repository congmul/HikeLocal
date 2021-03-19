// require('dotenv').config()

$(document).ready(function () {

    
    // Declare Global variables
    var address = "";
    var trailRating = 0;
    var difficulty = "";
    var latitude = "";
    var longitude = "";
    var maxDistance = 0;
    var maxResults = 50;  // test value
    var sortBy = "distance"; // test value
    var locations;           // Hiking data object
    var weatherObject;
    var locationsGoogleMap = []; // Result Google Map value
    $(".resultPage").css("display", "none");

    // Click event when clicking To trails button
    $("#toTrails").on("click", function () {
        // User card reset
        $(".displayCard").text("");

        // Capture User Input
        address = $("#address").val();
        trailRating = $("#trail-rating").val();
        difficulty = $("#difficultySearch").val();
        maxDistance = parseInt($("#search-radius").val());
        console.log("========== 2. Take Data from a user : Address, Rating, Difficulty, Mile Range ==========");
        console.log(address +", " + trailRating +", " + difficulty +", " + maxDistance);

        $("#landing-page").css("display", "none");
        $("#loading-page").css("display", "block");

        // Geolocation API transfer address to lat/lng
        // Move to Backend
        console.log(process.env.GOOGLE_API);
        var queryURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + `&key=${process.env.GOOGLE_API}`;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            // console.log("==== Lat/Lng of Location searched =====");
            // console.log(response);
            latitude = response.results[0].geometry.location.lat;
            longitude = response.results[0].geometry.location.lng;
            console.log("========== 3. Take latitude & longitude from Address: ==========");
            console.log("latitude: " + latitude + " longitude:" + longitude);

            // Call Hiking API
            queryHikingProject(latitude, longitude, maxDistance, maxResults, sortBy, trailRating).then(data => {
                // Store returned trails array
                locations = data;
            });

            // Call Weather API
            queryWeather(latitude, longitude).then(data => {
                weatherObject = data;
            });

            // Hiking Project API takes about 2-3 seconds to return the results depending on how many you ask for
            setTimeout(() => {
                // console.log(locations);               
                // Take all lat/lng to use for Result map
                $(".resultPage").css("display", "block");
                for (let i = 0; i < locations.trails.length; i++) {
                    locationsGoogleMap.push({ "lat": locations.trails[i]["latitude"], "lng": locations.trails[i]["longitude"] });
                }
                $("#loading-page").css("display", "none");

                // Call result Map function.
                resultMap(latitude, longitude, locationsGoogleMap, locations, difficulty);

            }, 3000);
        });

    });

    // Logo Btn : Go back to search page 
    $("#home").on("click", function () {
        $("#landing-page").css("display", "block");
        $(".resultPage").css("display", "none");
        $("#mapResult").text("");
        locationsGoogleMap = [];
    });

    // Search Btn : Go back to search page
    $("#searchBtn").on("click", function () {
        $("#landing-page").css("display", "block");
        $(".resultPage").css("display", "none");
        $("#mapResult").text("");
        locationsGoogleMap = [];
    });

});
