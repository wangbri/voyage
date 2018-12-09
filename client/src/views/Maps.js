import React, { Component } from 'react';
import { codeAddress, calculateAndDisplayRoute } from '../api/googleMaps.js';
import Forms from '../components/Forms';
import ScrollMarkers from '../components/Marker';

class Maps extends Component {
  constructor(props) {
    super(props);

    this.state = {
      map: null,
      geocoder: null,
      directionsService: null,
      directionsDisplay: null,
      markers: []
    }

    this.addMarker = this.addMarker.bind(this);
    this.displayRoute = this.displayRoute.bind(this);
    this.removeMarker = this.removeMarker.bind(this);
    this.setMapOnAll = this.setMapOnAll(this);
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
    // var geocoder = new window.google.maps.Geocoder();
    // var directionsService = new window.google.maps.DirectionsService();
    // var directionsDisplay = new window.google.maps.DirectionsRenderer();

    // this.setState({
    //   geocoder: geocoder,
    //   directionsService: directionsService,
    //   directionsDisplay: directionsDisplay
    // });
  }

  setMapOnAll() {
    var markers = this.state.markers;

    for (var i = 0; i < markers.length; i++) {
      markers[i].marker.setMap(this.state.map);
    }
  }

  addMarker(input) {
    codeAddress(input, this.state.geocoder, this.state.map)
    .then(marker => {
      var markers = this.state.markers;
      // markers.push(input);
      markers.push({
        marker: marker,
        input: input
      });

      this.setState({
        markers: markers
      });

      var infowindow = new window.google.maps.InfoWindow({
        content: '<div class="card" style="width: 18rem;"><img class="card-img-top" src=' + input['image'] + 
        '><div class="card-body"><h5 class="card-title">' + input['name'] + 
        '</h5><p class="card-text">Some quick example text to build on the card title and make up the bulk of the card content.</p><a href=' + input['link'] + 
        ' class="btn btn-primary">Yelp it</a>&nbsp;<button class="btn btn-danger">Remove</button></div></div>',   
        maxWidth: 230
      });

      // WHY does it have to be an arrow function to get scope??
      marker.addListener('click', (e) => {
        infowindow.open(this.state.map, marker);
      });

      console.log("marker input " + input['name']);
      console.log(markers);
      // console.log("addMarker called: " + markers[0].marker.title);
    });

    // console.log(sessionStorage.getItem("myCat"));
    // this.ScrollMarkers.handleMarkerChange();
  }

  removeMarker(position) {
    var markers = this.state.markers;

    for (var i = 0; i < markers.length; i++) {
      if (markers[i].marker.position == position) {
        markers[i].marker.setMap(null);
        markers.splice(i, 1);
      }
    }

    console.log(markers);
    this.setState({ markers: markers });
    // this.setMapOnAll();
  }

  displayRoute(input) {
    calculateAndDisplayRoute(input, this.state.directionsService, this.state.directionsDisplay);
  }

  render() {
    return (
      <div>
        <div id="map" style={{height: 550}}></div>
        <Forms addMarker={this.addMarker} displayRoute={this.displayRoute}/>
        <div id="scroll" style={{height: 300}}>
          <ScrollMarkers ref={instance => {this.ScrollMarkers = instance;}} markers={this.state.markers}/>
        </div>
      </div>
    );
  }
}

export default Maps;