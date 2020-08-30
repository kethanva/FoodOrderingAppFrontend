import React, { Component } from 'react';
import './CardCompnent.css';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Star from '@material-ui/icons/Star';

// Restaurant Card Component
class CardCompnent extends Component {
    constructor() {
        super();
        this.state = {
            restaurant: {}

        };
    }
    componentDidMount() {
        this.setState({
            restaurant: this.props.restaurant
        });
    }
    render() {
        return (
            <div>
                <Card className="root" onClick={this.props.clickDetailHandler}>
                    <img className="restaurant-image" src={this.state.restaurant.photo_URL} alt="Profile Pic" /><br /><br />
                    <CardContent className="card-container">
                        <div className="name">
                            <Typography gutterBottom variant="h5" component="h2">
                                {this.state.restaurant.restaurant_name}
                            </Typography>
                        </div>
                        <div className="category">
                            <Typography variant="body2" color="textSecondary" component="p">
                                {this.state.restaurant.categories}
                            </Typography>
                        </div>
                        <div className="bottom">
                            <div className="ratings">
                                <Star className="star-icon"></Star>
                                <label className="ratingLabel"><p>{Math.round((this.state.restaurant.customer_rating + Number.EPSILON) * 100) / 100} ({this.state.restaurant.number_customers_rated})</p></label>
                            </div>
                            <div className="price-Container">
                                <label className="price"><p>&#x20B9; {this.state.restaurant.average_price} for two</p></label>
                            </div>

                        </div>
                    </CardContent>

                </Card>
            </div>
        )
    }
}
export default CardCompnent;
