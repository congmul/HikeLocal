// Global Variables
var gpsLoc = {
    lat: 0,
    lon: 0
}
var maxDistance = 0;
var maxResults = 0;
var sortBy = "";
var trails;




$(document).ready(function () {
    // Capture Device Location, user will be prompted at page load to allow or block request
    navigator.geolocation.getCurrentPosition(deviceLocation);
      
    
    $("#find-trails-btn").on("click", function() {
        $("#hiker-icon").removeClass();
        $("#hiker-icon").addClass("fas fa-spinner fa-spin");
        
        // Capture User Input
        
        maxDistance = $("#search-radius").val();
        maxResults = 50   
        sortBy = $("input[name='sort-by']:checked").val();
    
        
        // Find Trails by sending a query to the Hiking Project API
        queryHikingProject(gpsLoc, maxDistance, maxResults, sortBy);  // function defined in scott.js
        
        // Wait 2 seconds to get results of Hiking Project API Query
        setTimeout(function() {
            $("#hiker-icon").removeClass();
            $("#hiker-icon").addClass("fas fa-hiking");
            
            // Do something with the array of returned trails
            console.log(trails);
       }, 2000);
       
    });
    
});


// Capture device latitude and longitude data
function deviceLocation(position) {
    gpsLoc.lat = position.coords.latitude.toFixed(4);
    gpsLoc.lon = position.coords.longitude.toFixed(4);
}



