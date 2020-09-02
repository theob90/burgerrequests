import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';
import button from '../../../components/UI/Button/Button';
class ContactData extends Component {
    state = {
        orderForm:{
                    name:{
                        elementType:'input',
                        elementConfig: {
                            type: 'text',
                            placeholder: 'yourname'
                        },
                        value: '',
                        validation: {
                            required: true
                        },
                        valid:false,
                        touched: false
                    },
                    street: {
                        elementType:'input',
                        elementConfig: {
                            type: 'text',
                            placeholder: 'street'
                        },
                        value: '',
                        validation: {
                            required: true
                        },
                        valid:false,
                        touched: false
                    },
                    zipCode: {
                        elementType:'input',
                        elementConfig: {
                            type: 'text',
                            placeholder: 'zipcode'
                        },
                        value: '',
                        validation: {
                            required: true
                        },
                        valid:false,
                        touched: false
                    },
                    country: {
                        elementType:'input',
                        elementConfig: {
                            type: 'text',
                            placeholder: 'country'
                        },
                        value: '',
                        validation: {
                            required: true
                        },
                        valid:false,
                        touched: false
                    },
                    email: {
                        elementType:'input',
                        elementConfig: {
                            type: 'email',
                            placeholder: 'mail'
                        },
                        value: '',
                        validation: {
                            required: true
                        },
                        valid:false,
                        touched: false
                    },
                    deliveryMethod: {
                        elementType:'select',
                        elementConfig: {
                            options:[
                                {value: 'fastest', display:'Fastest'},
                                {value: 'cheapest', display:'Cheapest'}]
                        },
                        value: '',
                        // vazw t validation gia na mi vgazei error
                        // pio katw st rules required epeidi den eixe validation
                        // t evgaze false
                        
                        validation: {},
                        valid: true
                    },      
        },
        formInvalid:false,
        loading: false
    }

    orderHandler = ( event ) => {
        //einai gia na mi steilei mono t request otan kanw reload t selida
        event.preventDefault();
        this.setState( { loading: true } );
        //thelw n parw t data apo t state
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
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

    checkValidity (value, rules){
        let isValid=true;
        
        if(rules.required) {

            //t trim einai gia t kena stin arxi
            isValid = value.trim() !=='' && isValid;
        }

        if (rules.minLenght){
            isValid = value.lenth >= rules.lenth  && isValid
        }


        return isValid;
    }



    // identifier einai gia na pernei to swsto object apo to state
    //kai n t akllazei
    inputChangedHandler = (event, inputIdentifier) => {
        // console.log(event.target.value);
        const updatedOrderForm = {
            //kanw clone to pinaka , alla de ginontai to nested objects clone
            //alla ginete o poionter
            ...this.state.orderForm
        };
        //kanw clone kai t nested
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm){
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }



        console.log(updatedFormElement);
        // to aristero formisvalid anaferetai st state to deksi sti metavliti apo panw
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
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
            <form onSubmit={this.orderHandler}>
                {formElementArray.map(formElement=> (
                    <Input 
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid = {!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched = {formElement.config.touched}
                    changed ={(event) => this.inputChangedHandler(event,formElement.id)}/> 
                    // to kanw anonymous funct gia na mporesw na perasw arguments st inputChanged
                    //opou id == zipcode street klp
                    // to config to pairnei apo t loop epanw gia na perasei ta stoixeio apo to state
                ))}
                
                {/* //prosoxi epeidi exw diko m buttot to disabled de leitourgei
                //opote prepei n t ftiaksw st Button */}
                <Button btnType="Success" disabled = {!this.state.formInvalid} >ORDER</Button>
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