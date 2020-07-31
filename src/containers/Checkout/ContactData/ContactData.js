import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';
class ContactData extends Component {
    state = {
        orderForm:{
                    name:{
                        elementType:'input',
                        elementConfig: {
                            type: 'text',
                            placeholder: 'yourname'
                        },
                        value: ''
                    },
                    street: {
                        elementType:'input',
                        elementConfig: {
                            type: 'text',
                            placeholder: 'street'
                        },
                        value: ''
                    },
                    zipCode: {
                        elementType:'input',
                        elementConfig: {
                            type: 'text',
                            placeholder: 'zipcode'
                        },
                        value: ''
                    },
                    country: {
                        elementType:'input',
                        elementConfig: {
                            type: 'text',
                            placeholder: 'country'
                        },
                        value: ''
                    },
                    email: {
                        elementType:'input',
                        elementConfig: {
                            type: 'email',
                            placeholder: 'mail'
                        },
                        value: ''
                    },
                    deliveryMethod: {
                        elementType:'select',
                        elementConfig: {
                            options:[
                                {value: 'fastest', display:'Fastest'},
                                {value: 'cheapest', display:'Cheapest'}]
                        },
                        value: ''
                    },
        
      
        },
        loading: false
    }

    orderHandler = ( event ) => {
        //einai gia na mi steilei mono t request otan kanw reload t selida
        event.preventDefault();
        this.setState( { loading: true } );
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price
        }   
        axios.post( '/orders.json', order )
            .then( response => {
                this.setState( { loading: false } );
                this.props.history.push('/');
            } )
            .catch( error => {
                this.setState( { loading: false } );
            } );
    }

    render () {
        const formElementArray=[];

        for (let keys in this.state.orderForm){
            formElementArray.push({
                id:keys,
                config: this.state.orderForm[keys]
            });
        }
        let form = (
            <form>
                {formElementArray.map(formElement=> (
                    <Input 
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}/> 

                    // to config to pairnei apo t loop epanw gia na perasei ta stoixeio apo to state
                ))}
                
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
        );
        if ( this.state.loading ) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;