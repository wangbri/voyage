import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import HorizontalScroll from 'react-scroll-horizontal';
// import { Card, CardImg, CardText, CardBody,
//   CardTitle, CardSubtitle, Button } from 'reactstrap';


function Marker(props) {
		return (
			<div className="card" styles="width: 18rem;">
				<img className="card-img-top" styles="width: 18rem;" src="https://placeholdit.imgix.net/~text?txtsize=16&txt=318%C3%97180&w=288&h=50"></img>
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
			title: "Sample Text"
		}
	}

  render() {
    const child = { width: `20em`, height: `50em`, margin: `10px`}
    const parent = { width: `100%`, height: `100%`}    
    return (
      <div style={parent}>
        <HorizontalScroll>
            <div style={child}><Marker title={this.state.title}/></div>
            <div style={child}><Marker/></div>
            <div style={child}><Marker/></div>
            <div style={child}><Marker/></div>
            <div style={child}><Marker/></div>
            <div style={child}><Marker/></div>
        </HorizontalScroll>
      </div>
    );
  }
}

export default ScrollMarkers;