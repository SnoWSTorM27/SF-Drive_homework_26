import React, { useState } from "react";
import Authorization from "../Authorization/Authorization";
import Recovery from "../Recovery/Recovery";

export const MODAL_STATES = {
    Auth: 0,
    Recovery: 1
}

export default function Modal(props){
    const[modalState, setModalState] = useState(0);
    
    const childrenComponents = [
        <Authorization setModalState={setModalState} setTrigger={props.setTrigger} />,
        <Recovery setModalState={setModalState} setTrigger={props.setTrigger} />
    ]
    
    return (props.trigger) ? (
        <>
            {childrenComponents[modalState]}
        </>
    ) : null;

}