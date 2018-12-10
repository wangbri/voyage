import React from 'react'
import { HashRouter, BrowserRouter, Switch, Route } from 'react-router-dom'
import Splash from './views/Splash';
import Maps from './views/Maps';
import UserInput from './views/UserInput';
import Results from './views/Results';

const Main = () => (
  <main>
  	<BrowserRouter>
	    <Switch>
	      <Route exact path='/' component={Splash}/>
	      <Route path='/map' component={Maps}/>
	      <Route path='/input' component={UserInput}/>
	      <Route path='/results' component={Results}/>
	    </Switch>
	</BrowserRouter>
  </main>
)

export default Main