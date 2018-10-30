import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import App from './App';
import ScrollMarkers from './Marker';
import * as serviceWorker from './serviceWorker';
// import 'bootstrap/dist/css/bootstrap.min.css';

// var markerData = document.getElementById('data');
// console.log(markerData.title);

ReactDOM.render(<ScrollMarkers/>, document.getElementById('scroll'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();