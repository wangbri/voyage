import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8000');

var locationsMarkers = []; // keep track of each of the markers from user
var locations = [];
// var event = new Event('build');

// locationsMarkers.addEventListener('build', function(e) {

// });

export function sendRoute(input) {
  socket.emit('route', input);
}

export function receiveRoute(cb) {
  socket.on('route', data => cb(null, data));
}

export function createSchedule() {
  socket.emit('schedule', locations);
}

export function receiveSchedule(cb) {
  socket.on('schedule', data => cb(null, data));
}


// draw the different directions  
export function calculateAndDisplayRoute(addresses, directionsService, directionsDisplay) {
  var startAddress = addresses[0];
  var endAddress = addresses[addresses.length - 1];
  var waypts = [];

  // use waypoints for intermediate destinations
  for (var i = 1; i < addresses.length - 1; i++) {
    waypts.push({
      location: addresses[i],
      stopover: true
    });
  }

  var directionsParams = {
    origin: startAddress,
    destination: endAddress,
    travelMode: 'DRIVING'
  }

  if (waypts.length > 0) {
    directionsParams['waypoints'] = waypts;
    directionsParams['optimizeWaypoints'] = true;
  }

  directionsService.route(directionsParams, function(response, status) {
    if (status === 'OK') {
      directionsDisplay.setDirections(response);
    } else {
      alert('Directions request failed due to the following reason: ' + status);
    }
  });
}

// uses geoencoding api to generate markers
export function codeAddress(input, geocoder, map) {
  var name;
  var address;
  var image;
  var link;

  if (input != null) {
    name = input['name'];
    address = input['location'];
    image = input['image'];
    link = input['link'];
  }

  geocoder.geocode({'address': address}, function(results, status) {
    if (status == 'OK') {
      map.setCenter(results[0].geometry.location);

      if (input != null) {
        map.setZoom(16);
      }

      var marker = new window.google.maps.Marker({
        map: map,
        position: results[0].geometry.location,
        title: results[0].formatted_address
      });

      locationsMarkers.push({
        key: name,
        value: marker
      });

      locations.push(name);

      /******************************check here**********************/



      if (name == null) {
        name = results[0].formatted_address;
      }

      var infowindow = new window.google.maps.InfoWindow({
        content: '<div class="card" style="width: 18rem;"><img class="card-img-top" src=' + image + 
        '><div class="card-body"><h5 class="card-title">' + name + 
        '</h5><p class="card-text">Some quick example text to build on the card title and make up the bulk of the card content.</p><a href=' + link + 
        ' class="btn btn-primary">Yelp it</a>&nbsp;<button class="btn btn-danger" onclick="removeMarker(\'' + marker['position'] + 
        '\')">Remove</button></div></div>',   
        maxWidth: 230
      });

      marker.addListener('click', function() {
        infowindow.open(map, marker);
      });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }

    // markers.push(marker);
  });
}

export { locationsMarkers };