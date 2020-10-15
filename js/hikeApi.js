$(document).ready(function () {

// Hiking API
var lat = "47.6062";
var lon = "-122.3321";
var maxDistance = "1"; // in mile
var apiKey = "200940876-5be905d45fc6163d6540d3be7aff0c86";
var queryURL = "https://www.hikingproject.com/data/get-trails?lat=" + lat + "&lon=" + lon + "&maxDistance=" + maxDistance + "&key=" + apiKey;
// var queryURL = "https://www.hikingproject.com/data/get-trails?lat=40.0274&lon=-105.2519&maxDistance=10&key=200940876-5be905d45fc6163d6540d3be7aff0c86";

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {
    // console.log(JSON.stringify(response));
    console.log(response);
});




});