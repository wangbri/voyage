var Schedule = require('./Schedule.js');
const express = require('express');
const path = require('path');
const yelp = require('yelp-fusion');

const app = express()
  .use(express.static(path.join(__dirname, 'client/build')))
  // .set('views', path.join(__dirname, 'views'))
  // .get('/', (req, res) => res.redirect('aboutus.html'))
  // .get('/api/hello', (req, res) => {
  //   res.send({ express: 'Hello From Express' });
  // });

// app.use('/static', express.static(path.join(__dirname, 'client/public')));
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;

// app.listen(port, () => console.log(`Listening on port ${port}`));

var server = require('http').Server(app);
var io = require('socket.io')(server);

app.listen(port);

var yelpApiKey = "NEn7XfiaTVpyx6BHgI2qK1jS06buyf3YX2f_DH_0QhzdaoNWAJgWgO-D9OuwEK6quEpDTyTX4brSUQYZnfe5BEf4PEtdRQsfyB1o_LvaNY3EetwavPSMesUpkVzTW3Yx";
const client = yelp.client(yelpApiKey);

var location;
var price;
var startTime;
var endTime;
var transit;
var fastSchedules;

// all schedules
var savedSchedules = [];

function yelpQuery(data, price) {
	return client.search({
		term: data,
		location: location,
		price: price
	}).then(response => {
		var data = [];
		var length = 5;

		if (response.jsonBody.businesses.length < 10) {
			length = response.jsonBody.businesses.length;
		}

		for (var i = 0; i < length; i++) {
			var business = response.jsonBody.businesses[i];

			var businessLocation = business.location;

			var name = business.name;	
			var location = businessLocation.address1 + ", " + businessLocation.city + ", " + businessLocation.state;
			var image = business.image_url;
			var link = business.url;
			var category = business.categories[0].title;
			var price = business.price;
			var rating = business.rating;

			var point = {
				name: name,
				location: location,
				image: image,
				link: link,
				category: category,
				price: price,
				rating: rating
			}

			console.log("in yelp: " + point.name);
			console.log("in yelp: " + point.category);

			data.push(point);
		}

		// io.emit('yelp' + type, data);
		return data;
	}).catch(e => {
	  console.log(e);
	});
}

io.on('connection', function(socket) {
	socket.on('yelp', function(data) {
		console.log(data);

		// var location;
		// var sessionLocation = sessionStorage.getItem("location");

		var priceString = "";
		var prices = [];

		if (location == "" || location == undefined) {
			location = "austin, tx";
		}

		if (price != undefined) {
			console.log("price " + price);
			var maxPrice = price.match(/\$/g).length;

			for (var i = 1; i <= maxPrice; i++) {
				priceString += i + ",";
			}

			priceString = priceString.slice(0, -1);

			console.log("price " + priceString);

			// yelpQuery(data, priceString);
			prices.push(priceString);
		}

		prices.push("");

		var totalQueries = [];
		
		let promises = prices.map((price, index) => {
  		var queries = yelpQuery(data, price);
  		return queries;
  	});

  	Promise.all(promises)
  	.then(results => {
  		for (var i = 0; i < results.length; i++) {
  			totalQueries.push(results[i]);
  		}
  		console.log("here " + totalQueries);
  		io.emit("yelp", totalQueries);
		});
	})

	socket.on('input', function(data) {
		location = data.location;
		price = data.price;
		startTime = data.start;
		endTime = data.end;
		transit = data.transit;

		console.log(data);
	})

	socket.on('remove', function(data) {
		io.emit('remove', data);
	})

	socket.on('add', function(data) {
		io.emit('add', data);
	})

	socket.on('route', function(data) {
		io.emit('route', data);
	})

	socket.on('smallest', function(data) {
		io.emit('smallest', fastSchedules);
	})

	socket.on('doneGenerating', function() {
		io.emit('doneGenerating', " ");
	})

	socket.on('saveSchedule', function(data) {
		// console.log("generated room at /" + data);

		// app.get('/room/' + data, function(req , res){
		//   res.render('room: ' + data);
		// });
		console.log("saved schedule " + data);

		var code = ""; //foobar
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		for (var i = 0; i < 5; i++)
		  code += possible.charAt(Math.floor(Math.random() * possible.length));

		savedSchedules[code] = data;
		io.emit('code', code);
	})

	socket.on('getSchedule', function(data) {
		console.log("emitting saved schedule " + savedSchedules[data]);
		console.log(savedSchedules);

		io.emit('getSchedule', savedSchedules[data]);
	})

	socket.on('schedule', function(data){
		console.log("in schedule: " + data[0].price);

		var schedules = []; //the different list 

		console.log("start end time");
    	console.log(startTime);
	    console.log(endTime);



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
			        //console.log(currentSched);
		    	}
				
			}
		}


		console.log(schedules.length);

    	let promises = schedules.map((schedule, index) => {
    		var time = schedule.calculateTime(transit);
    		console.log(time);

    		return time;
    	});

    	Promise.all(promises)
    	.then(results => {

    		var starting = parseInt(startTime, 10);
	    	var ending = parseInt(endTime, 10);

    		Array.prototype.contains = function(obj) {
    			var i = this.length;
			    while (i--) {
			        if (this[i] === obj) {
			            return true;
			        }
			    }
			    return false;
			}


    		var min;
    		var minIndex;
    		var startIndex;
    		var secondMin;
		    var thirdMin;
		    var secondMinIndex;
		    var thirdMinIndex;
    		var filteredIndex = [];

    		var smallest = {
    			smallestScheduleList: null,
    			smallestTime: null,
    			secondScheduleList: null,
    			secondTime: null,
    			thirdScheduleList: null,
    			thirdTime: null,
    			valid: true
    		}



    		var filtered = results.filter(function(value, index, arr){
    			// console.log(value);
    			// console.log(index);
    			// console.log(((value/3600)+1) + starting);
    			// console.log(ending);
    			var needFilter = (((value/3600)+1) + starting) > ending;
    			if(needFilter){
    				filteredIndex.push(index);
    			}
    			 
    			return needFilter;
			});

			// console.log("Filtered");
			// console.log(filtered);
			// console.log(filteredIndex);


			if(results.length != filtered.length){		

				for(var j = 0; j < results.length; j++){
	    			if(!filteredIndex.contains(j)){
		    			min = results[j];
		    			minIndex = j;
		    			startIndex = j+1;
		    			break;
		    		}
	    		}

	    		min = results[0];
	    		minIndex = 0;

	    		if(results.length >= 3){
		    		secondMin = min;
		    		thirdMin = min;
		    		secondMinIndex = minIndex;
		    		thirdMinIndex = minIndex;
		    		//console.log(results);
		    		//results.sort();

		    		for (var i = startIndex; i < results.length; i++) {
		    			var time = results[i];
		    			console.log(time);

		    			// if(((time/3600)+1) + starting > ending ){
		    			// 	console.log("Need filtering");
		    			// 	continue;
		    			// }
		    			
		    			if(filteredIndex.contains(j)){
		    				continue;
		    			}

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

		    	smallest.smallestScheduleList = schedules[minIndex].getSpecificSchedule();
    			smallest.smallestTime = min;
    			smallest.secondScheduleList = schedules[secondMinIndex].getSpecificSchedule();
    			smallest.secondTime = secondMin;
    			smallest.thirdScheduleList = schedules[thirdMinIndex].getSpecificSchedule();
    			smallest.thirdTime = thirdMin;
		    } else {
		    	smallest.valid = false;

		    }

		    //console.log(smallest.valid);



    		// //TODO: Order the schedules
    		// var smallest = {
    		// 	smallestScheduleList: schedules[minIndex].getSpecificSchedule(),
    		// 	smallestTime: min,
    		// 	secondScheduleList: schedules[secondMinIndex].getSpecificSchedule(),
    		// 	secondTime: secondMin,
    		// 	thirdScheduleList: schedules[thirdMinIndex].getSpecificSchedule(),
    		// 	thirdTime: thirdMin,
    		// 	valid: valid
    		// }




    		// console.log("emitting schedule");
    		// console.log(smallest.smallestScheduleList);
    		// console.log(smallest.smallestTime);
    		// console.log(smallest.secondScheduleList);
    		// console.log(smallest.secondTime);
    		// console.log(smallest.thirdScheduleList);
    		// console.log(smallest.thirdTime);

    		fastSchedules = smallest;

    		io.emit('schedule', data);
    	})
    	.catch(e => {
    		console.log(e);
    	})
	})
})

io.listen(8000);