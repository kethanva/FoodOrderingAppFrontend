import React, {Component} from 'react';
import './Checkout.css';

const styles = theme => ({
    mainContainer: {
        marginBottom: theme.spacing(2) * 2,
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
            pincode: ''
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

    }
}

Checkout.propTypes = {
    classes: PropTypes.object,
};

export default withStyles(styles)(Checkout);
