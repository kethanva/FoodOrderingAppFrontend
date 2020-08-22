import React, { Component } from 'react'; 
import { BrowserRouter as Router, Route } from 'react-router-dom'; 
import Home from './home/Home';
import Details from './detail/Detail'; 
import Checkout from './checkout/Checkout'; 
import Profile from './profile/Profile';

class App extends Component { 
	constructor() {
        super();
        this.state = {
				baseURL : 'http://localhost:8080/api'
        };
    }
render() { 
	return ( 
	<Router> 
		<div className="App"> 
			<Route exact path='/' component={(props) => <Home baseURL= {this.state.baseURL} {...props} />}></Route>
			<Route exact path='/restaurant/:restaurantId' component={(props) => <Details baseURL= {this.state.baseURL} {...props} />} ></Route> 
			<Route exact path='/checkout' component={(props) => <Checkout baseURL= {this.state.baseURL} {...props} />} ></Route> 
			<Route exact path='/profile' component={(props) => <Profile baseURL= {this.state.baseURL} {...props} />} ></Route> 

		</div> 
	</Router> 
); 
} 
} 
export default App; 