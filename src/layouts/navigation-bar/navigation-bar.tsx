import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import translate from "../../translations/translate";
import { LOCALES } from "../../translations";
// using hash-link package to use anchor links
import { HashLink as Link } from "react-router-hash-link";
// icons for mobile navigation
import Icon from "@mdi/react";
import { mdiMenu, mdiCloseCircleOutline, mdiLoginVariant } from "@mdi/js";

import LoginRegisterModal from "../../modals/login-regiser-modal";

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
  const [showLoginRegisterModal, setShowLoginRegisterModal] = useState<boolean>(
    false
  );

  const { pathname } = useLocation();

  return (
    <div className="navigation-bar__wrapper">
      <div className="navigation-bar u-container">
        <a
          href={pathname === "/" ? "#top" : "/"}
          className="navigation-bar__logo"
        >
          <img src={logoUrl} alt="logo" width="100%" />
        </a>
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
              onClick={() => {
                // close mobile dropdown if user clicks on any link
                if (showMobileNavigation) {
                  setShowMobileNavigation(false);
                }
                if (link.linkNameId === "navigationBar.link.login") {
                  setShowLoginRegisterModal(true);
                }
              }}
            >
              {translate(link.linkNameId)}
            </Link>
          ))}
          <div
            className="navigation-bar__link navigation-bar__link--signin"
            onClick={() => setShowLoginRegisterModal(true)}
          >
            <Icon path={mdiLoginVariant} size={1} />
            <span>{translate("navigationBar.link.login")}</span>
          </div>
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
    </div>
  );
};

export default NavigationBar;
