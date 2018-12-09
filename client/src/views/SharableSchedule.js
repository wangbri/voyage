import React, { Component } from 'react';
import ScrollMarkers from '../components/Marker';
import { receiveSchedule } from '../api/googleMaps.js';

 class SharableSchedule extends Component {
  constructor(props) {
    super(props);
     this.state = {
      urlTag: null,
      markers: []
    }

    this.printSchedule = this.printSchedule.bind(this);
    receiveSchedule((err, data) => this.printSchedule(data));

   }

   printSchedule(input){
    console.log("in print schedule");

    this.setState({
      markers: [input.smallestScheduleList]
    });

  }
   

   renderSchedule(markers) {
    return (
      <div style={{height: 300}}>
        <ScrollMarkers ref={instance => {this.ScrollMarkers = instance;}} markers={markers}/>
      </div>
    );
  }

  render() {
    return (
      <div>
      { 
        this.state.markers.map(marker => {
          return this.renderSchedule(marker);
        })
      }
      </div>
    );
  }
}
 export default ShareableSchedule;