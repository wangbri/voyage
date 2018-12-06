class Schedule {	


	//need to keep order so separate array for places and duration spent at that place
	constructor(start, end){
		
		//uration = [];
		this.placesInput = [];
		this.time = 0;
		this.start = start; //name of the starting location 
		this.end = end; //name of the final location
	}

	

	addPlace(place){
		this.placesInput = place;
		console.log("New schedule");
		this.calculateTime();
	}


	calculateTime(){
		var directionsService = new window.google.maps.DirectionsService();
		var waypts = [];

		  // use waypoints for intermediate destinations
		  for (var i = 1; i < this.placesInput.length - 1; i++) {
		    waypts.push({
		      location: this.placesInput[i],
		      stopover: true
		    });
		  }

		  var directionsParams = {
		    origin: this.start,
		    destination: this.end,
		    travelMode: 'DRIVING'
		  }

		  if (waypts.length > 0) {
		    directionsParams['waypoints'] = waypts;
		    directionsParams['optimizeWaypoints'] = true;
		  }

		  return new Promise((resolve, reject) => {
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
			  }
			);

		  //console.log(this.time);
	}

	get totalTime(){
		return this.time;
	}

	// get numPlaces(){
	// 	return places.length;	
	// }

	// get placeIndex(index){
	// 	return this.places[index];
	// }

	// get durationIndex(index){
	// 	return this.duration[index];
	// }

	// get totalDuration(){
	// 	var sum = 0;
	// 	for(var i = 0; i < this.places.length; i ++){

	// 	}
	// 	return sum;
	// }
	
}

export default Schedule;