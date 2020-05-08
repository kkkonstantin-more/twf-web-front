import React from "react";

import PhoneGamePreview from "../../../../copmonents/phone-game-preview/phone-game-preview";

import "./hero-section.scss";

const HeroSection: React.FC = () => {
  return (
    <div className={`hero-section__wrapper`}>
      <div className={`hero-section u-container`}>
        <PhoneGamePreview />
      </div>
    </div>
  );
};

export default HeroSection;
