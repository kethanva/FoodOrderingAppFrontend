import React, {Component} from 'react';
import './Checkout.css';
import 'bootstrap/dist/css/bootstrap.css';
import {withStyles} from '@material-ui/core/styles';
import Header from '../../common/header/Header';
import Grid from '@material-ui/core/Grid';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({

    stepperButton: {
        marginTop: theme.spacing(2),
        marginRight: theme.spacing(2),
    },
    mainContainer: {
        marginBottom: theme.spacing(2) * 2,
    },
    summaryCard: {
        paddingRight: theme.spacing(2) * 3,
    },
    resetContainer: {
        padding: theme.spacing(2) * 3,
    },
    tabRoot: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    existingAddressTab: {
        float: 'left',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
        overflowY: 'hidden',
    },
    existingAddressGridListTile: {
        marginBottom: '50px',
        cursor: 'pointer',
    },
    existingAddressGridListTile2: {
        padding: '25px',
    },
    existingAddressCircle: {
        float: 'right',
        marginRight: '10px',
    },
    newAddressStateSelect: {
        width: '194px',
    },
    radioRoot: {
        display: 'flex',
    },
    radioFormControl: {
        margin: theme.spacing(2) * 3,
    },
    radioGroup: {
        margin: `${theme.spacing(2)}px 0`,
    },
    summaryCardDivider: {
        marginTop: '5px',
    },
    placeOrderButton: {
        marginTop: '20px',
    },
    greyColor: {
        color: 'grey',
    },
});

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: 50 * 4 + 8,
            width: 300,
        },
    },
};

function getSteps() {
    return ['Delivery', 'Payment'];
};

function TabContainer(props) {
    return (
        <Typography component='div' style={{padding: 8 * 3}}>
            {props.children}
        </Typography>
    )
};

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customerCart: {},
            activeStep: 0,
            tabValue: 0,
            selectedExistingAddress: null,
            flatBuildingNoRequired: 'display-none',
            flatBuildingNo: '',
            localityRequired: 'display-none',
            locality: '',
            cityRequired: 'display-none',
            city: '',
            stateRequired: 'display-none',
            newAddressState: '',
            pincodeRequired: 'display-none',
            pincodeRequiredMsg: 'required',
            pincode: '',
            customerExistingAddresses: [],
            states: [],
            paymentModes: [],
            radioValue: '',
            selectedPaymentMode: null

        }
    };

    preState = {
        activeStep: 0,
    };

    componentWillMount() {
        this.setState({
            customerCart: this.props.location.checkoutCart
        });
    };





    componentWillUnmount() {

    }

    componentDidMount() {


    }

    render() {
        const {classes} = this.props;
        const steps = getSteps();
        const {activeStep} = this.state;
        const {tabValue} = this.state;

        return (
            <div>
                <Header/>
                <Grid container={true}>
                    <Grid item={true} xs={9}>
                        <div>
                            <Stepper activeStep={activeStep} orientation='vertical'>
                                {steps.map((label, index) => (
                                    <Step key={label}>
                                        <StepLabel>{label}</StepLabel>
                                        <StepContent>
                                            {index === 0 ?
                                                <div className={classes.tabRoot}>
                                                    <AppBar position='static'>
                                                        <Tabs value={tabValue} onChange={this.tabChangeHandler}>
                                                            <Tab label='EXISTING ADDRESS'/>
                                                            <Tab label='NEW ADDRESS'/>
                                                        </Tabs>
                                                    </AppBar>
                                                </div>
                                                </Stepper>
                            </CardContent>
                        </Card>
                    </Grid>

                </Grid>


                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.openPlaceOrderMsg}
                    autoHideDuration={5000}
                    onClose={this.placeOrderMsgOnCloseHandler}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id='message-id'>{this.state.placeOrderMsg}</span>}
                    action={[
                        <IconButton
                            key='close'
                            aria-label='Close'
                            color='inherit'
                            onClick={this.placeOrderMsgOnCloseHandler}
                        >
                            <CloseIcon/>
                        </IconButton>,
                    ]}
                />
            </div>
        );
    }
}

Checkout.propTypes = {
    classes: PropTypes.object,
};

export default withStyles(styles)(Checkout);
