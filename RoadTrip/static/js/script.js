var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;

function initialize() {
  directionsDisplay = new google.maps.DirectionsRenderer();
  var mapOptions = {
    zoom: 5,
    center: new google.maps.LatLng(41.850033, -87.6500523)
  };
  var map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);
  directionsDisplay.setMap(map);
  directionsDisplay.setPanel(document.getElementById('directions-panel'));

  var control = document.getElementById('control');
  control.style.display = 'block';
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(control);
}


function calcRoute() {
  var start = document.getElementById('start').value;
  var end = document.getElementById('end').value;

// NEED TO CLEAN THIS UP TO USE MULTIPLE WAYPOINTS
  var waypt1 = document.getElementById('waypoint1').value;
  var waypt2 = document.getElementById('waypoint2').value;
  var waypts = []
  if (waypt1) {
    waypts.push({
      location:waypt1,
      stopover:true});  
  }
  if (waypt2) {
    waypts.push({
      location:waypt2,
      stopover:true});  
  }
//

  var request = {
      origin: start,
      destination: end,
      waypoints: waypts,
      optimizeWaypoints: true,
      travelMode: google.maps.TravelMode.DRIVING
  };

  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
    }
  });
}

google.maps.event.addDomListener(window, 'load', initialize);
