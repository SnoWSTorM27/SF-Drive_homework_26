import React from "react";

import cssBlockDescription from "./BlockDescription.module.css"
        
function BlockDescription (props) {
        
    return (
        <div className ={cssBlockDescription.boxDescriptionMain} >
            <img src={props.logo} alt={props.alt} className={cssBlockDescription.logoBlock} />
            <div className={cssBlockDescription.wrapperTextBlock} > 
                <h2 className={cssBlockDescription.headingBlockMain} > {props.headingBlock} </h2>
                <p className={cssBlockDescription.textDescriptionBlockMain} > { props.textDescription } </p>
            </div>       
        </div>  
    );
}

export default BlockDescription;