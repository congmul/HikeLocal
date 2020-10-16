$(document).ready(function () {

    // Access UI
    var resultPageEl = $(".resultPage");

    // Declare Global variables
    var address = "";
    var trailRating = 0;
    var latitude = "";
    var longitude = "";
    var maxDistance = 0;
    var maxResults = 500;  // maximum test value
    var sortBy = "distance"; // test value
    var locations;
    var locationsGoogleMap = []; // Result Google Map value


    // Click event when clicking To trails button
    $("#toTrails").on("click", function () {
        address = $("#address").val();
        // console.log(address);

        // Capture User Input
        trailRating = $("#trail-rating").val();
        console.log(trailRating);
        maxDistance = parseInt($("#search-radius").val());

        $("#landing-page").addClass("hidden");
        $("#loading-page").removeClass();

        // Geolocation API transfer address to lat/lng
        var queryURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=AIzaSyCPgJjyXg3QM3W6eJlHAtQGhct26ZY8pEI";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            latitude = response.results[0].geometry.location.lat;
            longitude = response.results[0].geometry.location.lng;
            console.log("latitude: " + latitude + " longitude:" + longitude);

            // Call Hiking API
            queryHikingProject(latitude, longitude, maxDistance, maxResults, sortBy, trailRating).then(data => {
                // Store returned trails array
                locations = data;
            });

            // Hiking Project API takes about 2-3 seconds to return the results depending on how many you ask for
            setTimeout(() => {
                console.log(locations);               
                // Take all lat/lng to use for Result map
                for (let i = 0; i < locations.trails.length; i++) {
                    locationsGoogleMap.push({ "lat": locations.trails[i]["latitude"], "lng": locations.trails[i]["longitude"] });
                }

                $("#loading-page").addClass("hidden");
                // Call result Map function.
                resultMap(latitude, longitude, locationsGoogleMap);

            }, 3000);
        });

    });

    // Go back to search page
    $("#home").on("click", function () {
        $(".searchPage").css("display", "block");
        $(".resultPage").text("");
        locationsGoogleMap = [];
    });

});