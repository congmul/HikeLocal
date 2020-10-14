// Current Location Map ( Google MAP API )
let map, infoWindow;

function currentMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 47.6062, lng: -122.3321 },
    zoom: 10,
    disableDefaultUI: true,
  });
 
  infoWindow = new google.maps.InfoWindow();

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    console.log(navigator.geolocation);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        // console.log("position: "+ JSON.stringify(position.coords.latitude));
        infoWindow.setPosition(pos);
        infoWindow.setContent("You here!");
        infoWindow.open(map);
        map.setCenter(pos);
      },
      () => {
        handleLocationError(true, infoWindow, map.getCenter());
      }
    );
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }

  // initZoomControl(map);
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}



var lat = "47.6062";
var lon = "-122.3321";
var maxDistance = "1"; // in mile
var apiKey = "200940876-5be905d45fc6163d6540d3be7aff0c86";
var queryURL = "https://www.hikingproject.com/data/get-trails?lat="+lat+"&lon="+lon+"&maxDistance="+maxDistance+"&key=" + apiKey;
// var queryURL = "https://www.hikingproject.com/data/get-trails?lat=40.0274&lon=-105.2519&maxDistance=10&key=200940876-5be905d45fc6163d6540d3be7aff0c86";

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {
    // console.log(JSON.stringify(response));
    console.log(response);
});