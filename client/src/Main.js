import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Maps from './views/Maps';
import UserInput from './views/UserInput';

const Main = () => (
  <main>
  	<BrowserRouter>
	    <Switch>
	      <Route exact path='/' component={Maps}/>
	      <Route path='/map' component={Maps}/>
	      <Route path='/input' component={UserInput}/>
	    </Switch>
	</BrowserRouter>
  </main>
)

export default Main