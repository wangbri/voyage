import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

it('renders without crashing', () => {
  const wrapper = shallow(<App />);
  // const map = <div id="map"></div>;
  // expect(wrapper).toContainReact(map);
});