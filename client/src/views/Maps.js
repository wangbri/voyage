import React, { Component } from 'react';
import { receiveAdd, receiveRemove, codeAddress, calculateAndDisplayRoute, receiveSmallest, getSmallest, receiveSchedule, doneGenerating } from '../api/googleMaps.js';
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
      markers: [],
      tempMarkers: [],
      smallestPlaces: [],
      secondPlaces: [],
      thirdPlaces: []
    }

    this.displayMarkers = this.displayMarkers.bind(this);
    this.setMapOnAll = this.setMapOnAll.bind(this);
    this.displayRoute = this.displayRoute.bind(this);
    this.removeMarker = this.removeMarker.bind(this);
    this.addMarker = this.addMarker.bind(this);
    this.receiveRoute = this.receiveRoute.bind(this);
    this.handleScheduleChange = this.handleScheduleChange.bind(this);
    this.receiveRoute = this.receiveRoute.bind(this);

    // receiveSchedule((err, data) => this.printSchedule(data));

    receiveRemove((err, data) => this.removeMarker(data));
    receiveAdd((err, data) => this.addMarker(data));
    receiveSchedule((err, data) => this.getSchedule(data));
    receiveSmallest((err, data) => this.receiveRoute(data));
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

  setMapOnAll(value) {
    var markers = this.state.markers;
    var tempMarkers = this.state.tempMarkers;

    for (var i = 0; i < markers.length; i++) {
      markers[i].marker.setMap(value);
    }

    for (var i = 0; i < tempMarkers.length; i++) {
      tempMarkers[i].marker.setMap(value);
    }

    this.setState({
      markers: markers,
      tempMarkers: tempMarkers
    })
  }

  createListener(marker, infoWindow) {
    // WHY does it have to be an arrow function to get scope??
    marker.addListener('click', (e) => {
      infoWindow.open(this.state.map, marker);
    });
  }

  displayMarkers(input) {
    console.log(input.length);
    input = input[0].concat(input[1]);

    let promises = input.map((data, index) => {
      var tempMarker = codeAddress(data, this.state.geocoder, this.state.map);
      console.log("displayMarkers called: " + data);

      return tempMarker;
    });

    Promise.all(promises)
    .then(results => {
      
      // clear tempMarkers after each display
      var tempMarkers = this.state.tempMarkers;
      for (var i = 0; i < tempMarkers.length; i++) {
        tempMarkers[i].marker.setMap(null);
      }
      tempMarkers = [];

      for (var i = 0; i < results.length; i++) {
        var tempMarker = results[i];
        // console.log("in displayMarkers: " + tempMarker['marker'].position);
        // console.log("in displayMarkers: " + tempMarker['input'].name);
        // console.log("in displayMarkers: " + tempMarker['input'].location);

        var infoWindow = new window.google.maps.InfoWindow({
          content: '<div class="card" style="width: 18rem;"><img class="card-img-top" src=' + tempMarker['input'].image + 
          '><div class="card-body"><h5 class="card-title">' + tempMarker['input'].name + 
          '</h5><p class="card-text">Some quick example text to build on the card title and make up the bulk of the card content.</p><button onclick="window.open(\'' + tempMarker['input'].link + 
          '\')" class="btn btn-primary">Yelp it</button>&nbsp;<button class="btn btn-danger" onclick="removeMarker(\'' + tempMarker['marker'].position + '\')">Remove</button>&nbsp;<button class="btn btn-success" onclick="addMarker(\'' + tempMarker['marker'].position + '\')">Add</button></div></div>',   
          maxWidth: 230
        });

        // stupid scope stuff
        this.createListener(tempMarker['marker'], infoWindow);
        tempMarkers.push(tempMarker);
      }

      this.setState({
        tempMarkers: tempMarkers
      });
    }).catch(e => {
      console.log(e);
    });

    // console.log(sessionStorage.getItem("myCat"));
    // this.ScrollMarkers.handleMarkerChange();

    this.setMapOnAll(this.state.map);
  }

  addMarker(position) {
    var markers = this.state.markers;
    var tempMarkers = this.state.tempMarkers;

    for (var i = 0; i < tempMarkers.length; i++) {
      if (tempMarkers[i].marker.position == position) {
        var tempMarker = tempMarkers[i];
        var marker = new window.google.maps.Marker({
          map: this.state.map,
          position: tempMarkers[i].marker.position,
          title: tempMarkers[i].marker.title,
        });

        var newMarker = {
          marker: marker,
          input: []
        };

        newMarker.input = {
          name: tempMarker.input.name,
          image: tempMarker.input.image,
          link: tempMarker.input.link,
          location: tempMarker.input.location
        }

        var infoWindow = new window.google.maps.InfoWindow({
          content: '<div class="card" style="width: 18rem;"><img class="card-img-top" src=' + tempMarker['input'].image + 
          '><div class="card-body"><h5 class="card-title">' + tempMarker['input'].name + 
          '</h5><p class="card-text">Some quick example text to build on the card title and make up the bulk of the card content.</p><button onclick="window.open(\'' + tempMarker['input'].link + 
          '\')" class="btn btn-primary">Yelp it</button>&nbsp;<button class="btn btn-danger" onclick="removeMarker(\'' + tempMarker['marker'].position + '\')">Remove</button>&nbsp;<button class="btn btn-success" onclick="addMarker(\'' + tempMarker['marker'].position + '\')">Add</button></div></div>',   
          maxWidth: 230
        });

        this.createListener(newMarker['marker'], infoWindow);
        markers.push(newMarker);
      }
    }

    console.log("length of markers after add: " + markers.length);
    this.setState({ markers: markers });
  }

  removeMarker(position) {
    var markers = this.state.markers;

    for (var i = 0; i < markers.length; i++) {
      if (markers[i].marker.position == position) {
        markers[i].marker.setMap(null);
        markers[i].marker = null;
        markers.splice(i, 1);
      }
    }

    console.log("length of markers after removal: " + markers.length);
    this.setState({ markers: markers });
    // this.setMapOnAll();
  }

  receiveRoute(input) {
    console.log("in receiveRoute");
    console.log(input);
    //console.log(input[0]);

    var smallest = [];
    var secondSmallest = [];
    var thirdSmallest = [];

    if(input.valid){
      for(var i = 0; i < input.smallestScheduleList.length; i++){
        smallest.push(input.smallestScheduleList[i].input.location);
        secondSmallest.push(input.secondScheduleList[i].input.location);
        thirdSmallest.push(input.thirdScheduleList[i].input.location);
      }
    } else{
      alert("No possible schedule found.");
      window.location.href ="./input";
    }

    // this.setState({smallestPlaces : ['2247 Guadalupe St', '3825 Lake Austin Blvd, Austin, Texas 78703', 'East 41st Street, Austin, TX'],
    //             secondPlaces: ['3825 Lake Austin Blvd, Austin, Texas 78703', '2247 Guadalupe St', 'East 41st Street, Austin, TX'],
    //             thirdPlaces: ['2247 Guadalupe St', 'East 41st Street, Austin, TX', '3825 Lake Austin Blvd, Austin, Texas 78703']});

    this.setState({
      smallestPlaces: smallest,
      secondPlaces: secondSmallest,
      thirdPlaces: thirdSmallest
    });

    if(input.valid){
      doneGenerating();
      calculateAndDisplayRoute(this.state.smallestPlaces, this.state.directionsService, this.state.directionsDisplay);
    }

    this.setMapOnAll(null);
  }

  getSchedule(input){
    console.log("in getSchedule");
    console.log(input);
    getSmallest("");
  }

  displayRoute(schedType) {
    //var schedType = this.state.scheduleType;

    var smallest = this.state.smallestPlaces;
    var second = this.state.secondPlaces;
    var third = this.state.thirdPlaces;

    console.log(schedType);

    if(schedType == "smallest"){
      calculateAndDisplayRoute(smallest, this.state.directionsService, this.state.directionsDisplay);
    } else if (schedType  == "second smallest"){
      calculateAndDisplayRoute(second, this.state.directionsService, this.state.directionsDisplay);
    } else{
      calculateAndDisplayRoute(third, this.state.directionsService, this.state.directionsDisplay);
    }

    // clear map markers
    this.setMapOnAll(null);
  }

  handleScheduleChange(event){
    //this.setState({scheduleType: event.target.value});
    this.displayRoute(event.target.value);
  }

  render() {
    return (
      <div>
        <div id="map" style={{height: 550}}></div>
        <Forms ref={instance => {this.Forms = instance;}} handleScheduleChange={this.handleScheduleChange} displayMarkers={this.displayMarkers} displayRoute={this.displayRoute} markers={this.state.markers}/>
        <div id="scroll" style={{height: 300}}>
          <ScrollMarkers ref={instance => {this.ScrollMarkers = instance;}} markers={this.state.markers}/>
        </div>
      </div>  
    );
  }
}

export default Maps;