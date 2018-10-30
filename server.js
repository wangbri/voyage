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

	// socket.on('addMarker', function(data) {
	// 	socket.emit('sendMarker', )
	// })
})