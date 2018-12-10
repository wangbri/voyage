import React from 'react'
import { HashRouter, BrowserRouter, Switch, Route } from 'react-router-dom'
import Splash from './views/Splash';
import Maps from './views/Maps';
import UserInput from './views/UserInput';
import Results from './views/Results';
import NavBar from './views/NavBar';

const Main = () => (
  <main>
  	<BrowserRouter>
  		<div>
  			<NavBar/>
		    <Switch>
		      <Route exact path='/' component={Splash}/>
		      <Route path='/map' component={Maps}/>
		      <Route path='/input' component={UserInput}/>
		      <Route path='/results' component={Results}/>
		    </Switch>
		</div>
	</BrowserRouter>
  </main>
)

export default Main