import React from "react";
import { Link } from "react-router-dom";

import logo502 from "./502_Error_logo.webp";
import logo404 from "./404_Error_logo.webp";
import StartBlock from "../StartBlock/StartBlock";
import Header from "../Header/Header";

import cssServerError from './ServerError.module.css';

function ServerError() {
    let head502 = "Упс...";
    let text502 = "Кажется, что-то пошло не так. Мы уже работаем над устранением этой проблем.";
    let alt502 = "Error 502"

    let head404 = "Такой страницы нет";
    let text404 = "Возможно, вы ошиблись в адресе страницы,либо она была удалена.";
    let alt404 = "Error 402"

    const remove ={
        display:'none'
    };

    // return (
    //     <>
    //     <Header imgStyle={remove} navStyle={remove} btnStyle={remove}/>
    //     <main className = {cssServerError.contentServerError}>
    //         <StartBlock headingBlock = {head502} alt={alt502} logo = {logo502} textDescription={text502}/>
    //     </main> 
        
    //     </>
    // )
    return (
        <>
            <Header imgStyle={remove} navStyle={remove} />
            <main className = {cssServerError.contentServerError}>
                <StartBlock headingBlock = {head404} alt={alt404} logo = {logo404} textDescription={text404}/>
                <Link to="/" ><button className={cssServerError.btnToMain}>Перейти на главную</button></Link>
            </main> 
        </>
    )  
}

export default ServerError;