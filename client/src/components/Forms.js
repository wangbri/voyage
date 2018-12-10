import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { sendYelpAddress, receiveYelpResult } from '../api/yelp.js';
import { sendRoute, receiveRoute, createSchedule } from '../api/googleMaps.js';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      addresses: [],
      markers: []
      // map: null,
      // geocoder: null
    }

    this.handleYelpSubmit = this.handleYelpSubmit.bind(this);
    this.handleYelpChange = this.handleYelpChange.bind(this);
    this.handleAddressSubmit = this.handleAddressSubmit.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleGenerateScheduleSubmit = this.handleGenerateScheduleSubmit.bind(this);
    // this.printSchedule = this.printSchedule.bind(this);

    receiveYelpResult((err, data) => this.props.displayMarkers(data));
    receiveRoute((err, data) => this.props.displayRoute(data));
    // receiveSchedule((err, data) => sendResult(data))
    // receiveSchedule((err, data) => this.printSchedule(data));
  }

  handleYelpChange(event) {
    this.setState({value: event.target.value});
  }

  handleYelpSubmit(event) {
    // window.socket.emit('yelp', this.state.value);
    // console.log(this.state.value);
    sendYelpAddress(this.state.value);
  }

  handleAddressChange(event) {
    var inputName = event.target.id;
    var inputIndex = inputName[inputName.length - 1];
    const addresses = this.state.addresses;
    addresses[inputIndex] = event.target.value;
    this.setState({ addresses: addresses });
    console.log(inputName);
    console.log(this.state.addresses[inputIndex]);
  }

  handleAddressSubmit(event) {
    for (var i = 0; i < 3; i++) {
      if (this.state.addresses[i] == '')
        console.log(this.state.addresses[i]);
        sendYelpAddress(this.state.addresses[i]);
    }

    sendRoute(this.state.addresses);
  }

  handleGenerateScheduleSubmit(event) {
    var names = [];
    for (var i = 0; i < this.props.markers.length; i++) {
      names.push({
        name: this.props.markers[i].input.name,
        location: this.props.markers[i].input.location,
        image: this.props.markers[i].input.image
      });
    }

    createSchedule(names);
  }

  printSchedule(input) {
    console.log("in print schedule");

    console.log(input.smallestScheduleList);
    console.log(input.smallestTime);
    console.log(input.secondScheduleList);
    console.log(input.secondTime);
    console.log(input.thirdScheduleList);
    console.log(input.thirdTime);
  }

  render() {
    return (
      <div className="row" id="submitAddress">
        <input type="text" className="form-control" id="inputYelpAddress" placeholder="Specify a Yelp address.." value={this.state.value} onChange={this.handleYelpChange}></input>
        <div className="btn-group">
          <button type="button" className="btn btn-primary" id="yelp-btn" onClick={this.handleYelpSubmit}>Submit Yelp Address</button>
          <a type="button" className="btn btn-primary" id="generate-schedule-btn" onClick={this.handleGenerateScheduleSubmit}>Generate Schedule</a>
        </div>
        <div class="col">
            <select id="inputState" className="form-control" onChange={this.props.handleScheduleChange}>
              <option selected>smallest</option>
              <option>second smallest</option>
              <option>third smallest</option>
            </select>
          </div>
      </div>
    );
  }
}

export default Form;