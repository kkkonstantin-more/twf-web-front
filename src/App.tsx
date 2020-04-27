import React from 'react';

import { Switch, Route } from "react-router-dom"

import HomePage from "./pages/home-page/home-page.component";
import RatingsPage from "./pages/ratings-page/ratings-page.component";

import './styles/App.scss';

const App: React.FC = () => {
    return <>
        <Switch>
            <Route exact path={"/"} component={HomePage}/>
            <Route exact path={"/ratings"} component={RatingsPage}/>
        </Switch>
    </>
};

export default App;