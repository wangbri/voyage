import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ScrollMarkers from '../components/Marker';
import { receiveSchedule } from '../api/googleMaps.js';

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: []
    }

    this.printSchedule = this.printSchedule.bind(this);
    //receiveSchedule((err, data) => this.printSchedule(data));
  }

  printSchedule(input) {
    console.log("in print schedule");

    // this.setState({
    //   markers: [input.smallestScheduleList, input.secondScheduleList, input.thirdScheduleList]
    // });

    // console.log(input.smallestScheduleList);
    // console.log(input.smallestTime);
    // console.log(input.secondScheduleList);
    // console.log(input.secondTime);
    // console.log(input.thirdScheduleList);
    // console.log(input.thirdTime);
  }

  // renderSchedule(markers) {
  //   return (
  //     <div style={{height: 300}}>
  //       <ScrollMarkers ref={instance => {this.ScrollMarkers = instance;}} markers={markers}/>
  //     </div>
  //   );
  // }

  render() {
    return (
      <div>
      { 
        // this.state.markers.map(marker => {
        //   return this.renderSchedule(marker);
        // })
      }
      </div>
    );
  }
}

export default Results;