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



    handleSnackBar = (message) => {
        this.setState({
            snackbarOpen: !this.state.snackbarOpen,
            snackbarMessage: message,
        });
    }


    checkoutHandler = () => {
        if (this.state.cartItems === 0) {
            this.handleSnackBar("Please add an item to your cart!");
        } else if (!sessionStorage.getItem("access-token")) {
            this.handleSnackBar("Please login first!");
        } else {
            let checkoutCart = {
                restaurantDetails: {
                    'average_price': this.state.average_price,
                    'categories': this.state.categories,
                    'average_rating': this.state.average_rating,
                    'id': this.state.restaurant_id,
                    'num_rated_customers': this.state.num_rated_customers,
                    'photo_URL': this.state.photo_URL,
                    'restaurant_name': this.state.restaurant_name,
                },
                cartItems: this.state.cartItemsList,
                totalPrice: this.state.cartTotalPrice
            };

            this.props.history.push({
                pathname: "/checkout",
                checkoutCart: checkoutCart
            })

        }
    }

    removeItemFromCartHandler = (cartItem) => {
        let cartItemsList = this.state.cartItemsList;
        let index = cartItemsList.indexOf(cartItem);
        cartItemsList[index].quantity -= 1;
        if (cartItemsList[index].quantity === 0) {
            cartItemsList.splice(index, 1);
            this.handleSnackBar("Item removed from cart!");
        } else {
            this.handleSnackBar("Item quantity decreased by 1!");
        }
        this.setState({
            cartItems: this.state.cartItems - 1,
            cartItemsList: cartItemsList,
            cartTotalPrice: this.state.cartTotalPrice - cartItem.item.price,
        })
    }

    addItemFromCartHandler = (cartItem) => {
        this.handleSnackBar("Item quantity increased by 1!");
        let cartItemsList = this.state.cartItemsList;
        let index = cartItemsList.indexOf(cartItem);
        cartItemsList[index].quantity += 1;
        this.setState({
            cartItems: this.state.cartItems + 1,
            cartItemsList: cartItemsList,
            cartTotalPrice: this.state.cartTotalPrice + cartItem.item.price,
        });
    }

    addItemHandler = (item) => {
        this.handleSnackBar("Item added to cart!");
        let cartItemsList = this.state.cartItemsList;
        var cartItem;
        let cartItems = cartItemsList.map((el) => el.item);
        let index = cartItems.indexOf(item);
        if (index === -1) {
            cartItem = {
                item: item,
                quantity: 1,
            }
            cartItemsList.push(cartItem);
        } else {
            cartItemsList[index].quantity += 1;
            cartItem = cartItemsList[index]
        }

        this.setState({
            cartItems: this.state.cartItems + 1,
            cartItemsList: cartItemsList,
            cartTotalPrice: this.state.cartTotalPrice + cartItem.item.price,
        });
    }

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