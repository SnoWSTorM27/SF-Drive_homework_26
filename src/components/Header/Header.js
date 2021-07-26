import React,{useState} from "react";

import Btn from "../Btn/Btn";

import logoSkillDrive from "./Logo_SkillDrive.webp";
import mobileMenu from "./menu-mobile.svg";
import { BrowserRouter as Router, Link } from "react-router-dom";

import cssHeader from "./Header.module.css";
import NavAdaptive from "../NavAdaptive/NavAdaptive";


function Header(props) {
    window.onscroll = function(){scrollFunction()};
    
    function scrollFunction() {
        let scrollPosition = 0;
        let header = document.getElementById("header");

        if ((document.body.scrollTop > scrollPosition) || (document.documentElement.scrollTop > scrollPosition)){
            header.classList.add(cssHeader.active);
        } else {
            header.classList.remove(cssHeader.active);
        }
    }

    const[showNav,setShowNav] = useState(false);

    return (
        
        <header className={cssHeader.header} id="header">
            <Link to="/"> 
                <img src={logoSkillDrive} alt="logo SkillDrive" className={cssHeader.headerLogo} />
            </Link>
            <div>
            </div>
            <nav>
                <Link className={cssHeader.navLink} to="/au">О нас</Link>
                <Link className={cssHeader.navLink}  to="/au">Условия</Link>
                <Link className={cssHeader.navLink}  to="/fq">Частые вопросы</Link>   
                
            </nav>
            <Btn to="/auth" buttonName = "Войти" className={cssHeader.btn} />
            <img onClick={() => setShowNav(true)} className={cssHeader.mobileMenu} src={mobileMenu} alt="mobile menu" />
            <NavAdaptive flag={showNav} setFlag={setShowNav} /> 
        </header>
        
    )
}

export default Header;