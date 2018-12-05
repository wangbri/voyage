import React, { Component } from 'react';
import ScrollMarkers from '../components/Marker';

class SharableSchedule extends Component {
  constructor(props) {
    super(props);

    this.state = {
      urlTag: null,
      markers: []
    }

  }

  componentDidMount() {
    
  }

  componentWillMount() {

  }

  render() {
    return (
      <div>
       <div id="scroll" style={{height: 300}}>
          <ScrollMarkers />
        </div>
      </div>
    );
  }
}

export default ShareableSchedule;