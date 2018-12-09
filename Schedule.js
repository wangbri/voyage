var Schedule = (function (){	

	var placesInput = [];
	var time = 0;
	var start;
	var end;
	// //need to keep order so separate array for places and duration spent at that place
	// constructor(start, end){
		
	// 	//uration = [];
	// 	this.placesInput = [];
	// 	this.time = 0;
	// 	this.start = start; //name of the starting location 
	// 	this.end = end; //name of the final location
	// }


	return{
		addStart: function(start){
			this.start = start;
		},

		addEnd: function(end){
			this.end = end;
		},

		addPlace: function(place) {
			this.placesInput = place;
			//console.log("New schedule");
			this.calculateTime();
		},


		calculateTime: function(transportation){
			//var directionsService = new window.google.maps.DirectionsService();
			const googleMapsClient = require('@google/maps').createClient({
  				key: 'AIzaSyDLG4cmhAVyeZ8ni6geScmGt3azChgMwR0',
  				Promise: Promise
			});

			var waypts = [];
			var sum = 0;

			  // use waypoints for intermediate destinations
			  for (var i = 0; i < this.placesInput.length; i++) {
			    waypts.push({
			      location: this.placesInput[i],
			      stopover: true
			    });
			  }

			  // googleMapsClient.geocode({
			  	return googleMapsClient.directions({
			      	origin: this.start,
			      	destination: this.end,
			      	mode: transportation,
			      	waypoints: waypts,
			      	optimize: true,
			    })
		    	.asPromise()
		    	.then((response) => {
				    var route = response.json.routes[0];
				    for (var i = 0; i < route.legs.length; i++) {
				    	sum += route.legs[i].duration.value;
				    }
				    //console.log(sum);
				    return sum;
					//resolve(this.time);
				 }) //function(err){
		    	.catch((err) => {
				    //alert('Directions request failed due to the following reason: ' + status);
				    console.log("Problem with directions server");
				});
			  //})

			  /*var directionsParams = {
			    origin: this.start,
			    destination: this.end,
			    travelMode: 'DRIVING'
			  }

			  if (waypts.length > 0) {
			    directionsParams['waypoints'] = waypts;
			    directionsParams['optimizeWaypoints'] = true;
			  }

			  	//return new Promise((resolve, reject) => {
					directionsService.route(directionsParams, function(response, status) {
					    if (status === 'OK') {
					    	var route = response.routes[0];
					    	var sum = 0;
					    	for (var i = 0; i < route.legs.length; i++) {
					    		sum += route.legs[i].duration.value;
					    	}
					    	
					    	this.time = sum;
						  	resolve(this.time);
					    } else {
					      alert('Directions request failed due to the following reason: ' + status);
					    }
				  	});
				//});*/

				// return sum;

			  //console.log(this.time);
		},

		getTotalTime: function(){
			return this.time;
		},

		//going to have to refine this
		getSpecificSchedule: function(){
			var places = [];
			places.push(this.start);
			for (var i = 0; i < this.placesInput.length; i++) {
				places.push(this.placesInput[i])
			}
			places.push(this.end);
			return places;
		}

	}

	
	
})

module.exports = Schedule;
// module.exports = {
// 	Schedule: Schedule;
// }
