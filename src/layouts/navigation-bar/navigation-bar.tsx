import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import translate from "../../translations/translate";
import { LOCALES } from "../../translations";
// using hash-link package to use anchor links
import { HashLink as Link } from "react-router-hash-link";
// icons for mobile navigation
import Icon from "@mdi/react";
import {
  mdiMenu,
  mdiCloseCircleOutline,
  mdiLoginVariant,
  mdiAccount,
} from "@mdi/js";

import LoginRegisterModal from "../../modals/login-regiser-modal";

import navigationLinks, { LinkInterface } from "./navigation-links";

import "./navigation-bar.scss";

import logoImg from "../../assets/logo.svg";
import axios from "axios";
import UnauthorizedModal from "../../modals/unauthorized-modal";

// props transported from App.tsx
interface NavigationBarProps {
  setLanguage: React.Dispatch<string>;
  currentLanguage: string;
}

const NavigationBar: React.FC<NavigationBarProps> = ({
  setLanguage,
  currentLanguage,
}) => {
  const [showMobileNavigation, setShowMobileNavigation] = useState<boolean>(
    false
  );
  const [showLoginRegisterModal, setShowLoginRegisterModal] = useState<boolean>(
    false
  );
  const [showUnauthorizedModal, setShowUnauthorizedModal] = useState<boolean>(
    false
  );

  axios.interceptors.response.use(function (config) {
    return config;
  }, (error) => {
    if (error.response.status == 401) {
      setShowUnauthorizedModal(true);
    }
    return Promise.reject(error);
  });

  const { pathname } = useLocation();

  return (
    <div className="navigation-bar__wrapper">
      <div className="navigation-bar u-container">
        <a
          href={pathname === "/" ? "#top" : "/"}
          className="navigation-bar__logo"
        >
          <img src={logoImg} alt="logo" width="100%" />
        </a>
        <div className="navigation-bar__language-switchers">
          <span
            className={`navigation-bar__language-switcher ${currentLanguage === LOCALES.RUSSIAN ? "active" : ""
              }`}
            onClick={() => setLanguage(LOCALES.RUSSIAN)}
          >
            Ru
          </span>
          <span
            className={`navigation-bar__language-switcher ${currentLanguage === LOCALES.ENGLISH ? "active" : ""
              }`}
            onClick={() => setLanguage(LOCALES.ENGLISH)}
          >
            En
          </span>
        </div>
        <div
          className={`navigation-bar__links ${showMobileNavigation ? "open" : ""
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
              onClick={() => {
                // close mobile dropdown if user clicks on any link
                if (showMobileNavigation) {
                  setShowMobileNavigation(false);
                }
              }}
            >
              {translate(link.linkNameId)}
            </Link>
          ))}
          {window.localStorage.token ? (
            <Link
              to={"/user"}
              className="navigation-bar__link navigation-bar__link--signin"
            >
              <Icon path={mdiAccount} size={1} />
              <span>{translate("navigationBar.link.profile")}</span>
            </Link>
          ) : (
            <div
              className="navigation-bar__link navigation-bar__link--signin"
              onClick={() => setShowLoginRegisterModal(true)}
            >
              <Icon path={mdiLoginVariant} size={1} />
              <span>{translate("navigationBar.link.login")}</span>
            </div>
          )}
        </div>
        <div onClick={() => setShowMobileNavigation(true)}>
          <Icon
            path={mdiMenu}
            className="navigation-bar__hamburger-menu-button"
          />
        </div>
      </div>
      <LoginRegisterModal
        showModal={showLoginRegisterModal}
        setShowModal={(status: boolean) => setShowLoginRegisterModal(status)}
      />
      <UnauthorizedModal
          showModal={showUnauthorizedModal}
          setShowModal={(status: boolean) => setShowUnauthorizedModal(status)}
          setShowAuthModal={(status: boolean) => setShowLoginRegisterModal(status)}/>
    </div>
  );
};

export default NavigationBar;
