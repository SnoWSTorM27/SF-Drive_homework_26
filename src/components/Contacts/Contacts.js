import React from "react";

import ContactForm from "../ContactsForm/ContactsForm";
import separator from "./separator.svg";
import cssContacts from "./Contacts.module.css"

function Contacts() {
    let heading = "Контакты";
        return (
            <section className ={cssContacts.contacts} >
                <h2>
                   {heading}
                </h2>
                <div className ={cssContacts.conteinerContacts} >
                    <ContactForm type = "Электронная почта" info = "drive@skillfactory.com" />
                    <img src={separator} alt="separator" className={cssContacts.separator} /> 
                    <ContactForm type = "Телефон" info = "+7 912 123-45-67" />
                </div>
            </section>
        )
}

export default Contacts;