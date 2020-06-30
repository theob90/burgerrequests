import React from 'react';
import Burger from '../../../components/Burger/Burger';
import Button from '../../../components/UI/Button/Button';
import classes from './CheckoutSummary.css'
const checkoutSummary = (props) => {
    return(
        <div className={classes.checkoutSummary}>
            <h1>We hope it tastes well</h1>
            <div style ={{width: '100%', height: '300px', margin: 'auto'}}>
            <Burger ingredients={props.ingredients}/>
            </div>
            <Button
                btnType="Danger"
                clicked={props.checkoutCanceled}>CANCEL</Button>
            <Button
                btnType="Success"
                clicked={props.checkoutContinue}>Continue</Button>
        </div>
    );

}

export default checkoutSummary;