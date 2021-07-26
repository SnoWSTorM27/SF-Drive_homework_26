import React from "react";

import cssPersonItem from "./PersonItem.module.css";

function PersonItem () {
    let persons = [
        {"name":"Иван",
        "surname":"Иванов",
        "position":"СЕО"},
        
        {"name":"Алексей",
        "surname":"Смирнов",
        "position":"Frontend-разработчик"},

        {"name":"Денис",
        "surname":"Ярцев",
        "position":"Backend-разработчик"},
        
        {"name":"Николай",
        "surname":"Морозов",
        "position":"Дизайнер"},
        
        {"name":"Ирина",
        "surname":"Деева",
        "position":"Копирайтер"},

        {"name":"Мария",
        "surname":"Стрелкова",
        "position":"SMM"}
    ];  
    
    let personBlocks = persons.map((person,index) => {
        return <div key={index} className={cssPersonItem.personItem}>
                    <img src={`assets/photo_${person.name}_${person.surname}.webp`} />
                    <h4> { person.name } { person.surname } </h4>
                    <h5> { person.position } </h5>
                </div> 
    });

    return (
      personBlocks
    )  
}

export default PersonItem;
