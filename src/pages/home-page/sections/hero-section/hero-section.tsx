import React from "react";
import { Link } from "react-router-dom";
import translate from "../../../../translations/translate";

import PhoneGamePreview from "../../../../copmonents/phone-game-preview/phone-game-preview";

import "./hero-section.scss";

const HeroSection: React.FC = () => {
  // translate vars
  const translationPrefix = "heroSection";
  const brandNameId: string = translationPrefix + ".brandName";
  const sloganId: string = translationPrefix + ".slogan";
  const quickGameProcessDescriptionId: string =
    translationPrefix + ".quickGameProcessDescription";
  const gamesLink: string = translationPrefix + ".gamesLink";
  const googlePlayAppURL: string = "https://play.google.com/store/apps/details?id=mathhelper.games.matify";

  const googlePlayButtonUrl: string = require("../../../../assets/home-page-hero-section/google-play-button.png");

  return (
    <div className="hero-section__wrapper">
      <div className="hero-section u-container">
        <div className="hero-section__phone-and-text-box">
          <div className="hero-section__text-box">
            <h1>{translate(brandNameId)}</h1>
            <h2>{translate(sloganId)}</h2>
            <h2>{translate(quickGameProcessDescriptionId)}</h2>
            <h2> </h2>
            <a href={googlePlayAppURL}>
              <button>
                <img
                    src={googlePlayButtonUrl}
                    alt="google play button"
                    width="100%"
                    height="auto"
                />
              </button>
            </a>
          </div>
          <PhoneGamePreview />
        </div>
        <Link className="hero-section__our-games" to="/matifygames" target="_blank">
          {translate(gamesLink)}
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;
