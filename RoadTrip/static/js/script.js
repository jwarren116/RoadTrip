var infowindow = new google.maps.InfoWindow();
var map;
var routeBoxer;
var service;
var delay = 250;

function initialize() {
  directionsDisplay = new google.maps.DirectionsRenderer();
  var mapOptions = {
    zoom: 4,
    center: new google.maps.LatLng(39, -98),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
  };
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  service = new google.maps.places.PlacesService(map);

  routeBoxer = new RouteBoxer();

  directionService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer({ map: map })
  
  directionsDisplay.setMap(map);
  directionsDisplay.setPanel(document.getElementById('directions-panel'));
}

function calcRoute() {
  var start = document.getElementById('start').value;
  var end = document.getElementById('end').value;

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

  var request = {
    origin: start,
    destination: end,
    waypoints: waypts,
    optimizeWaypoints: true,
    travelMode: google.maps.TravelMode.DRIVING
  };

  directionService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);

      // Build boxes around route
      var path = response.routes[0].overview_path;
      var boxes = routeBoxer.box(path, 3); // distance in km from route
      var searchIndex = boxes.length - 1;
      queryPlaces(boxes, searchIndex);
    } else {
      alert("Directions query failed: " + status);
    }
  });
}

function queryPlaces(boxes, searchIndex) {
  // delay calls to Places API to prevent going over query limit (10/sec)
  var bounds = boxes[searchIndex];
  findPlaces(bounds);
  findPlacesByText(bounds);
  if (searchIndex > 0) {
    searchIndex--;
    setTimeout(queryPlaces, delay, boxes, searchIndex);
  }
}

function findPlaces(bounds) {
  var selectedTypes = []; 

  var inputElements = document.getElementsByClassName('placeOption');
  
  for (var i=0; inputElements[i]; i++) {
    if (inputElements[i].checked) {
     selectedTypes.push(inputElements[i].value)
    }
  }

  var request = {
    bounds: bounds,
    types: selectedTypes
  };

  if (selectedTypes.length > 0) {
    service.radarSearch(request, function(results, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          createMarker(results[i]);
        }
      } else if (status == google.maps.places.PlacesServiceStatus.OVER_QUERY_LIMIT) {
        delay++;
        console.log('new delay: ' + delay);
        setTimeout(findPlaces, delay, bounds);
      } else {
        console.log('Error: ' + status);
      }
    });
  }
}

function findPlacesByText(bounds) {
  var selectedTypes = ''; 

  var inputElements = document.getElementsByClassName('textOption');
  
  for (var i=0; inputElements[i]; i++) {
    if (inputElements[i].checked) {
     selectedTypes += inputElements[i].value + ', '
    }
  }

  var request = {
    bounds: bounds,
    query: selectedTypes
  };

  if (selectedTypes.length > 0) {
    service.textSearch(request, function(results, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          createMarker(results[i]);
        }
      } else if (status == google.maps.places.PlacesServiceStatus.OVER_QUERY_LIMIT) {
        delay++;
        console.log('new delay: ' + delay);
        findPlacesByText(bounds);
      } else {
        console.log('Error: ' + status);
      }
    });
  }
}

function createMarker(place) {
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  var request = {
    reference: place.reference
  };

  google.maps.event.addListener(marker,'click',function(){
    service.getDetails(request, function(place, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        var contentStr = '<h5>' + place.name + '</h5><p>' + place.formatted_address;
        if (!!place.formatted_phone_number) contentStr += '<br />' + place.formatted_phone_number;
        if (!!place.website) contentStr += '<br /><a target="_blank" href="' + place.website + '">' + place.website + '</a>';
        contentStr += '<br />' + place.types + '</p>';
        infowindow.setContent(contentStr);
        infowindow.open(map,marker);
      } else {
        var contentStr = "<h5>No Result, status=" + status + "</h5>";
        infowindow.setContent(contentStr);
        infowindow.open(map,marker);
      }
    });
  });
}

google.maps.event.addDomListener(window, 'load', initialize);
