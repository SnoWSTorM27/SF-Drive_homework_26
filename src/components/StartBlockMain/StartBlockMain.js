import React from "react";
import { Link } from "react-router-dom";
import logoMainMobile from "./logoMainMobile.webp";
import cssStartBlockMain from "./StartBlockMain.module.css"

        
function StartBlockMain (props) {
    let textDescription = "Будьте всегда за рулём во время путешествий и командировок.";    

    return (
        <section className ={cssStartBlockMain.startBlockMain} >
            <picture>
                <img src={props.logo} alt="logo Main" className={cssStartBlockMain.logoBlockMain} />
                <source className={cssStartBlockMain.logoMainMobile} srcSet={props.logoMainMobile} media="max-width:1350px" type="image/webp" />
            </picture>
            <div className={cssStartBlockMain.wrapperTextMain} > 
                <h1 className={cssStartBlockMain.headingMain} > {props.headingBlock} </h1>
                <p className={cssStartBlockMain.textDescriptionMain} > { textDescription } </p>
                <Link to="/signUp"><button className={cssStartBlockMain.btnSignUp} >Зарегистрироваться</button></Link>
            </div>       
        </section>  
    );
}

export default StartBlockMain;