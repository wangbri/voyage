import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8000');

export function sendRoute(input) {
  socket.emit('route', input);
}

export function receiveRoute(cb) {
  socket.on('route', data => cb(null, data));
}

export function createSchedule(data) {
  socket.emit('schedule', data);
}

export function receiveSchedule(cb) {
  socket.on('schedule', data => cb(null, data));
}

export function receiveRemove(cb) {
  socket.on('remove', data => cb(null, data));
}

export function receiveAdd(cb) {
  socket.on('add', data => cb(null, data));
}

export function receiveSmallest(cb) {
  socket.on('smallest', data => cb(null,data));
}

export function getSmallest(data) {
  socket.emit('smallest', data);
}

export function displaySched(cb) {
  socket.on('doneGenerating', data => cb(null,data));
}

export function doneGenerating() {
  socket.emit('doneGenerating');
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
  var category;
  var price;
  var rating;

  if (input != null) {
    name = input['name'];
    address = input['location'];
    image = input['image'];
    link = input['link'];
    category = input['category'];
    price = input['price'];
    rating = input['rating'];
  }

  if (price == undefined) {
    price = "n/a"
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
          title: results[0].formatted_address,
          icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
        });

        if (name == null) {
          name = results[0].formatted_address;
        }

        var tempMarker = {
          marker: marker,
          input: []
        };

        tempMarker.input = {
          name: name,
          image: image,
          link: link,
          location: address,
          category: category,
          price: price,
          rating: rating
        }

        resolve(tempMarker);
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
        reject("Geocode was not successful");
      }
    });
  });
}