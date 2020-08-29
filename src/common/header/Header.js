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
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


const styles = theme => ({
    searchRestaurantTextInput: {
        color: 'white',
        'padding-bottom': '2px',
        '&:after': {
            'border-bottom': '2px solid white',
        },
        profileButton: {
            'padding-bottom': '8px',
            'padding-top': '8px',
            margin: '10px 15px 10px 5px'
        }
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
            loginContactNoRequiredText: 'required',
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
            registerPasswordRequiredText: 'required',
            contactNumberRequired: 'displayNone',
            contactNumberRequiredText: 'required',
            snackbarIsOpen: false,
            signupErrorMessage: '',
            signupErrorMessageRequired: 'displayNone',
            loginErrorMessageRequired: 'displayNone',
            loginErrorMessage: '',
            snackbarMessage: '',
            loginUsername: 'Preeteesh',
            isLoggedIn: false,
            anchorEl: '',
            OpenMenu: false
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
            registerPasswordRequiredText: 'required',
            contactNumberRequired: 'displayNone',
            contactNumberRequiredText: 'required'
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
            registerPasswordRequiredText: 'required',
            contactNumberRequired: 'displayNone',
            contactNumberRequiredText: 'required'
        })
    }
    loginHandler = () => {

        if (this.validateLoginForm()) {
            let xhr = new XMLHttpRequest();
            let thisComponent = this;
            xhr.addEventListener('readystatechange', function () {
                if (this.readyState === 4) {
                    if (this.status === 200) {
                        let loginResponse = JSON.parse(this.response);
                        thisComponent.setState({ snackbarIsOpen: true, snackbarMessage: 'Logged in successfully!', loginUsername: loginResponse.first_name, isLoggedIn: true })
                        sessionStorage.setItem('access-token', this.getResponseHeader('access-token'));
                        sessionStorage.setItem('username', loginResponse.first_name);
                        sessionStorage.setItem('isLoggedIn', true);
                        thisComponent.closeModalHandler();
                        console.log(sessionStorage.getItem('access-token'));
                    } else if (this.status === 401) {
                        let response = JSON.parse(this.response);
                        if (response.code === 'ATH-001' || response.code === 'ATH-002') {
                            thisComponent.setState({ loginErrorMessage: response.message, loginErrorMessageRequired: 'displayFormHelperText' });
                        }
                    }
                }
            })
            let data = null;
            let authorization = window.btoa(this.state.loginContactNo + ':' + this.state.loginPassword);
            xhr.open('POST', 'http://localhost:8080/api/customer/login');
            xhr.setRequestHeader('Authorization', 'Basic ' + authorization);
            xhr.setRequestHeader('Cache-Control', 'no-cache');
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(data);
        }
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

        if (this.validateSignUpForm()) {
            let xhr = new XMLHttpRequest();
            let thisComponent = this;
            xhr.addEventListener('readystatechange', function () {
                if (this.readyState === 4) {
                    if (this.status === 201) {
                        thisComponent.setState({ snackbarIsOpen: true, value: 0, snackbarMessage: 'Registered successfully! Please login now!' })
                    } else if (this.status === 400) {
                        let response = JSON.parse(this.response);
                        if (response.code === 'SGR-001') {
                            thisComponent.setState({ signupErrorMessage: response.message, signupErrorMessageRequired: 'displayFormHelperText' });
                        }
                    }
                }
            })
            let data = {
                'contact_number': this.state.contactNumber,
                'email_address': this.state.email,
                'first_name': this.state.firstName,
                'password': this.state.rpassword,
                'last_name': this.state.lastName
            };
            let signupData = JSON.stringify(data);
            xhr.open('POST', 'http://localhost:8080/api/customer/signup');
            xhr.setRequestHeader('Cache-Control', 'no-cache');
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(signupData);
        }
    }

    validateSignUpForm = () => {
        let emailRegex = new RegExp('^[\\w-_\\.+]*[\\w-_\\.]@([\\w]+\\.)+[\\w]+[\\w]$');
        let passwordRegex = new RegExp('^(?=.*[a-z]){3,}(?=.*[A-Z]){2,}(?=.*[0-9]){2,}(?=.*[!@#$%^&*()--__+.]){1,}.{8,}$');
        let contactNoRegex = new RegExp('^\\d{10}$');
        let isValid = true;

        if (this.state.firstName === '') {
            this.setState({ firstNameRequired: 'displayFormHelperText' });
            isValid = false;
        } else {
            this.setState({ firstNameRequired: 'displayNone' });
        }
        if (this.state.email === '') {
            this.setState({ emailRequired: 'displayFormHelperText' });
            isValid = false;
        } else if (this.state.email.length > 0 && !emailRegex.test(this.state.email)) {
            this.setState({ emailRequired: 'displayFormHelperText', emailRequiredText: 'Invalid Email' });
            isValid = false;
        } else {
            this.setState({ emailRequired: 'displayNone' });
        }
        if (this.state.rpassword === '') {
            this.setState({ registerPasswordRequired: 'displayFormHelperText' });
            isValid = false;
        } else if (this.state.rpassword.length > 0 && !passwordRegex.test(this.state.rpassword)) {
            this.setState({ registerPasswordRequired: 'displayFormHelperText', registerPasswordRequiredText: 'Password must contain at least one capital letter, one small letter, one number, and one special character' });
            isValid = false;
        } else {
            this.setState({ registerPasswordRequired: 'displayNone' });
        }
        if (this.state.contactNumber === '') {
            this.setState({ contactNumberRequired: 'displayFormHelperText' });
            isValid = false;
        } else if (this.state.contactNumber.length > 0 && !contactNoRegex.test(this.state.contactNumber)) {
            this.setState({ contactNumberRequired: 'displayFormHelperText', contactNumberRequiredText: 'Contact No. must contain only numbers and must be 10 digits long' });
            isValid = false;
        } else {
            this.setState({ contactNumberRequired: 'displayNone' });
        }
        return isValid;
    }

    validateLoginForm = () => {
        let contactNoRegex = new RegExp('^\\d{10}$');
        let isValid = true;

        if (this.state.loginContactNo === '') {
            this.setState({ loginContactNoRequired: 'displayFormHelperText' });
            isValid = false;
        } else if (this.state.loginContactNo.length > 0 && !contactNoRegex.test(this.state.loginContactNo)) {
            this.setState({ loginContactNoRequired: 'displayFormHelperText', loginContactNoRequiredText: 'Contact No. must contain only numbers and must be 10 digits long' });
            isValid = false;
        } else {
            this.setState({ loginContactNoRequired: 'displayNone' });
        }

        if (this.state.loginPassword === '') {
            this.setState({ loginpasswordRequired: 'displayFormHelperText' });
            isValid = false;
        } else {
            this.setState({ loginpasswordRequired: 'displayNone' });
        }
        return isValid;
    }

    closeSnackbar = () => {
        this.setState({ snackbarIsOpen: false })
    }
    showMenuHandler = (event) => {
        this.setState({ anchorEl: event.currentTarget })
        this.setState({ OpenMenu: true })
    }
    clickLogoutHandler = () => {
        let xhr = new XMLHttpRequest();
        let thisComponent = this;
        xhr.addEventListener('readystatechange', function () {
            if (this.readyState === 4 && this.status === 200) {
                sessionStorage.clear();
                thisComponent.setState({ isLoggedIn: false, OpenMenu: false });
            }
        });
        let data = null;
        xhr.open('POST', 'http://localhost:8080/api/customer/logout');
        xhr.setRequestHeader('authorization', 'Bearer ' + sessionStorage.getItem('access-token'));
        xhr.setRequestHeader('Cache-Control', 'no-cache');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(data);
        sessionStorage.removeItem('access-token');
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('isLoggedIn', false);
        console.log("After logout",sessionStorage.getItem('access-token'));

    }
    handleClose = (event) => {
        this.setState({ OpenMenu: false })
    }
    componentDidMount() {
        if (sessionStorage.getItem('isLoggedIn')) {
            this.setState({ loginUsername: sessionStorage.getItem('username'), isLoggedIn: sessionStorage.getItem('isLoggedIn') });
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
                                onChange={this.props.searchHandler}
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
                            {this.state.isLoggedIn ?
                                <Button variant="contained" color="default" className="profile-button" startIcon={<AccountCircle />} onClick={this.showMenuHandler}>
                                    {this.state.loginUsername}
                                </Button> :
                                <Button variant="contained" color="default" startIcon={<AccountCircle />} onClick={this.modalHandler}>
                                    LOGIN
                                </Button>
                            }
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
                                <FormHelperText className={this.state.loginContactNoRequired}><span className="red">{this.state.loginContactNoRequiredText}</span></FormHelperText>
                            </FormControl><br />
                            <FormControl required>
                                <InputLabel htmlFor="loginPassword">Password</InputLabel>
                                <Input id="loginPassword" className="inputField" type="password" password={this.state.loginPassword} onChange={this.loginChangeHandler}></Input>
                                <FormHelperText className={this.state.loginpasswordRequired}><span className="red">required</span></FormHelperText>
                                <FormHelperText className={this.state.loginErrorMessageRequired}><span className="red">{this.state.loginErrorMessage}</span></FormHelperText>
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
                                <FormHelperText className={this.state.signupErrorMessageRequired}><span className="red">{this.state.signupErrorMessage}</span></FormHelperText>
                            </FormControl><br /><br />
                            <Button variant="contained" color="primary" onClick={this.registerHandler}>SIGNUP</Button>
                        </TabContainer>}
                </Modal>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.snackbarIsOpen}
                    message={this.state.snackbarMessage}
                    autoHideDuration={10}
                    action={
                        <React.Fragment>
                            <IconButton size="small" aria-label="close" color="inherit" onClick={this.closeSnackbar}>
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </React.Fragment>
                    }
                />

                <Menu
                    id="simple-menu"
                    anchorEl={this.state.anchorEl}
                    keepMounted
                    open={this.state.OpenMenu}
                    onClose={this.handleClose}
                >
                    <MenuItem onClick={this.props.clickProfile}>My Account</MenuItem>
                    <MenuItem onClick={this.clickLogoutHandler}>Logout</MenuItem>
                </Menu>
            </div>
        )
    }
}

export default withStyles(styles)(Header);