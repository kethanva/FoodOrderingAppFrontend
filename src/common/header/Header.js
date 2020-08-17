import React, { Component } from "react";
import './Header.css';
import Button from '@material-ui/core/Button';
import AccountCircle from '@material-ui/icons/AccountCircle';
import FastFood from '@material-ui/icons/Fastfood';
import SearchIcon from '@material-ui/icons/Search';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Fade, withStyles } from '@material-ui/core';

const styles = theme => ({  
    searchRestaurantTextInput: {      
        color: 'white',
        'padding-bottom': '2px',
        '&:after': {
            'border-bottom': '2px solid white',
        },
    }  

});
class Header extends Component {
    render() {
        const { classes } = this.props;
        return (
            <header className="app-header">
                <FastFood className="app-logo" />
                {this.props.page === "home" ?
                <div className='search-bar'>
                <Input className={classes.searchRestaurantTextInput}
                    startAdornment={
                        <InputAdornment position="start">
                            <SearchIcon className="searchIcon"></SearchIcon>
                        </InputAdornment>
                    }
                    placeholder="Search by Restaurant Name" fullWidth
                />
                </div> : ""
            }
                <div className="login-button">
                    <div>
                        <Button variant="contained" color="default" startIcon={<AccountCircle />}>
                            LOGIN
                        </Button>
                    </div >
                </div>
            </header>
        )
    }
}

export default withStyles(styles)(Header);