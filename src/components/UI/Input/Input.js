import React from 'react';
import classes from './Input.css';


const input  = (props) => {
       

    let inputElement=null;
    const inputClasses = [classes.InputElement];


    if (props.invalid && props.shouldValidate && props.touched){
        inputClasses.push(classes.Invalid);
    }
    // elementType apo to ContactData
    switch (props.elementType) {
        case ('input'):
            inputElement = <input className={inputClasses.join (' ')}
              {...props.elementConfig}
               value={props.value} onChange={props.changed}/>;
            break;
        case('textarea'):
        inputElement = <textarea className={inputClasses}
         {...props.elementConfig}
          value={props.value} onChange={props.changed} />;
        break;
        case( 'select'):

        inputElement = <select 
        className={inputClasses}
        value={props.value}
            onChange={props.changed}>
            {props.elementConfig.options.map(option =>(
            //    to pairnei apo contact Data ...state
               <option key={option.value}
                value ={option.value}>
                {option.display}
                </option>
            ))}
        </select>
        
        break;
            
        default:
            inputElement = <input className={classes.InputElement}{...props.elementConfig} value={props.value}onChange={props.changed}/>;
    }
    return (

       <div className={classes.InputElement}>
          <label className={classes.Label}>{props.label}</label>
          {inputElement}
        
        </div>
    );

};

export default input ;