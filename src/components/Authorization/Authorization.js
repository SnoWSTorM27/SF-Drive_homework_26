import React, { useEffect, useState } from "react";


import { BrowserRouter as Router, Link } from "react-router-dom";

import logoAuth from "./logoAuthorization.webp";
import closer from "./close_icon.svg";
import { useHistory } from "react-router-dom";

import cssAuth from "./Authorization.module.css"
import Recovery from "../Recovery/Recovery";
import { MODAL_STATES } from '../Modal/Modal'

import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import Icon from '@material-ui/core/Icon';
        
function Authorization (props) {

    function handleOnClickRecovery (){
        props.setModalState(MODAL_STATES.Recovery)
    }

    //Состояния почты
    const [email, setEmail] = useState("");
    const [emailDirty, setEmailDirty] = useState(false); 
    const [emailError, setEmailError] = useState("Email не может быть пустым");  
   
    //Состояния пароля
    const [password, setPassword] = useState("");
    const [passwordDirty, setPasswordDirty] = useState(false); 
    const [passwordError, setPasswordError] = useState("Пароль не может быть пустым");  
    
    const blurHandler = (e) => {
        switch (e.target.name) {
            case "email":
                setEmailDirty(true)
                break
            case "password":
                setPasswordDirty(true)
                break
        }
    }
    //validation email
    const emailHandler = (e) =>{
        setEmail(e.target.value)
        const emailRegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!emailRegExp.test(String(e.target.value).toLowerCase())) {
            setEmailError("Неверная почта или пароль")
            if (!e.target.value){
                setEmailError("Email не может быть пустым")
            }
        } else {
            setEmailError("")
        }
    }

    //validation password
    const passwordHandler = (e) =>{
        setPassword(e.target.value)
        if (e.target.value.length < 6) {
            setPasswordError("Неверная почта или пароль")
            if (!e.target.value){
                setPasswordError("Пароль не может быть пустым")
            }
        } else {
            setPasswordError("")
        }
    }

    //validation form => btn disabled
    const [formValid, setFormValid] = useState(false);

    useEffect(()=>{
        if (emailError || passwordError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }

    }, [emailError,passwordError])
    
    return (
        <>
        <form className ={cssAuth.modalWindow} >
            <img onClick={ () => props.setTrigger(false) } src={closer} alt="close icon" className={cssAuth.iconClose} />
            { props.children }
            
            <img src={logoAuth} alt="logo Авторизации" className={cssAuth.logoAuthorization} />
                      
            <p className={cssAuth.headingAuth} >Авторизация</p>
            
            {(emailDirty && emailError) && <div className={cssAuth.errorLabel}>{emailError}</div>}
            {!(emailDirty && emailError) ? ((passwordDirty && passwordError) && <div className={cssAuth.errorLabel}>{passwordError}</div>):null }
            
            <TextField name="email" className={cssAuth.emailAuth}
                error={(emailError && emailDirty) || (passwordError && passwordDirty)}
                id="outlined"
                label="Электронная почта"
                defaultValue=""
                variant="outlined"
                value={email}
                onChange={e => emailHandler(e)}
                onBlur={e => blurHandler(e)}
            />

            <OutlinedInput name="password" className={cssAuth.inputPassword}
                id="outlined-adornment-password"
                placeholder="Пароль"
                type="password"
                value={password}
                onChange={e => passwordHandler(e)}
                onBlur={e => blurHandler(e)}
                error={(emailError && emailDirty) || (passwordError && passwordDirty)}
                endAdornment={
                    <InputAdornment position="end" >
                        <label className={cssAuth.inputLabel} onClick={handleOnClickRecovery}>Забыли?</label>
                    </InputAdornment>
                }
            />
            <button className={cssAuth.btnAuth} type="submit" disabled={!formValid}> Войти </button>
            <Link onClick={ () => props.setTrigger(false) } className={cssAuth.linkToSignUp} to="/signUp" >Зарегистрироваться</Link>    
        </form>  
        <div className={cssAuth.overlay}></div>
        
        </>
    )
    
        
}

export default Authorization;