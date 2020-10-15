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

// Function     - queryHikingProject
// Version      - 1.0    
// Author       - Scott Nelson
// Description  - Asyncrhonous function that creates an API query to the Hiking Project API based on 6 parameters
//                and returns an array of JSON objects
// Use          - To store results in a variable, a .then() must be constructed.
//                Ex: queryHikingProject(.....).then(data => {[yourVariable] = data});
//               
// Parameters   - latitude  - numerical value representing the latitude of device
//              - longitude - numerical value representing the longitude of the device
//              - distance  - numerical value that represents the radius of the search from the 
//                            current position (maximum for API is 200 miles)
//              - results   - numerical value representing the number of trail results to return
//                            (The maximum number of results for the API is 500)
//              - sort      - string value that determines how the search results will be sorted,
//                            values can be: 'distance' or 'quality'
//              - rating    - numerical that can be from 0 to 4 
// Return Value - array of trail objects (JSON)
// Notes        - Hiking Project API seems to take a little under 2 seconds to return results
const queryHikingProject = async (latitude, longitude, distance, results, sort, rating) => {
    const apiKey = "200940875-36c4754b6780070076ba314e4aed66f6";
    
    if(sort != "distance" || sort != "quality"){
        sort = "distance";
    }
    let lat = "" + parseFloat(latitude).toFixed(4);
    let lon = "" + parseFloat(longitude).toFixed(4);
    // Build the query URL for Hiking Project API
    let queryURL = "https://www.hikingproject.com/data/get-trails?lat=" + lat + "&lon=" + lon + "&maxDistance=" + distance + "&maxResults=" + results + "&sort=" + sort + "&minStars=" + rating + "&key=" + apiKey;
    
    // send asynchronous request
    const request = await fetch(queryURL);
    const data = await request.json();
    return data;
}
    

  
    



