import React from 'react';
import './global.css';

export const LayoutBody = (props) => {
    return(
        <body className="body">
            <div className="bar">
                
            </div>
            
            {props.children}
           
        </body> 
    )
}