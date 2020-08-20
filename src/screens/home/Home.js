import React, { Component } from "react";
import './Home.css';
import Header from '../../common/header/Header'
import Card from '../card/CardCompnent';
import Grid from '@material-ui/core/Grid';

class Home extends Component {
    constructor() {
        super();
        this.state = {
            restaurants: []
        }
    }
    clickProfileHandler = () => {
        this.props.history.push("/profile");
    }
    clickDetailHandler = () => {
        this.props.history.push("/detail");

    }
    componentDidMount() {
        let thisComponent = this;
        let xhrData = new XMLHttpRequest();
        let restaurants = null;
        xhrData.addEventListener("readystatechange", function () {
            if (this.readyState === 4 && this.status === 200) {
                thisComponent.setState({
                    restaurants: JSON.parse(this.response).restaurants

                });
                console.log(JSON.parse(this.response).restaurants);

            }
        });
        xhrData.open("GET", 'http://localhost:8080/api/restaurant');
        xhrData.send(restaurants);
    }
    render() {

        return (
            <div>
                <Header page="home" clickProfile={this.clickProfileHandler}></Header>
                <Grid container className="root">
                    <Grid item xs={12}>
                        <Grid container justify="center" spacing={1}>
                            {this.state.restaurants.map((restaurant) => (
                                <Grid key={restaurant.id} item>
                                    <Card restaurant={restaurant} key={restaurant.id} clickDetailHandler={this.clickDetailHandler}></Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        )
    }
}
export default Home;
