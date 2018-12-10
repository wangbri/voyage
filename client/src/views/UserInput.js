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
      <div>
        <header className="masthead2 text-white text-center">
          <div className="overlay"></div>
          <div className="container">
            <div className="row">
              <div className="col-md-10 col-lg-8 col-xl-7 mx-auto">
                <div className="input-form">
                  <form className="needs-validation" novalidate>
                    <div className="form-row">
                      <div className="col-md-3 mb-3">
                        <label for="validationCustom01">Where do you plan to travel?</label>
                        <input type="text" className="form-control" id="validationCustom01" placeholder="Specify a location..." value={this.state.location} onChange={this.handleLocationChange} required></input>
                        <div className="valid-feedback">
                          Looks good!
                        </div>
                        <div className="invalid-feedback">
                          Please provide a city or location.
                        </div>
                      </div>
                      <div className="col-md-3 mb-3">
                        <label for="validationCustom02">How much do you want to spend?</label>
                        <select id="inputState" className="form-control" onChange={this.handlePriceChange}>
                          <option defaultValue>$</option>
                          <option>$$</option>
                          <option>$$$</option>
                          <option>$$$$</option>
                        </select>
                        <div className="valid-feedback">
                          Looks good!
                        </div>
                        <div className="invalid-feedback">
                          Please provide a price range.
                        </div>
                      </div>
                      <div className="col-md-3 mb-3">
                        <label for="validationCustomUsername">How will you be traveling?</label>
                          <select id="inputState" className="form-control" onChange={this.handleTransitChange}>
                            <option defaultValue>driving</option>
                            <option>bicycling</option>
                            <option>walking</option>
                          </select>              
                          <div className="invalid-feedback">
                            Please choose a method of transportation.
                          </div>
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="col-md-3 mb-3">
                        <label for="validationCustom03">When will you be starting your trip?</label>
                        <input type="text" className="form-control" placeholder="Specify a starting time..." value={this.state.start} onChange={this.handleStartChange} required></input>
                        <div className="invalid-feedback">
                          Please provide a valid time.
                        </div>
                      </div>
                      <div className="col-md-3 mb-3">
                        <label for="validationCustom04">When will you have to end your trip?</label>
                        <input type="text" className="form-control" placeholder="Specify an ending time..." value={this.state.end} onChange={this.handleEndChange} required></input>
                        <div className="invalid-feedback">
                          Please provide a valid time.
                        </div>
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="col-md-1 mb-1">
                        <button className="btn btn-primary" type="submit" onClick={this.sendInputs}>Send Input</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </header>

        <section className="features-icons bg-light text-center">
          <div className="container">
            <div className="row">
              <div className="col-lg-4">
                <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                  <div className="features-icons-icon d-flex">
                    <i className="icon-screen-desktop m-auto text-primary"></i>
                  </div>
                  <h3>Fully Responsive</h3>
                  <p className="lead mb-0">This theme will look great on any device, no matter the size!</p>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                  <div className="features-icons-icon d-flex">
                    <i className="icon-layers m-auto text-primary"></i>
                  </div>
                  <h3>Bootstrap 4 Ready</h3>
                  <p className="lead mb-0">Featuring the latest build of the new Bootstrap 4 framework!</p>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="features-icons-item mx-auto mb-0 mb-lg-3">
                  <div className="features-icons-icon d-flex">
                    <i className="icon-check m-auto text-primary"></i>
                  </div>
                  <h3>Easy to Use</h3>
                  <p className="lead mb-0">Ready to use with your own content, or customize the source files!</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default UserInput;