import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import HorizontalScroll from 'react-scroll-horizontal';
// import { Card, CardImg, CardText, CardBody,
//   CardTitle, CardSubtitle, Button } from 'reactstrap';
// import { locationsMarkers } from '../api/googleMaps.js'

function Marker(props) {
	return (
		<div className="card" styles="width: 18rem;">
	  	<img className="card-img-top" src={props.image}></img>
		  <div className="card-body">
		    <h5 className="card-title">{props.title}</h5>
		    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
		    <a href="#" className="btn btn-primary">Go somewhere</a>
		  </div>
		</div>
	);
}

class ScrollMarkers extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: "Sample Text",
			markers: []
		}
	}

	renderMarker(marker, size, index) {
		var childWidth;

		if (index == this.props.markers.length - 1) {
			childWidth = size + `px`;
		} else {
			childWidth = 10 + `px`;
		}

		//"https://placeholdit.imgix.net/~text?txtsize=16&txt=318%C3%97180&w=288&h=50"

		const child = { width: `20em`, height: `50em`, marginLeft: `10px`, marginRight: childWidth, marginTop: `10px`}

		return (
			<div style={child}><Marker title={marker.name} image={marker.image}/></div>
		);
	}

	handleMarkerChange() {
	  //this.setState({value: event.target.value});
	  console.log("called child fn");
	}

	render() {
	  	const parent = { width: `100%`, height: `100%`}    

	  	var childWidth;
	  	var markersLength = this.props.markers.length;

	  	// fill out margins if less than 5 markers
	  	if (markersLength < 5) {
	  		childWidth = (1600 - (320 * markersLength));
	  		// childWidth = (1600 - (320 * markersLength))/(markersLength * 2);
	  	}

	  	return (
	  		<div style={parent}>
	    		<HorizontalScroll>
	      		{	
	      			this.props.markers.map((marker, index) => {
	      				return this.renderMarker(marker, childWidth, index);
	      			})
	      		}
	    		</HorizontalScroll>
	  		</div>
	  	);
	}
}

export default ScrollMarkers;