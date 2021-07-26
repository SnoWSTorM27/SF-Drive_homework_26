import React, {useEffect, useState}  from "react";


import logo from "./logo_recovery.webp";
import vectorLeft from "./Vector_left.webp";
import closer from "./close_icon.svg";
import TextField from '@material-ui/core/TextField';
import cssRecovery from "./Recovery.module.css";
import { MODAL_STATES } from "../Modal/Modal";

export default function Recovery(props) {
    
    const handleOnClick = () => props.setModalState(MODAL_STATES.Auth);
    const handleClose = () => {
        props.setTrigger(false)
        props.setModalState(MODAL_STATES.Auth)
    }

    const [email, setEmail] = useState("");
    const [emailDirty, setEmailDirty] = useState(false); 
    const [emailError, setEmailError] = useState("Email не может быть пустым");    
    
    const blurHandler = (e) => {
        switch (e.target.name) {
            case "email":
                setEmailDirty(true)
                break
        }
    }
    //validation email
    const emailHandler = (e) =>{
        setEmail(e.target.value)
        const emailRegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!emailRegExp.test(String(e.target.value).toLowerCase())) {
            setEmailError("Некорректный email")
            if (!e.target.value){
                setEmailError("Email не может быть пустым")
            }
        } else {
            setEmailError("")
        }
    }

    //validation form => btn disabled
    const [formValid, setFormValid] = useState(false);

    useEffect(()=>{
        if (emailError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }

    }, [emailError])


        return (
            <>
            <form className ={cssRecovery.modalWindowRecovery} >
                <div className={cssRecovery.headerModalWindow}>
                    <img src={vectorLeft} alt="vector left" onClick={handleOnClick} className={cssRecovery.vectorLeft} />
                    <img src={closer} alt="close" onClick={ handleClose } className={cssRecovery.iconCloseRecovery} /> 
                </div>
                <img src={logo} alt="logo recovery" className={cssRecovery.logoRecovery}/> 
                <p className={cssRecovery.headingRecovery}> Восстановление пароля </p>
                <p className={cssRecovery.textRecovery}>Мы отправим ссылку для восстановления пароля на вашу электронную почту</p>
                {(emailDirty && emailError) && <div className={cssRecovery.errorLabel}>{emailError}</div>}
                <TextField name="email" className={cssRecovery.inputEmailRecovery}
                    error={emailError && emailDirty}
                    id="outlined"
                    label="Электронная почта"
                    defaultValue=""
                    variant="outlined"
                    value={email}
                    onChange={e => emailHandler(e)}
                    onBlur={e => blurHandler(e)}
                    
                />
                
                <button className={cssRecovery.btnRecovery} type="submit" disabled={!formValid}>Отправить</button>
            </form>  
            <div className={cssRecovery.overlayRecovery}></div>
            </>
        )
}
