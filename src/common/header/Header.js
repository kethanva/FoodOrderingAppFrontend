import React, { Component } from "react";
import './Header.css';
import Button from '@material-ui/core/Button';
import AccountCircle from '@material-ui/icons/AccountCircle';
import FastFood from '@material-ui/icons/Fastfood';
import SearchIcon from '@material-ui/icons/Search';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import { withStyles } from '@material-ui/core';
import Modal from 'react-modal';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import PropTypes from 'prop-types';


const styles = theme => ({
    searchRestaurantTextInput: {
        color: 'white',
        'padding-bottom': '2px',
        '&:after': {
            'border-bottom': '2px solid white',
        },
    }

});
const customStyles = {
    content: {
        right: 'auto',
        bottom: 'auto',
        left: '50%',
        top: '50%',
        maxHeight: '100vh',
        transform: 'translate(-50%, -50%)',
        overflowY: 'auto',
        marginRight: '-50%' 
    }
};
const TabContainer = function (props) {
    return (
        <Typography component="div" style={{ padding: 0, textAlign: 'center' }}>
            {props.children}
        </Typography>
    );
}
TabContainer.propTypes = {
    children: PropTypes.node.isRequired
}
class Header extends Component {
    constructor() {
        super();
        this.state = {
            modalIsOpen: false,
            value: 0,
            loginContactNo: '',
            loginPassword: '',
            loginContactNoRequired: 'displayNone',
            loginpasswordRequired: 'displayNone',
            firstName: '',
            lastName: '',
            email: '',
            rpassword: '',
            contactNumber: '',
            firstNameRequired: 'displayNone',
            lastNameRequired: 'displayNone',
            emailRequired: 'displayNone',
            emailRequiredText: 'required',
            registerPasswordRequired: 'displayNone',
            registerPasswordRequiredText : 'required',
            contactNumberRequired: 'displayNone',
            contactNumberRequiredText : 'required',
        };
    }
    modalHandler = () => {
        this.setState({
            modalIsOpen: true,
            value: 0,
            loginContactNo: '',
            loginPassword: '',
            loginContactNoRequired: 'displayNone',
            loginpasswordRequired: 'displayNone',
            firstName: '',
            lastName: '',
            email: '',
            rpassword: '',
            contactNumber: '',
            firstNameRequired: 'displayNone',
            lastNameRequired: 'displayNone',
            emailRequired: 'displayNone',
            emailRequiredText: 'required',
            registerPasswordRequired: 'displayNone',
            registerPasswordRequiredText : 'required',
            contactNumberRequired: 'displayNone',
            contactNumberRequiredText : 'required'
        });
    }
    closeModalHandler = () => {
        this.setState({ modalIsOpen: false });
        this.setState({ value: 0 })
    }
    tabChangeHandler = (event, value) => {
        this.setState({
            value: value,
            loginContactNo: '',
            loginPassword: '',
            loginContactNoRequired: 'displayNone',
            loginpasswordRequired: 'displayNone',
            firstName: '',
            lastName: '',
            email: '',
            rpassword: '',
            contactNumber: '',
            firstNameRequired: 'displayNone',
            emailRequired: 'displayNone',
            emailRequiredText: 'required',
            registerPasswordRequired: 'displayNone',
            registerPasswordRequiredText : 'required',
            contactNumberRequired: 'displayNone',
            contactNumberRequiredText : 'required'
        })
    }
    loginHandler = () => {
        console.log(this.state);
        this.state.loginContactNo === '' ? this.setState({ loginContactNoRequired: 'displayFormHelperText' }) : this.setState({ loginContactNoRequired: 'displayNone' })
        this.state.loginPassword === '' ? this.setState({ loginpasswordRequired: 'displayFormHelperText' }) : this.setState({ loginpasswordRequired: 'displayNone' })
    }
    loginChangeHandler = (e) => {
        e.target.id === 'loginContactNo' && this.setState({ loginContactNo: e.target.value })
        e.target.id === 'loginPassword' && this.setState({ loginPassword: e.target.value })

    }
    registerChangeHandler = (e) => {
        e.target.id === 'firstName' && this.setState({ firstName: e.target.value })
        e.target.id === 'lastName' && this.setState({ lastName: e.target.value })
        e.target.id === 'email' && this.setState({ email: e.target.value })
        e.target.id === 'password' && this.setState({ rpassword: e.target.value })
        e.target.id === 'contactNumber' && this.setState({ contactNumber: e.target.value })
    }
    registerHandler = () => {
        console.log(this.state);
        let emailRegex = new RegExp('^[\\w-_\\.+]*[\\w-_\\.]@([\\w]+\\.)+[\\w]+[\\w]$');
        let passwordRegex = new RegExp('^(?=.*[a-z]){3,}(?=.*[A-Z]){2,}(?=.*[0-9]){2,}(?=.*[!@#$%^&*()--__+.]){1,}.{8,}$');
        let contactNoRegex = new RegExp('^\\d{10}$');

        this.state.firstName === '' ? this.setState({ firstNameRequired: 'displayFormHelperText' }) : this.setState({ firstNameRequired: 'displayNone' })
        if(this.state.email === ''){
            this.setState({ emailRequired: 'displayFormHelperText' });
        }else if(this.state.email.length > 0 && !emailRegex.test(this.state.email)){
            this.setState({ emailRequired: 'displayFormHelperText', emailRequiredText: 'Invalid Email'});
        }else{
            this.setState({ emailRequired: 'displayNone' });
        }
        if(this.state.rpassword === ''){
            this.setState({ registerPasswordRequired: 'displayFormHelperText' });
        }else if(this.state.rpassword.length > 0 && !passwordRegex.test(this.state.rpassword)){
            this.setState({ registerPasswordRequired: 'displayFormHelperText', registerPasswordRequiredText: 'Password must contain at least one capital letter, one small letter, one number, and one special character'});
        }else{
            this.setState({ registerPasswordRequired: 'displayNone' });
        }
        if(this.state.contactNumber === ''){
            this.setState({ contactNumberRequired: 'displayFormHelperText' });
        }else if(this.state.contactNumber.length > 0 && !contactNoRegex.test(this.state.contactNumber)){
            this.setState({ contactNumberRequired: 'displayFormHelperText', contactNumberRequiredText: 'Contact No. must contain only numbers and must be 10 digits long'});
        }else{
            this.setState({ contactNumberRequired: 'displayNone' });
        }

    }
    render() {
        const { classes } = this.props;
        return (
            <div className="header">
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
                            <Button variant="contained" color="default" startIcon={<AccountCircle />} onClick={this.modalHandler}>
                                LOGIN
                        </Button>
                        </div >
                    </div>
                </header>
                <Modal ariaHideApp={false} isOpen={this.state.modalIsOpen} contentLabel="Login"
                    onRequestClose={this.closeModalHandler} style={customStyles}>
                    <Tabs className="tabs" value={this.state.value} onChange={this.tabChangeHandler}>
                        <Tab label="Login"></Tab>
                        <Tab label="SIGNUP"></Tab>
                    </Tabs>
                    {this.state.value === 0 &&
                        <TabContainer>
                            <FormControl required>
                                <InputLabel htmlFor="loginContactNo">Contact No.</InputLabel>
                                <Input id="loginContactNo" className="inputField" type="text" username={this.state.loginContactNo} onChange={this.loginChangeHandler}></Input>
                                <FormHelperText className={this.state.loginContactNoRequired}><span className="red">required</span></FormHelperText>
                            </FormControl><br />
                            <FormControl required>
                                <InputLabel htmlFor="loginPassword">Password</InputLabel>
                                <Input id="loginPassword" className="inputField" type="password" password={this.state.loginPassword} onChange={this.loginChangeHandler}></Input>
                                <FormHelperText className={this.state.loginpasswordRequired}><span className="red">required</span></FormHelperText>
                            </FormControl><br /><br /><br />
                            <Button variant="contained" color="primary" onClick={this.loginHandler}>LOGIN</Button>
                        </TabContainer>}
                    {this.state.value === 1 &&
                        <TabContainer>
                            <FormControl required >
                                <InputLabel htmlFor="firstName">First Name</InputLabel>
                                <Input id="firstName" className="inputField" type="text" onChange={this.registerChangeHandler}></Input>
                                <FormHelperText className={this.state.firstNameRequired}><span className="red">required</span></FormHelperText>
                            </FormControl><br />
                            <FormControl>
                                <InputLabel htmlFor="lastName">Last Name</InputLabel>
                                <Input id="lastName" className="inputField" type="text" onChange={this.registerChangeHandler}></Input>
                            </FormControl><br />
                            <FormControl required>
                                <InputLabel htmlFor="email">Email</InputLabel>
                                <Input id="email" className="inputField" type="text" onChange={this.registerChangeHandler}></Input>
                                <FormHelperText className={this.state.emailRequired}><span className="red">{this.state.emailRequiredText}</span></FormHelperText>
                            </FormControl><br />
                            <FormControl required>
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <Input id="password" className="inputField" type="password" onChange={this.registerChangeHandler}></Input>
                                <FormHelperText className={this.state.registerPasswordRequired}><span className="red">{this.state.registerPasswordRequiredText}</span></FormHelperText>
                            </FormControl><br />
                            <FormControl required>
                                <InputLabel htmlFor="contactNumber">Contact No.</InputLabel>
                                <Input id="contactNumber" className="inputField" type="number" onChange={this.registerChangeHandler}></Input>
                                <FormHelperText className={this.state.contactNumberRequired}><span className="red">{this.state.contactNumberRequiredText}</span></FormHelperText>
                            </FormControl><br /><br />
                            <Button variant="contained" color="primary" onClick={this.registerHandler}>SIGNUP</Button>
                        </TabContainer>}
                </Modal>
            </div>
        )
    }
}

export default withStyles(styles)(Header);