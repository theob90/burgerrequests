import React, { Component } from 'react';
import CheckoutSummary from './CheckoutSummary/CheckoutSummary';
import  {Route} from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends Component{
    
    state ={
        ingredients: {
            salad:1,
            meat: 1,
            cheese:1,
            bacon:1

        }
    }

    componentDidMount(){
        const query = new URLSearchParams(this.props.location.search);
        const ingredients ={};
        for (let param of query.entries()){
            ingredients[param[0]] = +param[1] // to + to kanei convert se noumer
        }
        this.setState({ingredients: ingredients})
    }

    // epeidi exoume Router apo to app 
    //mporw na xrisimopoiisw to history

    checkoutCanceledHandler = () => {

        this.props.history.goBack();
    }

    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return(
            <div>
                <CheckoutSummary ingredients={this.state.ingredients}
                checkoutCanceled={this.checkoutCanceledHandler}
                checkoutContinue={this.checkoutContinueHandler}/>
                <Route path={this.props.match.path + '/contact-data'} component={ContactData} />
            </div>
        );
    }
}


export default Checkout;
