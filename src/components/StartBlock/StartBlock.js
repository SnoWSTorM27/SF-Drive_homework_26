import React from "react";

import cssStartBlock from "./StartBlock.module.css";

function StartBlock(props) {
    
    let textDescription = "Это учебный проект, созданный с целью получения боевого опыта в разработке настоящего живого веб-приложения. Этот сервис имитирует работу каршеринга, в котором можно не только арендовать автомобили, но и сдавать их в аренду.";    

    return (
        <section className ={cssStartBlock.startBlock} >
            <img src={props.logo} alt="logo О нас" className={cssStartBlock.logoBlock} /> 
            <h1> {props.headingBlock} </h1>
            <p className={cssStartBlock.textDescription}> { textDescription } </p>
        </section>  
    ) 
}

export default StartBlock;