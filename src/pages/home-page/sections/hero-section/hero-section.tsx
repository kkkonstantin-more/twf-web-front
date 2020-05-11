import React from "react";

import PhoneGamePreview from "../../../../copmonents/phone-game-preview/phone-game-preview";

import Icon from "@mdi/react";
import { mdiMathSin, mdiMathLog, mdiMathIntegral } from "@mdi/js";

import "./hero-section.scss";

const HeroSection: React.FC = () => {
  return (
    <div className={`hero-section__wrapper`}>
      <div className={`hero-section u-container`}>
        <PhoneGamePreview />
        <div className="hero-section__about-games">
          <h1>Наши решения</h1>
          <div className="hero-section__about-games__icons">
            <Icon
              className="hero-section__about-games__icon"
              path={mdiMathSin}
            />
            <Icon
              className="hero-section__about-games__icon"
              path={mdiMathLog}
            />
            <Icon
              className="hero-section__about-games__icon"
              path={mdiMathIntegral}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
