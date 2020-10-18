// Current Location Map ( Google MAP API )

// Decalre variables
let map, infoWindow;
let currentLocation = new Object;

// Map function Start
function currentMap() {
  //Map class - Map(mapDiv[, opts])
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 47.6062, lng: -122.3321 },
    zoom: 10,
    disableDefaultUI: true,
  });

  // InfoWindow class - InfoWindow([opts])
  infoWindow = new google.maps.InfoWindow();

  // Try HTML5 geolocation.
  if (navigator.geolocation) {   // navigator.geolocation returns a object that gives Web content access to the location of the device. 
    navigator.geolocation.getCurrentPosition(   //.getCurrentPosition(success[, error[, [options]])
      (position) => {
        currentLocation["lat"] = position.coords.latitude;
        currentLocation["lng"] = position.coords.longitude;
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        infoWindow.setPosition(pos); // Set latlng on the infoWindow
        infoWindow.setContent("You are here!");
        infoWindow.open(map); // Opens this InfoWindow on the given map
        map.setCenter(pos);   // Set latlng on the map
      },
      () => {
        handleLocationError(true, infoWindow, map.getCenter());
      }
    );
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }

  // Add Zoom Control on the map.
  initZoomControl(map);
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

function initZoomControl(map) {
  document.querySelector(".zoom-control-in").onclick = function () {
    map.setZoom(map.getZoom() + 1);
  };

  document.querySelector(".zoom-control-out").onclick = function () {
    map.setZoom(map.getZoom() - 1);
  };
  map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(
    document.querySelector(".zoom-control")
  );
}


// Decalre variables
let infowindowResult = [];
let weatherObjectTest;
let infoWindowCurrentLocation;
// Result Map with Markers function
function resultMap(latitude, longitude, locationsGoogleMap, locations, weatherObject) {
  const map = new google.maps.Map(document.getElementById("mapResult"), {
    zoom: 10,
    center: { lat: latitude, lng: longitude },
  });

  // Add current Location on result map
  infoWindowCurrentLocation = new google.maps.InfoWindow();
  infoWindowCurrentLocation.setPosition(currentLocation);
  infoWindowCurrentLocation.setContent("You are here!");
  infoWindowCurrentLocation.open(map);

  console.log("=========== Trails =============== ");
  console.log(locations);

  console.log("========= weatherObject ==========");
  console.log(weatherObject);

  console.log("======= All LatLng searched ======");
  console.log(locationsGoogleMap);
  // Create an array of alphabetical characters used to label the markers.
  const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  // Add some markers to the map.
  // Note: The code uses the JavaScript Array.prototype.map() method to
  // create an array of markers based on a given "locationsGoogleMap" array.
  // The map() method here has nothing to do with the Google Maps API.
  // location is value / i is index of the array
  const markers = locationsGoogleMap.map((location, i) => {
    return new google.maps.Marker({
      position: location,
      label: labels[i % labels.length],
    });
  });
  console.log("markers : ");
  console.log(markers);
  
  for (let i = 0; i < markers.length; i++) {

    // Call Weather API for all location
    // I can't use it because It calls so many times, OpenWeather API block my API_KEY
    // queryWeather(locationsGoogleMap[i]["lat"], locationsGoogleMap[i]["lng"]).then(data => {
    //   weatherObjectTest = data;
    //   console.log("====== weatherObjectTest ======");
    //   console.log(weatherObjectTest);
    // });
   
    // Create Star icon
    let stars = "";
    let fullStar = '<i class="fas fa-star starStyle"></i>';
    let halfStar = '<i class="fas fa-star-half-alt starStyle"></i>';
    let emptyStar = '<i class="far fa-star starStyle"></i>';
    let starNum = parseFloat(locations.trails[i].stars);
    for (let j = 1; j < 6; j++) {
      if (starNum >= j) {
        stars += fullStar;
      } else if (starNum % 1 !== 0) {
        stars += halfStar;
        starNum = parseInt(starNum);
      } else {
        stars += emptyStar;
      }
    }

    //Simplify difficulty description - Proposed by Scott Nelson
    switch(locations.trails[i].difficulty){
      case "green":
        locations.trails[i].difficulty = "Easy";
        break;
      case "greenBlue":
        locations.trails[i].difficulty = "Easy - Intermediate";
        break;
      case "blue":
        locations.trails[i].difficulty = "Intermediate";
        break;
      case "blueBlack":
        locations.trails[i].difficulty = "Intermediate - Hard";
        break;
      case "black":
        locations.trails[i].difficulty = "Hard";
        break;
      case "dBlack":
        locations.trails[i].difficulty = "Very Hard";
        break;
    }

    // ContentString for infowindows
    let contentString =         
      '<img id="imgTrails" alt="No image" src = ' + locations.trails[i].imgSqSmall + ' >' +         
      '<h1 id="firstHeading" class="firstHeading">' + locations.trails[i].name + '</h1>' +
      '<p class ="description" id ="difficulty">Difficuly : ' + locations.trails[i].difficulty + '</p>' +
      '<p class ="description" id="trailRating">Trail Rating : ' + stars + '</p>' +
      '<p class ="description" id="trailLength">Trail Length: ' + locations.trails[i].length + ' miles</p>' +
      '<p class ="description" id="Location">Location : ' + locations.trails[i].location + '</p>' +
      '<a href=' + locations.trails[i].url + 'class="info-link" target="_Blank">More Information</a>' +  // idea by Scott
      '<button id = "saveBtn" onclick ="saveFunction()">Save Trail</button>'; 
    infowindowResult[i] = new google.maps.InfoWindow({
      content: contentString,
      maxWidth: 800,
      minWidth: 450,
    }); 
  }
  // Use addListener function for all markers
  for (let i = 0; i < markers.length; i++) {
    markers[i].addListener("click", () => {
      infowindowResult[i].open(map, markers[i]);
    });

  }

  // Add a marker clusterer to manage the markers.
  new MarkerClusterer(map, markers, {
    imagePath:
      "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
  });

}
let saveArray = [];
let saveObjects = new Object();
function saveFunction() {
  console.log(window.document.getElementById('firstHeading').textContent);
  saveObjects["name"] = window.document.getElementById('firstHeading').textContent;
  saveObjects["difficulty"] = window.document.getElementById('difficulty').textContent;
  saveObjects["trailRating"] = window.document.getElementById('trailRating').textContent;
  saveObjects["Location"] = window.document.getElementById('Location').textContent;
  saveArray.push(saveObjects);
  localStorage.setItem("userSave", JSON.stringify(saveArray));
  // localStorage.setItem("userSave", saveArray);
  console.log(localStorage.getItem("userSave"));
}


// console.log(userSave.length);
// console.log(userSave);
  // $(".content").on("click", "#displayUserSave", function(){
  //   let userSave = JSON.parse(localStorage.getItem("userSave"));
  //   if (userSave !== null){
  //   // for (let i = 0; localStorage.length; i++){
  //     let divEl = $("<div>");
  //     divEl.attr("class", "card-content userSaveDisplay");
  
  //     let pEl = $("<p>");
  //     pEl.attr("class", "title");
  //     pEl.text("testTitle");
  //     let pElsub = $("<p>");
  //     pElsub.attr("class", "subtitle");
  //     pElsub.text("testSubTitle");
  
  //     // divEl.text(localStorage.getItem("userSave"));
  //     divEl.append(pEl);
  //     divEl.append(pElsub);
  //     $(".displayCard").append(divEl);
  //   }else {
  //       console.log("Nulltest");
  //     }
  //   });
  $(".content").on("click", "#displayUserSave", function(){
    let userSave = JSON.parse(localStorage.getItem("userSave"));
    if (userSave !== null){
    // for (let i = 0; localStorage.length; i++){
      let divEl = $("<div>");
      divEl.attr("class", "card-content userSaveDisplay");
  
      let pEl = $("<p>");
      pEl.attr("class", "title");
      pEl.text("testTitle");
      let pElsub = $("<p>");
      pElsub.attr("class", "subtitle");
      pElsub.text("testSubTitle");
  
      // divEl.text(localStorage.getItem("userSave"));
      divEl.append(pEl);
      divEl.append(pElsub);
      $(".displayCard").append(divEl);
    }else {
        console.log("Nulltest");
      }
    });