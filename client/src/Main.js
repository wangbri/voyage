import React from 'react'
import { Switch, Route } from 'react-router-dom'
import GoogleMaps from './GoogleMaps';

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={GoogleMaps}/>
      <Route path='/map' component={GoogleMaps}/>
    </Switch>
  </main>
)

export default Main