import React, {Component} from "react";
import './Details.css';
import Header from '../../common/header/Header'
import '../../assets/font-awesome-4.7.0/css/font-awesome.min.css'

import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import Add from '@material-ui/icons/Add';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import {withStyles} from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
    root: {
        flexGrow: 1,
        paddingLeft: theme.spacing(2)*2
    },
    paper: {
        padding: theme.spacing(0),
        textAlign: "left",
        border: "none",
        boxShadow: "none",
        backgroundColor: "#e8e9eb"
    },
    cardContent:{
        paddingLeft:theme.spacing(2)*3
    }
});

class Details extends Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurant_name: null,
            photo_URL: null,
            customer_rating: null,
            average_price: null,
            number_customers_rated: null,
            locality: null,
            categories: [],
            messagebarOpen: false,
            cartItems: 0,
            cartItemsList: [],
            messagebarMessage: null,
            cartTotalPrice: 0,
            restaurant_id: this.props.match.params.restaurantId
        }
    };

    componentDidMount() {
        const {
            history: {
                location: {
                    pathname,
                } = {},
            } = {},
        } = this.props;
        let id = pathname.split('/')[2];
        this.getRestaurantDetails(id);
    };

    //Get Restaurant details
    getRestaurantDetails = (id) => {
        let res_url = `${this.props.baseURL}/restaurant/${id}`;
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
                customer_rating: res.customer_rating,
                average_price: res.average_price,
                number_customers_rated: res.number_customers_rated,
                locality: res.address.locality,
                categories: res.categories,
                cartItems: 0,
                restaurant_id: id,
            });
        }).catch((error) => {
            console.log('error getting data', error);
        });
    };

    //Handle message bar
    messageBarHandler = (message) => {
        this.setState({
            messagebarOpen: !this.state.messagebarOpen,
            messagebarMessage: message,
        });
    }

    //Handle Checkout
    checkoutHandler = () => {
        if (this.state.cartItems === 0) {
            this.messageBarHandler("Please add an item to your cart!");
        } else if (!sessionStorage.getItem("access-token")) {
            this.messageBarHandler("Please login first!");
        } else {
            let checkoutCart = {
                restaurantDetails: {
                    'average_price': this.state.average_price,
                    'categories': this.state.categories,
                    'customer_rating': this.state.customer_rating,
                    'id': this.state.restaurant_id,
                    'number_customers_rated': this.state.number_customers_rated,
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

    //Remove item from cart
    removeItemFromCartHandler = (cartItem) => {
        let cartItemsList = this.state.cartItemsList;
        let index = cartItemsList.indexOf(cartItem);
        cartItemsList[index].quantity -= 1;
        if (cartItemsList[index].quantity === 0) {
            cartItemsList.splice(index, 1);
            this.messageBarHandler("Item removed from cart!");
        } else {
            this.messageBarHandler("Item quantity decreased by 1!");
        }
        this.setState({
            cartItems: this.state.cartItems - 1,
            cartItemsList: cartItemsList,
            cartTotalPrice: this.state.cartTotalPrice - cartItem.item.price,
        })
    }

    //Add item to the cart
    addItemFromCartHandler = (cartItem) => {
        this.messageBarHandler("Item quantity increased by 1!");
        let cartItemsList = this.state.cartItemsList;
        let index = cartItemsList.indexOf(cartItem);
        cartItemsList[index].quantity += 1;
        this.setState({
            cartItems: this.state.cartItems + 1,
            cartItemsList: cartItemsList,
            cartTotalPrice: this.state.cartTotalPrice + cartItem.item.price,
        });
    }

    //Add item handler
    addItemHandler = (item) => {
        this.messageBarHandler("Item added to cart!");
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
                <div className="restaurant-information grey-color-bg">
                    <Grid container direction="row" spacing={0}>
                        <Grid item xs={2}>
                            <Paper className={classes.paper}>
                                <div className="">
                                    <div>
                                        <img src={this.state.photo_URL} alt='restaurant' width="240px" height="220px"/>
                                    </div>
                                </div>
                            </Paper>
                        </Grid>
                        <Grid item xs={10}  className="padding-2per-left">
                            <Paper className={classes.paper}>
                                <div className="">
                                    <Grid container direction="row" spacing={0}>
                                        <Grid item xs={12}>
                                            <Paper className={classes.paper}>
                                                <div>
                                                    <Typography variant="h4" gutterBottom> {this.state.restaurant_name} </Typography>
                                                    <Typography variant="h6" gutterBottom> {this.state.locality} </Typography>
                                                    <Typography variant="body1" gutterBottom> {this.state.categories
                                                    && Array.isArray(this.state.categories)
                                                    && this.state.categories.length > 0
                                                    && this.state.categories.map((el) => el.category_name).join(", ")} </Typography>
                                                </div>
                                            </Paper>
                                        </Grid>
                                    </Grid>
                                    <div>
                                        <Grid container direction="row" spacing={0}>
                                            <Grid item xs={6}>
                                                <Paper className={classes.paper}>
                                                    <div>
                                                        <i className="fa fa-star"
                                                           aria-hidden="true"> {this.state.customer_rating} </i>
                                                        <br/>
                                                        <Typography variant="caption" gutterBottom
                                                                    className="grey-color-font">
                                                            AVERAGE RATING BY <br/>
                                                            <span
                                                                className="font-weight-bold"> {this.state.number_customers_rated} </span> CUSTOMERS
                                                        </Typography>
                                                    </div>
                                                </Paper>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Paper className={classes.paper}>
                                                    <div>
                                                        <i className="fa fa-inr "
                                                           aria-hidden="true"> {this.state.average_price} </i>
                                                        <br/>
                                                        <Typography variant="caption" gutterBottom
                                                                    className="grey-color-font">
                                                            AVERAGE COST FOR <br/> TWO PEOPLE
                                                        </Typography>
                                                    </div>
                                                </Paper>
                                            </Grid>
                                        </Grid>
                                    </div>
                                </div>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>

                <div className="menu-cart-section">
                    <div className='menu'>
                        <div style={{padding: '3%'}}>
                            {this.state.categories.map(categoryItem =>
                                <div key={categoryItem.id}>
                                    <CategoryItem item={categoryItem} this={this}/>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="space">
                    </div>
                    <div className="cart">
                        <div className="padding-5per">
                            <Card className={classes.card} >
                                <CardContent className={classes.cardContent}>
                                    <div>
                                        <div style={{float: "left", width: "10%"}}><Badge
                                            badgeContent={this.state.cartItems === null ? 0 : this.state.cartItems}
                                            color="primary"><ShoppingCart/></Badge></div>
                                        <div style={{float: "right", width: "90%"}}>
                                            <Typography variant="h5" gutterBottom style={{fontWeight: 'bold'}}>
                                                My Cart
                                            </Typography></div>
                                    </div>
                                    {this.state.cartItemsList.map(cartItem =>
                                        <div key={cartItem.item.id}>
                                            <CartItem item={cartItem} this={this}/>
                                        </div>
                                    )}
                                    <div style={{display: "inline-block", width: "90%", paddingTop: "3%", paddingLeft: "2%"}}>
                                        <div style={{float: "left"}}>
                                            <Typography variant="body1" gutterBottom style={{fontWeight: 'bold'}}>
                                                TOTAL AMOUNT </Typography></div>
                                        <div style={{float: "right", width: ""}}>
                                            <i className="fa fa-inr" aria-hidden="true"> </i> {this.state.cartTotalPrice.toFixed(2)}
                                        </div>
                                    </div>
                                </CardContent>
                                <CardActions>
                                    <div style={{paddingLeft: "8%",paddingRight: "8%",width:"100%"}}>
                                        <Button variant="contained" color="primary"
                                                onClick={this.checkoutHandler} style={{width:"100%"}}> CHECKOUT </Button>
                                    </div>
                                </CardActions>
                            </Card>
                        </div>
                    </div>
                </div>

                <Snackbar anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                          open={this.state.messagebarOpen}
                          autoHideDuration={700}
                          onClose={(e) => this.messageBarHandler("")}
                          ContentProps={{
                              'aria-describedby': 'message-id',
                          }}
                          message={<span id="message-id">{this.state.messagebarMessage}</span>}
                          action={[
                              <IconButton
                                  key="close"
                                  aria-label="Close"
                                  color="inherit"
                                  onClick={(e) => this.messageBarHandler("")}
                              >
                                  <CloseIcon/>
                              </IconButton>,
                          ]}
                />
            </div>
        );
    }
}

//Display the cart items with changed values
function CartItem(props) {
    const cartItem = props.item;
    const color = props.item
    && props.item.item.item_type && props.item.item.item_type.toString()
    && props.item.item.item_type.toLowerCase() === "non_veg" ? "red" : "green";
    return (
        <div style={{display: "flex", flexDirection: "row", width: "100%", padding: "1%"}}>
            <div style={{width: "10%", display: "flex", alignItems: "center", color: color}}>
                <i className="fa fa-stop-circle-o" aria-hidden="true"></i></div>
            <div style={{width: "40%", display: "flex", alignItems: "center", textTransform: "capitalize"}}><span
                style={{color: "grey"}}> {cartItem.item.item_name} </span></div>
            <div style={{width: "5%", display: "flex", alignItems: "center"}}>
                <i onClick={(e) => props.this.removeItemFromCartHandler(cartItem)} className="cartButton fa fa-minus"
                   aria-hidden="true"></i>
            </div>
            <div style={{width: "5%", display: "flex", alignItems: "center"}}> {cartItem.quantity} </div>
            <div style={{width: "16%", display: "flex", alignItems: "center"}}>
                <i onClick={(e) => props.this.addItemFromCartHandler(cartItem)} className="cartButton fa fa-plus"
                   aria-hidden="true"></i>
            </div>
            <div style={{display: "flex", alignItems: "center"}}><i className="fa fa-inr" aria-hidden="true"><span
                style={{color: "grey"}}> {cartItem.item.price.toFixed(2)} </span></i></div>
        </div>
    )
}

//Cart items calculation
function CategoryItem(props) {
    return (
        <div style={{padding: "3%"}}>
            <Typography variant="caption" gutterBottom style={{
                fontWeight: "bold",
                textTransform: "uppercase"
            }}> {props.item.category_name} </Typography>
            <Divider/>
            {props
            && props.item
            && props.item.item_list
            && Array.isArray(props.item.item_list)
            && props.item.item_list.length > 0
            && props.item.item_list.map(menuItem =>
                <div key={menuItem.id}>
                    <MenuItem item={menuItem} this={props.this}/>
                </div>
            )}
        </div>
    )
};

//Menu items of restaurant displayer
function MenuItem(props) {
    const color = props.item.item_type
    && props.item.item_type.toString()
    && props.item.item_type.toLowerCase() === "non_veg" ? "red" : "green";
    return (
        <div style={{display: "flex", flexDirection: "row", width: "100%", paddingLeft: "1%"}}>
            <div style={{width: "5%", display: "flex", alignItems: "center", color: color}}><i
                className="fa fa-circle"></i></div>
            <div style={{
                width: "65%",
                display: "flex",
                alignItems: "center",
                textTransform: "capitalize"
            }}> {props.item.item_name} </div>
            <div style={{width: "20%", display: "flex", alignItems: "center"}}>
                <i className="fa fa-inr" aria-hidden="true"> {props.item.price.toFixed(2)} </i>
            </div>
            <div style={{width: "10%", display: "flex", alignItems: "center"}}>
                <IconButton onClick={(e) => props.this.addItemHandler(props.item)}>
                    <Add style={{height: "100%"}}/></IconButton>
            </div>
        </div>
    )
};

export default withStyles(styles)(Details);