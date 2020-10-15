function queryHikingProject(obj, distance, results, sort) {
    const apiKey = "200940875-36c4754b6780070076ba314e4aed66f6";
    let lat = "" + obj.lat;
    let lon = "" + obj.lon;

    let queryURL = "https://www.hikingproject.com/data/get-trails?lat=" + lat + "&lon=" + lon + "&maxDistance=" + distance + "&maxResults=" + results + "&sort=" + sort + "&key=" + apiKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
       trails = response;
    });
    
}