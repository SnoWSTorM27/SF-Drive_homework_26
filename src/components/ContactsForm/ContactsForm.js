import React from "react";

import cssContactsForm from "./ContactsForm.module.css"

function ContactsForm (props) {
    return (
        <div className ={cssContactsForm.contactsForm}>
            <p className={cssContactsForm.type}> { props.type } </p>
            <a href="" className={cssContactsForm.info}> { props.info } </a>
        </div>
    )  
}

export default ContactsForm;