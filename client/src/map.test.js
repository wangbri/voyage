import React from 'react';
import ReactDOM from 'react-dom';
import Maps from './views/Maps';
import UserInput from './views/UserInput';
import renderer from 'react-test-renderer';
import ScrollMarkers from './components/Marker';
import Forms from './components/Forms';
import { locationsMarkers } from './api/googleMaps';


const setupGoogleMock = () => {
  /*** Mock Google Maps JavaScript API ***/
  const google = {
    maps: {
      Map:class{ zoom(){} center(){}},
      places: {
        AutocompleteService: () => {},
        PlacesServiceStatus: {
          INVALID_REQUEST: 'INVALID_REQUEST',
          NOT_FOUND: 'NOT_FOUND',
          OK: 'OK',
          OVER_QUERY_LIMIT: 'OVER_QUERY_LIMIT',
          REQUEST_DENIED: 'REQUEST_DENIED',
          UNKNOWN_ERROR: 'UNKNOWN_ERROR',
          ZERO_RESULTS: 'ZERO_RESULTS',
        },
      },
      Geocoder: () => {},
      GeocoderStatus: {
        ERROR: 'ERROR',
        INVALID_REQUEST: 'INVALID_REQUEST',
        OK: 'OK',
        OVER_QUERY_LIMIT: 'OVER_QUERY_LIMIT',
        REQUEST_DENIED: 'REQUEST_DENIED',
        UNKNOWN_ERROR: 'UNKNOWN_ERROR',
        ZERO_RESULTS: 'ZERO_RESULTS',
      },

      Geocoder:class{},
      DirectionsService:class{},
      DirectionsRenderer:class{ setMap(){}},
    },
  };

  global.window.google = google;
};


// in test file.
beforeAll(() => {
  setupGoogleMock();
});

//test if each component redered
it('Map renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Maps />, div);
});

it('User Input renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<UserInput/>, div);
});

it('Forms renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Forms />, div);
});

it('Location Markers renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<locationsMarkers />, div);
});

// it('Scroll Markers renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<ScrollMarkers />, div);
// });

//test if each component matches its snapshot
it('User Input renders a snapshot', () => {
  const tree = renderer.create(<UserInput/>).toJSON();
  expect(tree).toMatchSnapshot();
});

it('Map Input renders a snapshot', () => {
  const tree = renderer.create(<Maps />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('Forms Input renders a snapshot', () => {
  const tree = renderer.create(<Forms />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('Location Marker renders a snapshot', () => {
  const tree = renderer.create(<locationsMarkers />).toJSON();
  expect(tree).toMatchSnapshot();
});