import React from "react";

import translate from "../../i18n/translate";
import { LOCALES } from "../../i18n";

import { Link } from "react-router-dom";

import "./navigation-bar.scss";

// comprehensive declaration to avoid conflicts with react-router-dom Link
interface LinkInterface {
  linkNameId: string;
  path: string;
}

interface NavigationBarProps {
  setLanguage: React.Dispatch<string>;
  currentLanguage: string;
}

const NavigationBar: React.FC<NavigationBarProps> = ({
  setLanguage,
  currentLanguage,
}) => {
  const logoUrl: string = require("../../assets/logo.svg");
  const links: Array<LinkInterface> = [
    {
      linkNameId: "Для игроков",
      path: "/about-us",
    },
    {
      linkNameId: "Конструктор",
      path: "/about-us",
    },
    {
      linkNameId: "Лекторам",
      path: "/login",
    },
    {
      linkNameId: "О нас",
      path: "/login",
    },
    {
      linkNameId: "Войти",
      path: "/login",
    },
  ];

  return (
    <div className={`navigation-bar__wrapper`}>
      <div className={`navigation-bar u-container`}>
        <Link to={`/`} className={`navigation-bar__logo`}>
          <img src={logoUrl} alt="logo" width={`100%`} />
        </Link>
        <div className={`navigation-bar__language-switchers`}>
          <span
            className={`navigation-bar__language-switcher ${
              currentLanguage === LOCALES.RUSSIAN
                ? "navigation-bar__language-switcher--active"
                : ""
            }`}
            onClick={() => setLanguage(LOCALES.RUSSIAN)}
          >
            Ru
          </span>
          <span
            className={`navigation-bar__language-switcher ${
              currentLanguage === LOCALES.ENGLISH
                ? "navigation-bar__language-switcher--active"
                : ""
            }`}
            onClick={() => setLanguage(LOCALES.ENGLISH)}
          >
            En
          </span>
        </div>
        <div className={`navigation-bar__links`}>
          {links.map((link: LinkInterface) => {
            return (
              <Link
                to={link.path}
                key={link.linkNameId}
                className={`navigation-bar__link`}
              >
                {/*{translate(link.linkNameId)}*/}
                {link.linkNameId}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
