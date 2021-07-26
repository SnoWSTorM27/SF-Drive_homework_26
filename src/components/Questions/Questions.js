import React,{Fragment} from "react";

import cssQuestions from "./Questions.module.css";


function Questions() {
    let questionsAndAnswers = [
        {"questions":"Могу ли я отменить бронь?",
        "answers":"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."},
        
        {"questions":"Могу ли я вернуть деньги, если не подошёл автомобиль?",
        "answers":"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."},
        
        {"questions":"Что делать, если случилось ДТП?",
        "answers":"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."},
        
        {"questions":"Могу ли я оставить автомобиль в удобном для меня месте?",
        "answers":"Данный вопрос обсуждается с собственником, но как правило автомобиль нужно вернуть туда, где вы его получили."},
        
        {"questions":"Что делать, если собственник просит заплатить ему напрямую?",
        "answers":"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."},
        
        {"questions":"Должен ли я заправлять автомобиль?",
        "answers":"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."},
        
    ];  

    function clickColapsibleBlock(event)  {
        
        
            event.target.classList.toggle(cssQuestions.active);
            var content = event.target.nextElementSibling;
            if (content.style.maxHeight){
            content.style.maxHeight = null;
            content.style.marginTop = null;
            content.style.marginBottom = null; 
            } else {
            content.style.maxHeight = content.scrollHeight + "px";
            content.style.marginTop = "20px";
            content.style.marginBottom = "40px";   
            } 
    }
    
    
    let collapsibleButtons = questionsAndAnswers.map((text,index) => {
        return <Fragment key={index}> 
                <button key={index} className={cssQuestions.collapsibleItem} onClick={clickColapsibleBlock}>
                        {text.questions}
                </button> 
                <div className={cssQuestions.collapsibleContent}> 
                    <p> { text.answers } </p>
                </div>
            </Fragment>
    });

    return (
        <div className ={cssQuestions.questionsBlock} >
            {collapsibleButtons}
        </div>
    )    
}

export default Questions;