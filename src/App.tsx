import React, { useState } from "react";
// translation config
import { TranslationProvider } from "./translations";
import { LOCALES } from "./translations";
// layout
import NavigationBar from "./layouts/navigation-bar/navigation-bar";
import Footer from "./layouts/footer/footer";
// routes
import Routes from "./routes";
// core styles
import "./styles/App.scss";

const App: React.FC = () => {
  const [locale, setLocale] = useState<string>(LOCALES.RUSSIAN);

  return (
    <TranslationProvider locale={locale}>
      {/*passing App's state translation vars to navigation for being able to switch language from navigation across all
       Application*/}
      <NavigationBar currentLanguage={locale} setLanguage={setLocale} />
      <div className="app-content-container">
        <Routes />
      </div>
      <Footer />
    </TranslationProvider>
  );
};

export default App;
