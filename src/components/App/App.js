import React from "react";
import { BrowserRouter as Router } from "react-router-dom"

import "../../styles/css/style.css";
import { useRoutes } from "../Routes/Routes";
import "@babel/polyfill";



function App() {
    

    const routes = useRoutes(true);
    return (
        <Router>
            <div className="page">     
                {routes}       
            </div>
        </Router>
    );
    
}

export default App;