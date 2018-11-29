import React, { Component } from 'react';
import Forms from './Forms';
import { codeAddress, calculateAndDisplayRoute } from './api/googleMaps.js';
import ScrollMarkers from './Marker';

class GoogleMaps extends Component {
  constructor(props) {
    super(props);

    this.state = {
      map: null,
      geocoder: null,
      directionsService: null,
      directionsDisplay: null
    }

    this.addMarker = this.addMarker.bind(this);
    this.displayRoute = this.displayRoute.bind(this);
  }

  componentDidMount() {
    var map = new window.google.maps.Map(document.getElementById('map'), {
      zoom: 8,
      center: {
        lat: -34.397,
        lng: 150.644
      }
    });

    var geocoder = new window.google.maps.Geocoder();
    var directionsService = new window.google.maps.DirectionsService();
    var directionsDisplay = new window.google.maps.DirectionsRenderer();
    directionsDisplay.setMap(map);

    this.setState({
      map: map,
      geocoder: geocoder,
      directionsService: directionsService,
      directionsDisplay: directionsDisplay
    });
  }

  componentWillMount() {
    var geocoder = new window.google.maps.Geocoder();
    var directionsService = new window.google.maps.DirectionsService();
    var directionsDisplay = new window.google.maps.DirectionsRenderer();

    this.setState({
      geocoder: geocoder,
      directionsService: directionsService,
      directionsDisplay: directionsDisplay
    });
  }

  addMarker(input) {
    codeAddress(input, this.state.geocoder, this.state.map);
  }

  displayRoute(input) {
    calculateAndDisplayRoute(input, this.state.directionsService, this.state.directionsDisplay);
  }

  render() {
    return (
      <div>
        <div id="map" style={{height: 550}}></div>
        <Forms addMarker={this.addMarker} displayRoute={this.displayRoute}/>
        <div id="scroll" style={{height: 200}}>
          <ScrollMarkers />
        </div>
      </div>
    );
  }
}

export default GoogleMaps;