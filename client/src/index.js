import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
// import ScrollMarkers from './Marker';
// import Form from './Forms';

ReactDOM.render((
	<BrowserRouter>
		<App />
	</BrowserRouter>
), document.getElementById('react'));


// var markerData = document.getElementById('data');
// console.log(markerData.title);

// ReactDOM.render(<Form/>, document.getElementById('form'));
// ReactDOM.render(<ScrollMarkers/>, document.getElementById('scroll'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();