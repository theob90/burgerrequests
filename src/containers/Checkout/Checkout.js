import React, { Component } from 'react';
import CheckoutSummary from './CheckoutSummary/CheckoutSummary';
import  {Route} from 'react-router-dom';
import ContactData from './ContactData/ContactData';
// import axios from '../../axios-orders';



class Checkout extends Component{
    
    state ={
        ingredients: null,
        price:0

        
    }

    componentWillMount () {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients ={};
        let price = 0;
        for ( let param of query.entries() ){
            if(param[0] === 'price'){
                price = param[1];
            }
            else {
                ingredients[param[0]] = +param[1]; // to + to kanei convert se noumer

            }
        }
        this.setState({ingredients: ingredients, totalPrice: price })
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
                <Route path={this.props.match.path + '/contact-data'}
                // thelw na perasw ta ingredients st contactData

                //vazw props gia na mporesei na leitourgisei st histori st contact data
                render ={(props) => (<ContactData ingredients={this.state.ingredients} price= {this.totalPrice} {...props}/>)} />
            </div>
        );
    }
}


export default Checkout;
