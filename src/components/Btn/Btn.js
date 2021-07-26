import React, { Component, useEffect,useState } from "react";
import { useHistory } from "react-router-dom";
import Authorization from "../Authorization/Authorization";
import { BrowserRouter as Router, Link } from "react-router-dom";
import cssBtn from "./Btn.module.css";
import Modal from "../Modal/Modal";

function Btn (props) {
    // const history = useHistory();
    // const handleOnClick = () => history.push('/auth');

    const[show,setShow] = useState(false);
    
    return (
        <>
        <button onClick={() => setShow(true)} className={props.className}>{props.buttonName}</button>
        <Modal trigger={show} setTrigger={setShow} />
        </>
    )
   
}

export default Btn;

// cssBtn.btn