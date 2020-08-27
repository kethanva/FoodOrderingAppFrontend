import React, {Component} from "react";
import './Details.css';
import '../../assets/font-awesome-4.7.0/css/font-awesome.min.css'



const styles = {
    card: {
        minWidth: 100,
    }
};

class Details extends Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurant_name: null,
            photo_URL: null,
            average_rating: null,
            average_price: null,
            num_rated_customers: null,
            locality: null,
            categories: [],
            snackbarOpen: false,
            cartItems: 0,
            cartItemsList: [],
            snackbarMessage: null,
            cartTotalPrice: 0,
            restaurant_id: this.props.match.params.restaurantId
        }
    };

    componentDidMount() {
    };



    render() {
        const {classes} = this.props;
        return (
            <div>

            </div>
    )
};

export default withStyles(styles)(Details);