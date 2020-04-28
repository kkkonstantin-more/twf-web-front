import React from 'react';

import { Switch, Route } from "react-router-dom"

import HomePage from "./pages/home-page/home-page.component";
import RatingsPage from "./pages/ratings-page/ratings-page.component";

import GoogleLogin from 'react-google-login';

import './styles/App.scss';

const responseGoogle = (response: any) => {
    alert("Ссылка на аватар пользователя: " + response.profileObj.imageUrl);
};

const App: React.FC = () => {
    return <>
        <div className="u-container u-text-center u-mt-md u-mb-md">
            <h1 className="u-mb-sm">Демо получения изображения пользователя через google auth</h1>
            <GoogleLogin
                clientId="739547301958-dgfpc93t5q1t3tqd4oe7cscfh491876o.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
        </div>
        <Switch>
            <Route exact path={"/"} component={HomePage}/>
            <Route exact path={"/ratings"} component={RatingsPage}/>
        </Switch>
    </>
};

export default App;