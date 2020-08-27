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
        console.log("TEST " + this.props.match.params.restaurantId)

    }

    getRestaurantDetails = (id) => {
        let res_url = `${this.props.baseURL}/restaurant/${id}`;
        console.log(res_url)
        return fetch(res_url, {
            method: 'GET',
        }).then((response) => {
            if (response.ok) {
                return response.json();
            }
        }).then((res) => {
            this.setState({
                restaurant_name: res.restaurant_name,
                photo_URL: res.photo_URL,
                average_rating: res.average_rating,
                average_price: res.average_price,
                num_rated_customers: res.num_rated_customers,
                locality: res.address.locality,
                categories: res.categories,
                cartItems: 0,
                restaurant_id: id,
            });
        }).catch((error) => {
            console.log('error getting data', error);
        });
    };




    render() {
        const {classes} = this.props;
        return (
            <div>
                <div>
                    <Header showSearch="false" baseUrl={this.props.baseUrl}/>
                </div>


                <div className="">
                    <div className="">
                        <div>
                            <img
                                src={this.state.photo_URL}
                                alt='restaurant'
                                width='100%'
                            />
                        </div>
                    </div>


            </div>
    )
};

export default withStyles(styles)(Details);