function initialize() {

	$('log').innerHTML = "loading ...";

	if (GBrowserIsCompatible()) {
		var wp = new Array ();
		wp[0] = new GLatLng(32.742149,119.337218);
		wp[1] = new GLatLng(32.735347,119.328485);
		directions = new GDirections();
		directions.loadFromWaypoints(wp);  

		GEvent.addListener(directions, "load", function() {
				$('log').innerHTML = directions.getDuration ().seconds + " seconds from 32.74,119.33 to 32.73,119.32 (driving)";
				});
	}
	else {
	  alert("Sorry, the Google Maps API is not compatible with this browser");
	}

}