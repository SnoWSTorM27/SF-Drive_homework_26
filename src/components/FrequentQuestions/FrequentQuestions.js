import React from "react";

import StartBlockQuestions from "../StartBlockQuestions/StartBlockQuestions";
import Questions from "../Questions/Questions";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import cssFrequentQuestions from "./FrequentQuestions.module.css";

function FrequentQuestions() {
    
    return (
        <>
        <Header />
        <main>
            <section className ={cssFrequentQuestions.FrequentQuestions} >
                <StartBlockQuestions headingBlock={"Частые вопросы"} />
                <Questions />
            </section>  
        </main>
        <Footer Copyright="© SkillDrive Inc. 2020" /> 
        </>
    ) 
}

export default FrequentQuestions;