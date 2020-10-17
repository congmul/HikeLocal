$(document).ready(function () {

  $("serch-radius option:selected").text();
  
 

// Access UI
var resultPageEl = $(".resultPage");

// Declare Global variables
var address = "";
var trailRating = 0;
var latitude = "";
var longitude = "";
var maxDistance = 0;
var maxResults = 50;  // test value
var sortBy = "distance"; // test value
var locations;


// Click event when clicking To trails button
$("#toTrails").on("click", function () {    
    address = $("#address").val();
    // console.log(address);

    // Capture User Input
    trailRating = $("#trail-rating").val();
    console.log(trailRating);
    maxDistance = parseInt($("#search-radius").val());

    $(".searchPage").css("display", "none");

    // Geolocation API transfer address to lat/lng
    var queryURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=AIzaSyCPgJjyXg3QM3W6eJlHAtQGhct26ZY8pEI";
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function (response) {
        console.log(response);
        latitude = response.results[0].geometry.location.lat;
        longitude = response.results[0].geometry.location.lng;
        console.log("latitude: " + latitude+" longitude:"+longitude);

        // Call Hiking API
        queryHikingProject(latitude, longitude, maxDistance, maxResults, sortBy, trailRating).then(data => {
          // Store returned trails array
          locations = data;
        });
        // hiking(latitude, longitude);
      });

     

});

// Go back to search page
$("#home").on("click", function() {
  $(".searchPage").css("display", "block");
  $(".resultPage").text("");
});




});
