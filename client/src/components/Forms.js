import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { sendYelpAddress, receiveYelpResult } from '../api/yelp.js';
import { sendRoute, receiveRoute } from '../api/googleMaps.js';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      addresses: []
      // map: null,
      // geocoder: null
    }

    this.handleYelpSubmit = this.handleYelpSubmit.bind(this);
    this.handleYelpChange = this.handleYelpChange.bind(this);
    this.handleAddressSubmit = this.handleAddressSubmit.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);

    receiveYelpResult((err, data) => this.props.addMarker(data));
    receiveRoute((err, data) => this.props.displayRoute(data));
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
      console.log(this.state.addresses[i]);
      sendYelpAddress(this.state.addresses[i]);
    }

    sendRoute(this.state.addresses);
  }

  render() {
    return (
      <div id="submitAddress">
        <form className="form-inline">
          <div className="form-group mx-sm-3 mb-2">
            <input className="form-control" id="inputAddress0" placeholder="Specify an address.." value={this.state.addresses[0]} onChange={this.handleAddressChange}></input>
            <input className="form-control" id="inputAddress1" placeholder="Specify an address.." value={this.state.addresses[1]} onChange={this.handleAddressChange}></input>
            <input className="form-control" id="inputAddress2" placeholder="Specify an address.." value={this.state.addresses[2]} onChange={this.handleAddressChange}></input>
          </div>
          <button type="button" className="btn btn-primary mb-2" onClick={this.handleAddressSubmit}>Submit Address</button>

          <div className="form-group mx-sm-3 mb-2">
            <input className="form-control" id="inputYelpAddress" placeholder="Specify a Yelp address.." value={this.state.value} onChange={this.handleYelpChange}></input>
          </div>
          <button type="button" className="btn btn-primary mb-2" id="yelp-btn" onClick={this.handleYelpSubmit}>Submit Yelp Address</button>
        </form>
      </div>
    );
  }
}

export default Form;