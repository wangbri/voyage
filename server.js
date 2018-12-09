var Schedule = require('./Schedule.js');
const express = require('express');
const path = require('path');
const yelp = require('yelp-fusion');

const app = express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  // .get('/map', (req, res) => res.redirect('map.html'))
  // .get('/api/hello', (req, res) => {
  //   res.send({ express: 'Hello From Express' });
  // });

const port = process.env.PORT || 5000;

// app.listen(port, () => console.log(`Listening on port ${port}`));

var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(port);

var yelpApiKey = "NEn7XfiaTVpyx6BHgI2qK1jS06buyf3YX2f_DH_0QhzdaoNWAJgWgO-D9OuwEK6quEpDTyTX4brSUQYZnfe5BEf4PEtdRQsfyB1o_LvaNY3EetwavPSMesUpkVzTW3Yx";
const client = yelp.client(yelpApiKey);

io.on('connection', function(socket) {
	socket.on('yelp', function(data) {
		console.log(data);

		client.search({
			term: data,
			location: 'austin, tx'
		}).then(response => {
			var business = response.jsonBody.businesses[0];

			var name = business.name;	
			var location = business.location.address1;
			var image = business.image_url;
			var link = business.url;

			var data = {
				name: name,
				location: location,
				image: image,
				link: link
			}

			console.log(location);
			console.log(name);
			console.log(link);

			io.emit('yelp', data);
		}).catch(e => {
		  console.log(e);
		});
	})

	socket.on('route', function(data) {
		io.emit('route', data);
	})

	socket.on('schedule', function(data){
		console.log(data);

		var schedules = []; //the different list 

		for(var a = 0; a < data.length; a++){
			for(var b = 0; b < data.length; b++){
				if(a !== b){
					var currentSched = new Schedule();
					currentSched.addStart(data[a]);
					currentSched.addEnd(data[b]);
				

					//generate a list of the intermediate places 
			        var addresses  = [];
			        for(var c = 0; c < data.length; c++){
			        	if((data[a] != data[c]) && (data[b] != data[c])){
			        		addresses.push(data[c]);
			        	}
			        }

			        currentSched.addPlace(addresses);
			        schedules.push(currentSched);
		    	}
				
			}
		}

		// var min = 500000; //schedules[0].calculateTime();
		// var minIndex = 0;
		// for(var i = 1; i < schedules.length; i++){
  //      		//schedules[i].calculateTime()
  //       	var curTime = schedules[i].calculateTime();
  //       	//console.log(curTime);
  //       	if(curTime < min){
  //       		min = curTime;
  //       		minIndex = i;
  //       	}
  //   	}

    	let promises = schedules.map((schedule, index) => {
    		var time = schedule.calculateTime();
    		//console.log(time);

    		return time;
    	});

    	Promise.all(promises)
    	.then(results => {
    		var min = results[0];
    		var minIndex = 0;

    		if(results.length > 3){
	    		var secondMin = results[1];
	    		var thirdMin = results[2];
	    		var secondMinIndex = 1;
	    		var thirdMinIndex = 2;
	    		//console.log(results);
	    		//results.sort();

	    		for (var i = 0; i < results.length; i++) {
	    			var time = results[i];
	    			console.log(time);

	    			if (time < min) {
	    				thirdMin = secondMin;
	    				thirdMinIndex = secondMinIndex;
	    				secondMin = min;
	    				secondMinIndex = minIndex;
	    				min = time;
	    				minIndex = i;
	    			 } else if(time < secondMin){
	    				thirdMin = secondMin;
	    				thirdMinIndex = secondMinIndex;
	    				secondMin = time;
	    				secondMinIndex = i;
	    			} else if(time < thirdMin){
	    				thirdMin = time;
	    				thirdMinIndex = i;
	    			}
	    		}
	    	}



    		//TODO: Order the schedules
    		var smallest = {
    			smallestScheduleList: schedules[minIndex].getSpecificSchedule(),
    			smallestTime: min,
    			secondScheduleList: schedules[secondMinIndex].getSpecificSchedule(),
    			secondTime: secondMin,
    			thirdScheduleList: schedules[thirdMinIndex].getSpecificSchedule(),
    			thirdTime: thirdMin
    		}

    		//console.log("emitting schedule");
    		io.emit('schedule', smallest);
    	})
    	.catch(e => {
    		console.log(e);
    	})
	})
})

io.listen(8000);