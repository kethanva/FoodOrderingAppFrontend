import React, { Component } from "react";
import './Home.css';
import Header from '../../common/header/Header'

class Home extends Component{
    clickProfileHandler = () => {
        this.props.history.push("/profile");
    }
    render(){
        return(
            <div>
            <Header page="home" clickProfile={this.clickProfileHandler}></Header>
            Home
            </div>
        )
    }
}
export default Home;
