import openSocket from 'socket.io-client';
import Schedule from '../classes/Schedule';
const socket = openSocket('http://localhost:8000');

var locationsMarkers = []; // keep track of each of the markers from user
// var event = new Event('build');

// locationsMarkers.addEventListener('build', function(e) {

// });

export function sendRoute(input) {
  socket.emit('route', input);
}

export function receiveRoute(cb) {
  socket.on('route', data => cb(null, data));
}

var schedules = []; //the different list 
var times = [];

function findShortestSchedule(){
  return new Promise(function(resolve) {
    for(var i = 0; i < schedules.length; i++){
      //schedules[i].calculateTime()
      getScheduleTime(schedules[i]);
    }
  });   
}

function getScheduleTime(schedule) {
  schedule.calculateTime().then(function(data) {
  });
}

export function createSchedule(){
  for(var startKey in locationsMarkers){
    //console.log(startKey, locationsMarkers[startKey]);
    //console.log(locationsMarkers[startKey].key);
    for(var endKey in locationsMarkers){
      if(locationsMarkers[startKey].key != locationsMarkers[endKey].key){
        var currentSched = new Schedule(locationsMarkers[startKey].key, locationsMarkers[endKey].key);
        

        var addresses  = [];
        for (var middleKey in locationsMarkers){
          if((locationsMarkers[middleKey].key != locationsMarkers[startKey].key) && (locationsMarkers[middleKey].key != locationsMarkers[endKey].key)){
            addresses.push(locationsMarkers[middleKey].key);
          }
        }
      currentSched.addPlace(addresses);
      schedules.push(currentSched); // create schedule 

      }
    }
   }


  findShortestSchedule().then(function() {
    console.log(times);
  });
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

  return new Promise(function(resolve, reject) {
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


        if (name == null) {
          name = results[0].formatted_address;
        }

        // var infowindow = new window.google.maps.InfoWindow({
        //   content: '<div class="card" style="width: 18rem;"><img class="card-img-top" src=' + image + 
        //   '><div class="card-body"><h5 class="card-title">' + name + 
        //   '</h5><p class="card-text">Some quick example text to build on the card title and make up the bulk of the card content.</p><a href=' + link + 
        //   ' class="btn btn-primary">Yelp it</a>&nbsp;<button class="btn btn-danger" onclick="removeMarker(\'' + marker['position'] + 
        //   '\')">Remove</button></div></div>',   
        //   maxWidth: 230
        // });

        // marker.addListener('click', function() {
        //   infowindow.open(map, marker);
        // });

        resolve(marker);
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
        reject("Geocode was not successful");
      }

      // markers.push(marker);
    });
  });
}

export { locationsMarkers };