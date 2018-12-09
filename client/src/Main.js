import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Maps from './views/Maps';
import UserInput from './views/UserInput';
import Results from './views/Results';

const Main = () => (
  <main>
  	<BrowserRouter>
	    <Switch>
	      <Route exact path='/' component={Maps}/>
	      <Route path='/map' component={Maps}/>
	      <Route path='/input' component={UserInput}/>
	      <Route path='/results' component={Results}/>
	    </Switch>
	</BrowserRouter>
  </main>
)

export default Main