import React, { Component } from "react";
import './Home.css';
import Header from '../../common/header/Header'
import Card from '../card/CardCompnent';

class Home extends Component {
    constructor() {
        super();
        this.state = {
            restaurants: [],
            filteredrestaurants: []
        }
    }
    clickProfileHandler = () => {
        this.props.history.push("/profile");
    }
    clickDetailHandler = (restaurantId) => {
        this.props.history.push("/restaurant/" + restaurantId);

    }
    componentDidMount() {
        let thisComponent = this;
        let xhrData = new XMLHttpRequest();
        let restaurants = null;
        xhrData.addEventListener("readystatechange", function () {
            if (this.readyState === 4 && this.status === 200) {
                thisComponent.setState({
                    restaurants: JSON.parse(this.response).restaurants,
                    filteredrestaurants: JSON.parse(this.response).restaurants
                });
                console.log(JSON.parse(this.response).restaurants);

            }
        });
        xhrData.open("GET", this.props.baseURL + '/restaurant');
        xhrData.send(restaurants);
    }
    searchHandler = (e) => {
        console.log(e.target.value);
        let filterrestaurants = this.state.restaurants.filter(restaurant => {
            return restaurant.restaurant_name.toLowerCase().includes(e.target.value.toLowerCase());
        });
        this.setState({ filteredrestaurants: filterrestaurants })
    }
    render() {

        return (
            <div>
                <Header page="home" clickProfile={this.clickProfileHandler} searchHandler={this.searchHandler}></Header>
                <div className="gridContainer">
                    {this.state.filteredrestaurants.map((restaurant) => (
                        <Card restaurant={restaurant} key={restaurant.id} clickDetailHandler={this.clickDetailHandler.bind(this, restaurant.id)}></Card>
                    ))}
                </div>
            </div>
        )
    }
}
export default Home;
