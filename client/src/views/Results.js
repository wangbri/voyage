import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ScrollMarkers from '../components/Marker';
import { getSmallest, receiveSmallest } from '../api/googleMaps.js';
import { saveSchedule, getSchedule, receiveSchedule } from '../api/roomCodes.js';

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: "",
      markers: []
    }

    this.getSchedule = this.getSchedule.bind(this);
    this.generateCode = this.generateCode.bind(this);
    this.handleCodeChange = this.handleCodeChange.bind(this);
    this.printSchedule = this.printSchedule.bind(this);

    receiveSmallest((err, data) => this.printSchedule(data));
    receiveSchedule((err, data) => this.populateSchedule(data));
  }

  componentDidMount() {
    getSmallest("");
  }

  printSchedule(input) {
    console.log("in print schedule");

    if (input != undefined) {
      this.setState({
        markers: [input.smallestScheduleList, input.secondScheduleList, input.thirdScheduleList]
      });

      console.log(input.smallestScheduleList);
      console.log(input.smallestTime);
      console.log(input.secondScheduleList);
      console.log(input.secondTime);
      console.log(input.thirdScheduleList);
      console.log(input.thirdTime);
    }
  }

  renderSchedule(markers) {
    return (
      <div style={{height: 300}}>
        <ScrollMarkers ref={instance => {this.ScrollMarkers = instance;}} markers={markers}/>
      </div>
    );
  }

  handleCodeChange(event) {
    // generateRoom("foobar");
    this.setState({code: event.target.value});
  }

  generateCode() {
    // TODO: stringify schedules and save on server to random hash
    // return room code to user afterwards
    saveSchedule(this.state.markers);
  }

  getSchedule() {
    console.log(this.state.code);
    getSchedule(this.state.code);
  }

  populateSchedule(data) {
    console.log("populate schedule: " + data);

    this.setState({
      markers: data
    })
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col">
            <button type="button" className="btn btn-primary" onClick={this.generateCode}>Share this schedule!</button>
          </div>
          <div className="col">
            <input type="text" className="form-control" placeholder="Specify a schedule code..." value={this.state.code} onChange={this.handleCodeChange}></input>
          </div>
          <div className="col">
            <button type="button" className="btn btn-primary" onClick={this.getSchedule}>Get schedule!</button>
          </div>
        </div>
        <div>
        { 
          this.state.markers.map(marker => {
            return this.renderSchedule(marker);
          })
        }
        </div>
      </div>
    );
  }
}

export default Results;