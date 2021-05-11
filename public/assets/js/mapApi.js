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
    navigator.geolocation.getCurrentPosition((position => {
        currentLocation["lat"] = position.coords.latitude;
        currentLocation["lng"] = position.coords.longitude;
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        console.log("==========  1. Current Locations: "+ JSON.stringify(pos) +" ==========");
        infoWindow.setPosition(pos); // Set latlng on the infoWindow
        infoWindow.setContent("You are here!");
        infoWindow.open(map); // Opens this InfoWindow on the given map
        map.setCenter(pos);   // Set latlng on the map
      }),
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
function resultMap(latitude, longitude, locationsGoogleMap, locations, difficulty) {
  const map = new google.maps.Map(document.getElementById("mapResult"), {
    zoom: 10,
    center: { lat: latitude, lng: longitude },
  });

  // Add current Location on result map
  infoWindowCurrentLocation = new google.maps.InfoWindow();
  infoWindowCurrentLocation.setPosition(currentLocation);
  infoWindowCurrentLocation.setContent("You are here!");
  infoWindowCurrentLocation.open(map);

  console.log("=========== 4. Trails Information =============== ");
  console.log(locations);

  // console.log("========= weatherObject ==========");
  // console.log(weatherObject);

  console.log("======= 5. All LatLng searched ======");
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
  // console.log("markers : ");
  // console.log(markers);
  
  for (let i = 0; i < markers.length; i++) {
   
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
    let difficultyDescription = "";
    switch(locations.trails[i].difficulty){
      case "green":
        difficultyDescription= "Easy";
        break;
      case "greenBlue":
        difficultyDescription= "Easy - Intermediate";
        break;
      case "blue":
        difficultyDescription= "Intermediate";
        break;
      case "blueBlack":
        difficultyDescription= "Intermediate - Difficult";
        break;
      case "black":
        difficultyDescription= "Difficult";
        break;
      case "dBlack":
        difficultyDescription= "Very Difficult";
        break;
    }
    let userSelectDifficulty = "";
    // console.log("difficulty in mapAPi");
    // console.log(difficulty);
    if(locations.trails[i].difficulty === difficulty){
      userSelectDifficulty = "difficultyBackground";
    }
      

    // ContentString for infowindows
    let contentString =         
      '<img id="imgTrails" alt="No image" src = ' + locations.trails[i].imgSqSmall + ' >' +         
      '<h1 id="firstHeading" class="firstHeading">' + locations.trails[i].name + '</h1>' +
      '<p class ="description '+userSelectDifficulty+'" id ="difficulty">Difficulty : ' + difficultyDescription+ '</p>' +
      '<p class ="description" data-star="'+locations.trails[i].stars+'" id="trailRating">Trail Rating : ' + stars + '</p>' +
      '<p class ="description" id="trailLength">Trail Length: ' + locations.trails[i].length + ' miles</p>' +
      '<p class ="description" id="Location">Location : ' + locations.trails[i].location + '</p>' +
      '<a href=' + locations.trails[i].url + 'class="info-link" id="infoLink" target="_Blank">More Information</a>' +  // idea by Scott
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
function saveFunction() {
  // console.log(window.document.getElementById('firstHeading').textContent);
  let saveObjects = new Object();
  saveObjects["img"] = window.document.getElementById('imgTrails').getAttribute("src");
  saveObjects["name"] = window.document.getElementById('firstHeading').textContent;
  saveObjects["difficulty"] = window.document.getElementById('difficulty').textContent;
  saveObjects["trailRating"] = window.document.getElementById('trailRating').getAttribute("data-star");
  saveObjects["traillength"] = window.document.getElementById('trailLength').textContent;
  saveObjects["Location"] = window.document.getElementById('Location').textContent;
  saveObjects["linkHref"] = window.document.getElementById('infoLink').getAttribute("href");
  saveArray.push(saveObjects);
  localStorage.setItem("userSave", JSON.stringify(saveArray));
}



// get data from localStorage & Create Card
  $(".content").on("click", "#displayUserSave", function(){
    $(".displayCard").text("");
    let userSave = JSON.parse(localStorage.getItem("userSave"));
    console.log("========== 6. Information that a user stored ==========");
    console.log(userSave);
    if (userSave !== null){
    for (let i = 0; i < userSave.length; i++){
      let divEl = $("<div>");
      let mediaDivEl = $("<div>");
      let mediaLeftDivEl = $("<div>");
      let figureEl = $("<figure>");
      let imgEl = $("<img>");
      let mediaCotentEl = $("<div>");
      let pTitleEl = $("<p>");
      let pDifficultyElsub = $("<p>");
      let pTrailRatingElsub = $("<p>");
      let pTrailLengthElsub = $("<p>");
      let pLocationElsub = $("<p>");
      let pLinkElsub = $("<a>");
      divEl.attr("class", "card-content card userSaveDisplay rcorners");
      mediaDivEl.attr("class", "media");
      mediaLeftDivEl.attr("class", "media-left");
      figureEl.attr("class","cardImage");
      imgEl.attr("alt", "No image");
      imgEl.attr("width", "190");
      mediaCotentEl.attr("class","media-content");
      pTitleEl.css("font-family","henny penny");
      pTitleEl.attr("class","title is-4");
      pDifficultyElsub.attr("class", "is-6");
      pTrailRatingElsub.attr("class", "is-6");
      pTrailLengthElsub.attr("class", "is-6");
      pLocationElsub.attr("class", "is-6");

      imgEl.attr("src",userSave[i].img);
      pLinkElsub.attr("href", userSave[i].linkHref);
      pLinkElsub.attr("target", "_Blank");
      pLinkElsub.text("More Information");
      pTitleEl.text(userSave[i].name);      
      pDifficultyElsub.text(userSave[i].difficulty);
      pTrailRatingElsub.text(userSave[i].trailRating + " / 5.0");
      pTrailLengthElsub.text(userSave[i].traillength);
      pLocationElsub.text(userSave[i].Location);

      //Left column
      figureEl.append(imgEl);
      mediaLeftDivEl.append(figureEl);
      mediaDivEl.append(mediaLeftDivEl);
      //Right column
      mediaCotentEl.append(pTitleEl);
      mediaCotentEl.append(pDifficultyElsub);
      mediaCotentEl.append(pTrailRatingElsub);
      mediaCotentEl.append(pTrailLengthElsub);
      mediaCotentEl.append(pLocationElsub);
      mediaCotentEl.append(pLinkElsub);

      mediaDivEl.append(mediaCotentEl);

      divEl.append(mediaDivEl);
      $(".displayCard").append(divEl);
    }
    }else {
        console.log("Nulltest");
      }
    });