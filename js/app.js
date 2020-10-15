$(document).ready(function () {

// Access UI
var resultPageEl = $(".resultPage");

// Declare variable
var address = "";
var latitude = "";
var longitude = "";
var locations = [];

// Click event when clicking To trails button
$("#toTrails").on("click", function () {
    address = $("#address").val();
    // console.log(address);

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
      });

});

// Go back to search page
$("#home").on("click", function() {
  $(".searchPage").css("display", "block");
  $(".resultPage").text("");
});

});