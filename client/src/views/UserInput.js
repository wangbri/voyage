import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { sendInputs } from '../api/yelp.js';

class UserInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "austin, tx",
      price: "$",
      transit: "driving",
      start: "",
      end: ""
    }

    this.sendInputs = this.sendInputs.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleStartChange = this.handleStartChange.bind(this);
    this.handleEndChange = this.handleEndChange.bind(this);
    this.handleTransitChange = this.handleTransitChange.bind(this);
  }

  handleLocationChange(event) {
    this.setState({location: event.target.value});
  }

  handlePriceChange(event) {
    this.setState({price: event.target.value});
  }

  handleStartChange(event) {
    this.setState({start: event.target.value});
  }

  handleEndChange(event) {
    this.setState({end: event.target.value});
  }

  handleTransitChange(event) {
    this.setState({transit: event.target.value});
  }

  sendInputs(event) {
    console.log(this.state.price);
    console.log(this.state.location);
    console.log(this.state.transit);
    console.log(this.state.start);
    console.log(this.state.end);

    sessionStorage.setItem('price', this.state.price);
    sessionStorage.setItem('location', this.state.location);

    sendInputs({
      location: this.state.location,
      price: this.state.price,
      start: this.state.start,
      end: this.state.end,
      transit: this.state.transit
    });
  }

  render() {
    return (
      <form>
        <div>
          <div className="row">
            <div className="col">
              <input type="text" className="form-control" placeholder="Specify a location..." value={this.state.location} onChange={this.handleLocationChange}></input>
            </div>
            <div class="col">
              <select id="inputState" className="form-control" onChange={this.handlePriceChange}>
                <option selected>$</option>
                <option>$$</option>
                <option>$$$</option>
                <option>$$$$</option>
              </select>
            </div>
            <div class="col">
              <select id="inputState" className="form-control" onChange={this.handleTransitChange}>
                <option selected>driving</option>
                <option>bicycling</option>
                <option>walking</option>
              </select>
            </div>
            <div className="col">
              <input type="text" className="form-control" placeholder="Specify a starting time..." value={this.state.start} onChange={this.handleStartChange}></input>
            </div>
            <div className="col">
              <input type="text" className="form-control" placeholder="Specify an ending time..." value={this.state.end} onChange={this.handleEndChange}></input>
            </div>
            <div className="col">
              <a href="./map" type="button" className="btn btn-primary" onClick={this.sendInputs}>Send Input</a>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default UserInput;