import React, { Component } from "react";
import './Detail.css';
import Header from '../../common/header/Header'

class Detail extends Component{
    componentDidMount() {
        console.log(this.props.match.params.restaurantId);
    }
    render(){
        return(
            <div>
            <Header></Header>
             Restaurant : {this.props.match.params.restaurantId}
            </div>
        )
    }
}
export default Detail;