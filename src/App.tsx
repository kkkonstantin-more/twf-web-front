import React, {useState} from 'react';
// ROUTER
import { Switch, Route } from "react-router-dom"
// TRANSLATION CONFIG
import { TranslationProvider } from "./i18n"
import { LOCALES } from "./i18n";
import translate from "./i18n/translate";
// PAGES
import HomePage from "./pages/home-page/home-page.component";
import RatingsPage from "./pages/ratings-page/ratings-page.component";

import './styles/App.scss';

// ===== FOR DEMO PURPOSES ===== //
// fetch avatar from google
import GoogleLogin from 'react-google-login';
// translation
import { ButtonGroup, Button } from "react-bootstrap"

// ===== FOR DEMO PURPOSES ===== //
// fetch avatar from google
const responseGoogle = (response: any) => {
    alert("Ссылка на аватар пользователя: " + response.profileObj.imageUrl);
};

const App: React.FC = () => {
    const [locale, setLocale] = useState<string>(LOCALES.RUSSIAN);

    return (
        <TranslationProvider locale={locale}>
            <div className="u-container">
                <h1 className="u-mb-sm">
                    { translate("demo.languageSwitcher") }
                </h1>
                <ButtonGroup size="lg">
                    <Button onClick={() => setLocale(LOCALES.RUSSIAN)}>Русский</Button>
                    <Button onClick={() => setLocale(LOCALES.ENGLISH)}>English</Button>
                </ButtonGroup>
            </div>
            <div className="u-container  u-mt-md u-mb-md">
                <h1 className="u-mb-sm">
                    { translate("demo.fetchAvatar") }
                </h1>
                <GoogleLogin
                    clientId="739547301958-dgfpc93t5q1t3tqd4oe7cscfh491876o.apps.googleusercontent.com"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />
            </div>
            <Switch>
                <Route exact path={"/"} component={HomePage}/>
                <Route exact path={"/ratings"} component={RatingsPage}/>
            </Switch>
        </TranslationProvider>
    )
};

export default App;