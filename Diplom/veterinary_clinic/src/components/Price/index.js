import stylesprice from './Price.module.css';
import React from 'react';

function Price(props){
    return(
        <nav >
            <div className={stylesprice.ListServ} style={props.style} >
                <div >
                    <p>{props.service}</p>
                    <p>{props.price}</p>
                </div>
            </div>
        </nav>
    );
};
export default Price;