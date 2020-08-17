import React, { Component } from 'react'; 
import { BrowserRouter as Router, Route } from 'react-router-dom'; 
import Home from './home/Home';
import Details from './detail/Detail'; 
import Checkout from './checkout/Checkout'; 
import Profile from './profile/Profile';

class App extends Component { 
render() { 
	return ( 
	<Router> 
		<div className="App"> 
            <Route exact path='/' component={Home}></Route>
            <Route exact path='/detail' component={Details}></Route> 
			<Route exact path='/checkout' component={Checkout}></Route> 
			<Route exact path='/profile' component={Profile}></Route> 
		</div> 
	</Router> 
); 
} 
} 
export default App; 