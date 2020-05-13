import React, { useState } from "react";
import translate from "../../translations/translate";
import { LOCALES } from "../../translations";

// using hash-link package to use anchor links
import { HashLink as Link } from "react-router-hash-link";

// icons for mobile navigation
import Icon from "@mdi/react";
import { mdiMenu, mdiCloseCircleOutline } from "@mdi/js";

import navigationLinks, { LinkInterface } from "./navigation-links";

import "./navigation-bar.scss";

// props transported from App.tsx
interface NavigationBarProps {
  setLanguage: React.Dispatch<string>;
  currentLanguage: string;
}

const NavigationBar: React.FC<NavigationBarProps> = ({
  setLanguage,
  currentLanguage,
}) => {
  const logoUrl: string = require("../../assets/logo.svg");
  const [showMobileNavigation, setShowMobileNavigation] = useState<boolean>(
    false
  );

  return (
    <div className="navigation-bar__wrapper">
      <div className="navigation-bar u-container">
        <Link to="/" className="navigation-bar__logo">
          <img src={logoUrl} alt="logo" width="100%" />
        </Link>
        <div className="navigation-bar__language-switchers">
          <span
            className={`navigation-bar__language-switcher ${
              currentLanguage === LOCALES.RUSSIAN ? "active" : ""
            }`}
            onClick={() => setLanguage(LOCALES.RUSSIAN)}
          >
            Ru
          </span>
          <span
            className={`navigation-bar__language-switcher ${
              currentLanguage === LOCALES.ENGLISH ? "active" : ""
            }`}
            onClick={() => setLanguage(LOCALES.ENGLISH)}
          >
            En
          </span>
        </div>
        <div
          className={`navigation-bar__links ${
            showMobileNavigation ? "open" : ""
          }`}
        >
          <div
            style={{ display: showMobileNavigation ? "block" : "none" }}
            onClick={() => setShowMobileNavigation(false)}
          >
            <Icon
              path={mdiCloseCircleOutline}
              className="navigation-bar__close-button"
            />
          </div>
          {navigationLinks.map((link: LinkInterface) => (
            <Link
              to={link.path}
              key={link.linkNameId}
              className={`navigation-bar__link`}
              onClick={() =>
                showMobileNavigation ? setShowMobileNavigation(false) : null
              }
            >
              {translate(link.linkNameId)}
            </Link>
          ))}
        </div>

        <div onClick={() => setShowMobileNavigation(true)}>
          <Icon
            path={mdiMenu}
            className="navigation-bar__hamburger-menu-button"
          />
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
