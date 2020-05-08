import React, { useState } from "react";
// ROUTER
import { Switch, Route } from "react-router-dom";
// TRANSLATION CONFIG
import { TranslationProvider } from "./i18n";
import { LOCALES } from "./i18n";
import translate from "./i18n/translate";
// PAGES
import HomePage from "./pages/home-page/home-page";
import RatingsPage from "./pages/ratings-page/ratings-page.component";
// LAYOUT
import NavigationBar from "./layout/navigation-bar/navigation-bar.jsx";

import "./styles/App.scss";

// ===== FOR DEMO PURPOSES ===== //
// fetch avatar from google
// import GoogleLogin from "react-google-login";

// ===== FOR DEMO PURPOSES ===== //
// fetch avatar from google
const responseGoogle = (response: any) => {
  alert("Ссылка на аватар пользователя: " + response.profileObj.imageUrl);
};

const App: React.FC = () => {
  const [locale, setLocale] = useState<string>(LOCALES.RUSSIAN);

  return (
    <TranslationProvider locale={locale}>
      <NavigationBar currentLanguage={locale} setLanguage={setLocale} />
      <Switch>
        <Route exact path={"/"} component={HomePage} />
        <Route exact path={"/ratings"} component={RatingsPage} />
      </Switch>
      {/*<div className="u-container  u-mt-md u-mb-md">*/}
      {/*  <h1 className="u-mb-sm">{translate("demo.fetchAvatar")}</h1>*/}
      {/*  <GoogleLogin*/}
      {/*    clientId="739547301958-dgfpc93t5q1t3tqd4oe7cscfh491876o.apps.googleusercontent.com"*/}
      {/*    onSuccess={responseGoogle}*/}
      {/*    onFailure={responseGoogle}*/}
      {/*    cookiePolicy={"single_host_origin"}*/}
      {/*  />*/}
      {/*</div>*/}
    </TranslationProvider>
  );
};

export default App;
