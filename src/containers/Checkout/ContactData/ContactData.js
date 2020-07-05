import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner'

import axios from '../../../axios-orders';

class ContactData extends Component{
    
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode:''
        },
        loading: false
       
    }

    orderHandler = (event) => {
        event.preventDefault();
        console.log(this.props.ingredients);
        //alert('You continue!');
        //to .json t  kanw logo firebase
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price:this.props.price,
            customer: {
                name: 'theo bez',
                address:{ 
                    street:'teststreet',
                    country: 'greece'
                },
                email: 'test@test.com'
            },
            delivertMethod: 'fast'
        }        
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false})
                this.props.history.push('/');
            })
            .catch(error =>{
                this.setState({loading: false});
            });

    }
    render(){

        let form = (
            <form>
            <input className={classes.Input} type="text" name="name" placeholder="Your name"></input>
            <input className={classes.Input} type="text" name="email" placeholder="Email"></input>
            <input className={classes.Input} type="text" name="street" placeholder="Street"></input>
            <input className={classes.Input} type="text" name="postal" placeholder="Postalcode"></input>

            <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
        </form>
        );
        if (this.state.loading){
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Data Contact</h4>
                {form}
            </div>
        );
    }

}


export default ContactData;