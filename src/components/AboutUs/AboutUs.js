import React from "react";
import logoAU from "./logo_about_us.webp";

import StartBlock from "../StartBlock/StartBlock";
import Contacts from "../Contacts/Contacts";
import Team from "../Team/Team";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import cssAboutUs from './AboutUs.module.css';

function AboutUs() {
    
    return (
        <>
        <Header />
        <main className = {cssAboutUs.contentAboutUs}>
            <StartBlock headingBlock = {"О нас"} logo = {logoAU}/>
            <Contacts />
            <Team />

            
        </main> 
        <Footer Copyright="© SkillDrive Inc. 2020" /> 
        </>
    ) 
}

export default AboutUs;