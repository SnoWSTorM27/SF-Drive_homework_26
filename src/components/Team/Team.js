import React from "react";
import PersonItem from "../PersonItem/PersonItem";

import cssTeam from "./Team.module.css";

function Team() {
    let headingBlock = "Команда";
    
    return (
        <section className={cssTeam.teamBlock}>
            <h2> { headingBlock } </h2>
            <div className={cssTeam.teamPersons}>
                <PersonItem />
            </div>
        </section>  
    ) 
}

export default Team;