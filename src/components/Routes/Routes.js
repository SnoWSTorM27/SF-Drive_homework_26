import React from "react";
import { BrowserRouter as Redirect, Switch, Route } from "react-router-dom"


import AboutUs from "../AboutUs/AboutUs";
import Authorization from "../Authorization/Authorization";
import Recovery from "../Recovery/Recovery";

import FrequentQuestions from '../FrequentQuestions/FrequentQuestions';
import Main from "../Main/Main";
import SignUp from "../SignUp/SignUp";

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route exact path='/au' component={AboutUs} />
                <Route path='/fq' component={FrequentQuestions} />
                <Route path='/signUp' component={SignUp} />
                <Route path='/auth' component={Authorization} />
                <Redirect to path='/au' component={AboutUs} />
                <Route exact path='/' component={Main} />
                <Route path='/auth' component={Authorization} />
                <Route path='/recovery' component={Recovery} />
            </Switch>
        )
    } 
    return(
        <Switch>
            <Route exact path='/' component={Main} />
            <Route path='/auth' component={Authorization} />
            <Route path='/recovery' component={Recovery} />
            <Redirect to path='/' component={Main} />
        </Switch>
    )  
}