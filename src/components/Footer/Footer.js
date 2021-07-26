import React from "react";

import logoVK from "./logo_vk.webp";
import logoinstagram from "./logo_instagram.webp";
import logoFacebook from "./logo_facebook.webp";

import cssFooter from "./Footer.module.css";

function Footer(props) {
       
    return (
        <footer>
            <p className={cssFooter.footerCopyright}> { props.Copyright } </p>
            <div className={cssFooter.footerContainer}>
                <a className={cssFooter.footerLink} href="" target="_blank" rel="nofollow"><img src={logoVK} alt="logo Вконтакте" /></a>
                <a className={cssFooter.footerLink} href="" target="_blank" rel="nofollow"><img src={logoinstagram} alt="logo instagram" /></a>
                <a className={cssFooter.footerLink} href="" target="_blank" rel="nofollow"><img src={logoFacebook} alt="logo facebook" /></a>
            </div>
            
        </footer>
    )
}

export default Footer;