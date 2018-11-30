class Schedule{	

	//need to keep order so separate array for places and duration spent at that place
	constructor(start, end){
		var places = [];
		var duration = [];
		this.start = start;
		this.end = end;
	}

	addPlace(place, duration){
		this.places.push(place);
		this.duration.push(duration);
	}

	get numPlaces(){
		return places.length;	
	}

	get placeIndex(index){
		return this.places[index];
	}

	get durationIndex(index){
		return this.duration[index];
	}

	get totalDuration(){
		var sum = 0;
		for(var i = 0; i < this.places.length; i ++){

		}
		return sum;
	}
	
}