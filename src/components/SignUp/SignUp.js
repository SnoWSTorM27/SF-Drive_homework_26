import React from "react";

import cssSignUp from "./SignUp.module.css";

import FormBlock from "../FormBlock/FormBlock";
import Header from "../Header/Header";
        
function SignUp () {
    return (
        <>
        <Header />
        <main>
            <section className={cssSignUp.signUpStep1}>
                <p className={cssSignUp.steps}>Шаг 1 из 3</p>
                <h1>Расскажите о себе</h1>
                <FormBlock />
                
            </section>
        </main>
        </>
    ); 
}

export default SignUp;