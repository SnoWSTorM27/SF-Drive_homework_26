import React, { useState, Fragment, useEffect } from "react";

import {callApi} from "../../../callApi/callApi"

import cssFormBlock from "./FormBlock.module.css";

import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';


import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
// import KeyboardDatePicker from '@material-ui/pickers';

import 'date-fns';

import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import moment, { locale } from "moment";
import {  } from "date-fns/locale/ru";
import "moment/locale/ru";
moment.locale("ru");
import ruLocale from "date-fns/locale/ru";

import {useHttp} from "../../hooks/http.hook";

import InputMask from 'react-input-mask';


function FormBlock () {

    const {loading, request, error, clearError} = useHttp();

   
    // useEffect(()=>{
        
        
    //     clearError()

    // },{error, clearError})


    const registerHandler = async () => {
        const forms = {
            name, 
            birthDay, 
            phone,
            serialPass,
            selectedDatePass,
            provide,
            idPassOffice,
            idDrivingLicense,
            selectedDateDrivingLicence
        }
        Object.keys(forms).forEach(key => forms[key] = forms[key].value);
        // forms.push(password, email)
        forms.password = password;
        forms.email = email;

        console.log(forms)
        if (formValid) await request("/api/auth/registration", "POST", forms);
    }

    //Состояния почты
    const [email, setEmail] = useState("");
    const [emailDirty, setEmailDirty] = useState(false); 
    const [emailError, setEmailError] = useState("Email не может быть пустым");  
   
    //Состояния пароля
    const [password, setPassword] = useState("");
    const [passwordDirty, setPasswordDirty] = useState(false); 
    const [passwordError, setPasswordError] = useState("Пароль не может быть пустым");  

    //Состояния повтора пароля
    const [passwordRepeat, setPasswordRepeat] = useState("");
    const [passwordRepeatDirty, setPasswordRepeatDirty] = useState(false); 
    const [passwordRepeatError, setPasswordRepeatError] = useState("Пароли не совпадают"); 
    
    const blurHandler = (e) => {
        switch (e.target.name) {
            case "email":
                setEmailDirty(true)
                break
            case "password":
                setPasswordDirty(true)
                break
            case "passwordRepeat":
                setPasswordRepeatDirty(true)
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

    //validation password
    const passwordHandler = (e) =>{
        setPassword(e.target.value)
        if (e.target.value.length < 6) {
            setPasswordError("Пароль должен быть не меньше 6 символов")
            if (!e.target.value){
                setPasswordError("Пароль не может быть пустым")
            }
        } else {
            setPasswordError("")
        }
    }

        //validation passwordRepeat
        const passwordRepeatHandler = (e) =>{
            setPasswordRepeat(e.target.value)
            if (e.target.value !== password) {
                setPasswordRepeatError("Пароли не совпадают")
            } else {
                setPasswordRepeatError("")
            }
        }

    //validation form => btn disabled
    const [formValid, setFormValid] = useState(false);

    useEffect(()=>{
        if (emailError || passwordError || passwordRepeatError || formsIsNotEmpty()) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }

    }, [emailError,passwordError,passwordRepeatError])

    const [name, setName] = useState({ value: '', error: null});     
    function onNameChange (e) {
        setName({value: e.target.value, error: null});
    }

    const [birthDay, setBirthDay] = useState( { value: new Date('01-01-1970'), error: null } );
    const handleBirthDay = (date) => {
        setBirthDay({value: date, error: null});
      };

    // const [email, setEmail] = useState({ value: "", error: null } );   
    // function onEmailChange (e) {
    //     setEmail({value: e.target.value, error: null});
    // }

    const [phone, setPhone] = useState({ value: "", error: null } );   
    function onPhoneChange (e) {
        setPhone({value: e.target.value, error: null});
    }

    const [serialPass, setSerealPass] = useState({ value: "", error: null });   
    function onSerialPassChange (e) {
        setSerealPass({value: e.target.value, error: null});
    }

    const [selectedDatePass, setSelectedDatePass] = useState({ value: new Date('01-01-1970'), error: null });
    const handleDateChangePass = (date2) => {
        setSelectedDatePass({value: date2, error: null});
    };

    const [provide, setWhomProvidedPass] = useState({ value: "", error: null });   
    function onWhomProvidedPassChange (e) {
        setWhomProvidedPass({value: e.target.value, error: null});
    }

    const [idPassOffice, setIdPassOffice] = useState({ value: "", error: null });   
    function onIdPassOfficeChange (e) {
        setIdPassOffice({value: e.target.value, error: null});
    }

    const [idDrivingLicense, setIdDrivingLicense] = useState({ value: "", error: null });   
    function onIdDrivingLicenseChange (e) {
        setIdDrivingLicense({value: e.target.value, error: null});
    }

    const [selectedDateDrivingLicence, setSelectedDateDrivingLicence] = useState({ value: new Date('01-01-1970'), error: null })


    const handleDateChangeDrivingLicence = (date3) => {
        setSelectedDateDrivingLicence({value: date3, error: null});
    };

  

    // function handleDateChange (e) {
    //     setSelectedDate(e.target.value);
    // }

    const [values, setValues] = useState({
        amount: '',
        password: '',
        passwordValid: '',
        weight: '',
        weightRange: '',
        showPassword: false,
        error: null
    });

    const handleChange = (prop) => (event) => {
        values.error = null;
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    // // Валидация формы
    // const handleValidation = (value) => {
    //     let validationSuccess = true
    //     const emailRegExp = new RegExp('^[^\s@]+@[^\s@]+$')
        
    //     if (!emailRegExp.test(value.email.value)) {
    //         value.email.error = "Неверная почта"
    //         validationSuccess = false;
    //     }
    //     if (value.password.password !== value.password.passwordValid) {
    //         value.password.error = "Пароли не совпадают"
    //         validationSuccess = false;
    //     }
    //     if (value.password.password.length < 6) {
    //         value.password.error = "Пароль должен быть больше 5 символов"
    //         validationSuccess = false;
    //     }
    //     return validationSuccess
    // }

    const formsIsNotEmpty = () => {
        const forms = [
            name, 
            birthDay, 
            phone,
            serialPass,
            selectedDatePass,
            provide,
            idPassOffice,
            idDrivingLicense,
            selectedDateDrivingLicence
        ].map(field => field.value);
        forms.push(password, email)

        const emptyFields = forms.filter(value => !value);

        if (emptyFields.length !== 0) {
            return true
        } else {
            return false
        }
        
    }

    // const [flag, setValidForm] = useState(true);
    // const isFormInvalid = (isFormInvalid) => {
    //     setValidForm(isFormInvalid);
    // };


   
    // const forms = [];
    // const val = forms.push(name, 
    //     selectedDate,
    //     email,
    //     phone,
    //     serialPass,
    //     selectedDatePass,
    //     provide,
    //     idPassOffice,
    //     idDrivingLicense,
    //     selectedDateDrivingLicence,
    //     values.password
    //     );

    // console.log( values.error)
   
    
    


    // const [value, setValue] = React.useState(new Date());

    return (
        <>
        <form >
            <div className={cssFormBlock.formBlock}>
                <h3 className={cssFormBlock.headingFormBlock}>Информация о вас</h3>

                <div className={cssFormBlock.inputForm}>
                    <p className={cssFormBlock.nameInput}>ФИО</p>
                    <input className={cssFormBlock.typeinput} type="text"  value={name.value} onChange={onNameChange} placeholder="ФИО полностью"/>
                </div>

                <div className={cssFormBlock.inputForm}>
                    <p className={cssFormBlock.nameInput}>Дата рождения</p>
                    
                        <MuiPickersUtilsProvider locale={ruLocale} utils={DateFnsUtils} >
                            
                            <KeyboardDatePicker className={cssFormBlock.dateBirth}
                                locale={"ruLocale"}
                                disableToolbar
                                variant="inline"
                                inputVariant="outlined"
                                format="dd.MM.yyyy"
                                margin="normal"
                                id="date-picker-inline"
                                label=""
                                value={birthDay.value}
                                onChange={handleBirthDay}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                            
                        </MuiPickersUtilsProvider>
                    
                                
                </div>

                <div className={cssFormBlock.inputForm}>
                    <p className={cssFormBlock.nameInput}>Электронная почта</p>
                    <TextField
                        name="email"
                        id="outlined"
                        variant="outlined"
                        type="email"
                        value={email}
                        onChange={e => emailHandler(e)}
                        onBlur={e => blurHandler(e)}
                        error={(emailError && emailDirty)}
                        placeholder="mail@example.com"
                    />
                    {(emailDirty && emailError) && <div className={cssFormBlock.errorlabel}>{emailError}</div>}
                </div>

                <div className={cssFormBlock.inputForm}>
                    <p className={cssFormBlock.nameInput}>Телефон</p>
                    <InputMask className={cssFormBlock.typeinput} type="tel" value={phone.value} onChange={onPhoneChange} placeholder="+7 900 000-00-00" mask="+7 (\999) 999-99-99" maskChar="_" />
                </div>    
            </div>

            <div className={cssFormBlock.formBlock}>
                <h3 className={cssFormBlock.headingFormBlock}>Паспорт</h3>

                <div className={cssFormBlock.inputForm}>
                    <p className={cssFormBlock.nameInput}>Серия и номер</p>
                    <InputMask className={cssFormBlock.typeinput} type="text" value={serialPass.value} onChange={onSerialPassChange} placeholder="0000 000000" mask="9999 999999" maskChar="_" />
                </div>

                <div className={cssFormBlock.inputForm}>
                    <p className={cssFormBlock.nameInput}>Дата выдачи</p>
                    
                        <MuiPickersUtilsProvider  utils={DateFnsUtils}>
                            
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                inputVariant="outlined"
                                format="dd.MM.yyyy"
                                margin="normal"
                                id="date-picker-inline"
                                label=""
                                value={selectedDatePass.value}
                                onChange={handleDateChangePass}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                            
                        </MuiPickersUtilsProvider>
                    
                </div>

                <div className={cssFormBlock.inputForm}>
                    <p className={cssFormBlock.nameInput}>Кем выдан</p>
                    <input className={cssFormBlock.typeinput} type="text" value={provide.value} onChange={onWhomProvidedPassChange} placeholder="Название органа выдавшего паспорт"/>
                </div>

                <div className={cssFormBlock.inputForm}>
                    <p className={cssFormBlock.nameInput}>Код подразделения</p>
                    <InputMask className={cssFormBlock.typeinput} type="text" value={idPassOffice.value} onChange={onIdPassOfficeChange} placeholder="000-000" mask="999-999" maskChar="_" />
                </div>    
            </div>

            <div className={cssFormBlock.formBlock}>
                <h3 className={cssFormBlock.headingFormBlock}>Водительское удостоверение</h3>

                <div className={cssFormBlock.inputForm}>
                    <p className={cssFormBlock.nameInput}>Серия и номер</p>
                    <InputMask className={cssFormBlock.typeinput} type="text" value={idDrivingLicense.value} onChange={onIdDrivingLicenseChange} placeholder="0000 000000" mask="9999 999999" maskChar="_" />
                </div>

                <div className={cssFormBlock.inputForm}>
                    <p className={cssFormBlock.nameInput}>Дата выдачи</p>
                    
                        <MuiPickersUtilsProvider  utils={DateFnsUtils}>
                            
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                inputVariant="outlined"
                                format="dd.MM.yyyy"
                                margin="normal"
                                id="date-picker-inline"
                                label=""
                                value={selectedDateDrivingLicence.value}
                                onChange={handleDateChangeDrivingLicence}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                            
                        </MuiPickersUtilsProvider>
                     
                </div>
            </div>

            <div className={cssFormBlock.formBlock}>
                <h3 className={cssFormBlock.headingFormBlock}>Пароль</h3>

                <div className={cssFormBlock.inputForm}>
                    <p className={cssFormBlock.nameInput}>Придумайте пароль</p>
                    <OutlinedInput
                        name="password"
                        id="outlined-adornment-password"
                        type={values.showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={e => passwordHandler(e)}
                        onBlur={e => blurHandler(e)}
                        error={(passwordRepeatError && passwordRepeatDirty) || (passwordError && passwordDirty)}
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {values.showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                        }
                    />
                </div>

                <div className={cssFormBlock.inputForm}>
                    <p className={cssFormBlock.nameInput}>Повторите пароль</p>
                    <OutlinedInput
                        name="passwordRepeat"
                        id="outlined-adornment-passwordValid"
                        type={values.showPassword ? 'text' : 'password'}
                        value={passwordRepeat}
                        onChange={e => passwordRepeatHandler(e)}
                        onBlur={e => blurHandler(e)}
                        error={(passwordRepeatError && passwordRepeatDirty) || (passwordError && passwordDirty)}
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {values.showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                        }
                    />
                    {(passwordDirty && passwordError) && <div className={cssFormBlock.errorlabel}>{passwordError}</div>}
                    {!(passwordDirty && passwordError) ? ((passwordRepeatDirty && passwordRepeatError) && <div className={cssFormBlock.errorlabel}>{passwordRepeatError}</div>):null }
                </div>
            </div>

            <div className={cssFormBlock.wrapperSubmitBtn}>
                <button 
                    className={cssFormBlock.btnSubmit}
                    type='button'
                    onClick={registerHandler}
                    disabled={!formValid}    
                >
                    Продолжить
                </button>
                
            </div>           
        </form>
      </> 
    );    

}

export default FormBlock;