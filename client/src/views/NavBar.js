import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">Voyage</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" href="./">Home <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="./input">Input</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="./map">Map</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="./results">Results</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default NavBar;