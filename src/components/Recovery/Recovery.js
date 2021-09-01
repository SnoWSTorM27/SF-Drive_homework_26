import React, {useEffect, useState}  from "react";


import logo from "./logo_recovery.webp";
import vectorLeft from "./Vector_left.webp";
import closer from "./close_icon.svg";
import TextField from '@material-ui/core/TextField';
import cssRecovery from "./Recovery.module.css";
import { MODAL_STATES } from "../Modal/Modal";
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { callApi } from "../../../callApi";

export default function Recovery(props) {
    
    async function changePassword () {
        await callApi("/api/auth/changePass","POST",{email:email, newPassword:password})   
    }

    const handleOnClick = () => props.setModalState(MODAL_STATES.Auth);
    const handleClose = () => {
        props.setTrigger(false)
        props.setModalState(MODAL_STATES.Auth)
    }

    const [email, setEmail] = useState("");
    const [emailDirty, setEmailDirty] = useState(false); 
    // const [emailError, setEmailError] = useState("Email не может быть пустым");  
    const [emailError, setEmailError] = useState(false);  
    
    const [password, setPassword] = useState("");
    const [passwordDirty, setPasswordDirty] = useState(false); 
    // const [passwordError, setPasswordError] = useState("Пароль не может быть пустым");  
    const [passwordError, setPasswordError] = useState(false);  

    const [repeat, setRepeat] = useState("");
    const [repeatDirty, setRepeatDirty] = useState(false); 
    // const [repeatError, setRepeatError] = useState("");
    const [repeatError, setRepeatError] = useState(false);

    const [formErrors, setErrors] = useState([])
    
    const blurHandler = (e) => {
        switch (e.target.name) {
            case "email":
                setEmailDirty(true)
                break
            case "password":
                setPasswordDirty(true)
                break
            case "repeat":
                setRepeatDirty(true)
                break
        }
    }
     //validation email
     const emailHandler = (e) =>{
        setEmail(e.target.value)
        // const emailRegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        // if (!emailRegExp.test(String(e.target.value).toLowerCase())) {
        //     setEmailError("Неверная почта или пароль")
        //     if (!e.target.value){
        //         setEmailError("Email не может быть пустым")
        //     }
        // } else {
        //     setEmailError("")
        // }
    }

    //validation password
    const passwordHandler = (e) =>{
        setPassword(e.target.value)
        // if (e.target.value.length < 4) {
        //     setPasswordError("Неверная почта или пароль")
        // } else if (!e.target.value){
        //     setPasswordError("Пароль не может быть пустым")
        // } else {
        //     setPasswordError("")
        // }
    }

    const repeatHandler = (e) =>{
        setRepeat(e.target.value)
        // if (!e.target.value){
        //     setRepeatError("Пароль не может быть пустым")
        // } else {
        //     setRepeatError("")
        // }
    }

    const validateForm = () => {
        const errors = [];
        let passError = false;
        let repeatError = false;
        let emailError = false;

        if (!passwordDirty && !repeatDirty && !emailDirty) return false
        const emailRegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!emailRegExp.test(String(email).toLowerCase())) {
            errors.push("Неверная почта или пароль")
            emailError = true
        }
        if (!email){
            errors.push("Email не может быть пустым")
            emailError = true
        }
        if (password.length < 4) {
            errors.push("Неверная почта или пароль")
            passError = true
        }
        if (!password){
            errors.push("Пароль не может быть пустым")
            passError = true
        }
        if (password !== repeat) {
            errors.push("Пароли не совпадают")
            repeatError = true
            passError = true
        }
        if (!repeat){
            errors.push("Пароль не может быть пустым")
            repeatError = true
        }
        setErrors(errors)
        setRepeatError(repeatError)
        setPasswordError(passError)
        setEmailError(emailError)
        return !errors.length
    }

    //validation form => btn disabled
    const [formValid, setFormValid] = useState(false);

    useEffect(()=>{
        const isFormValid = validateForm()
        // if (emailError || passwordError || repeatError) {
        //     setFormValid(false)
        // } else {
        //     setFormValid(true)
        // }
        setFormValid(isFormValid)
    }, [email,password, repeat])


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
                
                {/* {(emailDirty && emailError) && <div className={cssRecovery.errorLabel}>{emailError}</div>}
                {!(emailDirty && emailError) ? ((passwordDirty && passwordError) && <div className={cssRecovery.errorLabel}>{passwordError}</div>):null }
                {(!(emailDirty && emailError) && !(passwordDirty && passwordError)) ? ((repeatDirty && repeatError) && <div className={cssRecovery.errorLabel}>{repeatError}</div>):null } */}
                
                {!!formErrors.length && <div className={cssRecovery.errorLabel}>{formErrors[0]}</div>}

                <TextField name="email" className={cssRecovery.inputEmailRecovery}
                    error={(emailError && emailDirty)}
                    id="outlined"
                    label="Электронная почта"
                    defaultValue=""
                    variant="outlined"
                    value={email}
                    onChange={e => emailHandler(e)}
                    onBlur={e => blurHandler(e)}
                    
                />

                <OutlinedInput name="password" className={cssRecovery.inputPasswordRecovery}
                    id="outlined-adornment-password"
                    placeholder="Пароль"
                    type="text"
                    value={password}
                    onChange={e => passwordHandler(e)}
                    onBlur={e => blurHandler(e)}
                    error={(passwordError && passwordDirty)}
                    
                />

                <OutlinedInput name="repeat" className={cssRecovery.inputPasswordRecovery}
                    id="outlined-adornment-password"
                    placeholder="Повторите пароль"
                    type="text"
                    value={repeat}
                    onChange={e => repeatHandler(e)}
                    onBlur={e => blurHandler(e)}
                    error={(repeatError && repeatDirty)}
                    
                />
                
                <button className={cssRecovery.btnRecovery}  onClick={changePassword} type="button" disabled={!formValid}>Смена пароля</button>
            </form>  
            <div className={cssRecovery.overlayRecovery}></div>
            </>
        )
}
