import React from "react";
import translate from "../../../../translations/translate";
// icons for our solutions
import Icon from "@mdi/react";
import { mdiMathSin, mdiMathLog, mdiMathIntegral } from "@mdi/js";

import PhoneGamePreview from "../../../../copmonents/phone-game-preview/phone-game-preview";

import "./hero-section.scss";

const HeroSection: React.FC = () => {
  // translate vars
  const translationPrefix = "heroSection";
  const brandNameId: string = translationPrefix + ".brandName";
  const sloganId: string = translationPrefix + ".slogan";
  const quickGameProcessDescriptionId: string =
    translationPrefix + ".quickGameProcessDescription";
  const ourSolutionsId: string = translationPrefix + ".ourSolutions";

  const googlePlayButtonUrl: string = require("../../../../assets/hero-section/google-play-button.png");

  return (
    <div className="hero-section__wrapper">
      <div className="hero-section u-container">
        <div className="hero-section__phone-and-text-box">
          <div className="hero-section__text-box">
            <h1>{translate(brandNameId)}</h1>
            <h2>{translate(sloganId)}</h2>
            <h2>{translate(quickGameProcessDescriptionId)}</h2>
            <button>
              <img
                src={googlePlayButtonUrl}
                alt="google play button"
                width="100%"
                height="auto"
              />
            </button>
          </div>
          <PhoneGamePreview />
        </div>
        <div className="hero-section__our-solutions">
          <h1>{translate(ourSolutionsId)}</h1>
          <div className="hero-section__our-solutions__icons-list">
            <Icon
              className="hero-section__our-solutions__icon"
              path={mdiMathSin}
            />
            <Icon
              className="hero-section__our-solutions__icon"
              path={mdiMathLog}
            />
            <Icon
              className="hero-section__our-solutions__icon"
              path={mdiMathIntegral}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
