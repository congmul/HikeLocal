$(document).ready(function () {


    
    // Access UI
    var resultPageEl = $(".resultPage"); // is this used by anthing? - Scott

    // Declare Global variables
    var address = "";
    var trailRating = 0;
    var latitude = "";
    var longitude = "";
    var maxDistance = 0;
    var maxResults = 50;  // test value
    var sortBy = "distance"; // test value
    var locations;           // Hiking data object
    var weatherObject;
    var locationsGoogleMap = []; // Result Google Map value


    // Click event when clicking To trails button
    $("#toTrails").on("click", function () {
        address = $("#address").val();
        // console.log(address);

        // Capture User Input
        trailRating = $("#trail-rating").val();
        // console.log(trailRating);
        maxDistance = parseInt($("#search-radius").val());

        $("#landing-page").css("display", "none");
        $("#loading-page").css("display", "block");

        // Geolocation API transfer address to lat/lng
        var queryURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=AIzaSyCPgJjyXg3QM3W6eJlHAtQGhct26ZY8pEI";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log("==== Lat/Lng of Location searched =====");
            console.log(response);
            latitude = response.results[0].geometry.location.lat;
            longitude = response.results[0].geometry.location.lng;
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
                for (let i = 0; i < locations.trails.length; i++) {
                    locationsGoogleMap.push({ "lat": locations.trails[i]["latitude"], "lng": locations.trails[i]["longitude"] });
                }
                $("#loading-page").css("display", "none");

                // Call result Map function.
                resultMap(latitude, longitude, locationsGoogleMap, locations, weatherObject);

            }, 3000);
        });

    });

    // Logo Btn : Go back to search page 
    $("#home").on("click", function () {
        $("#landing-page").css("display", "block");
        $("#mapResult").text("");
        locationsGoogleMap = [];
        // weatherObjectTest = "";
    });

    // Search Btn : Go back to search page
    $("#searchBtn").on("click", function () {
        $("#landing-page").css("display", "block");
        $("#mapResult").text("");
        locationsGoogleMap = [];
        // weatherObjectTest = "";
    });

    console.log("");
    let userSave = [];
    userSave = localStorage.getItem("userSave").split("}");
    console.log(userSave.length);
    console.log(userSave);

});
