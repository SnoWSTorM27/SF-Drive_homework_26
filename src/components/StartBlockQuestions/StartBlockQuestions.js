import React, {Fragment} from "react";

import logoQuestion from "./frequent_questions.webp";

import cssStartQuestions from "./StartBlockQuestions.module.css"


function StartBlockQuestions(props) {
    
    let textDescription = "Отвечаем на вопросы, которые у вас могут возникнуть.";    

    return (
        <>
            <img src={logoQuestion} alt="logo Частые вопросы" className={cssStartQuestions.logoBlock} /> 
            <h1> {props.headingBlock} </h1>
            <p className={cssStartQuestions.textDescription} > { textDescription } </p>
        </>  
    ) 
}

export default StartBlockQuestions;