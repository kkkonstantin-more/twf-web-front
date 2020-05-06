import React from "react";

import "./hero-section.scss";

const HeroSection: React.FC = () => {
  return (
    <div className={`hero-section__wrapper`}>
      <div className={`hero-section u-container`}>
        <div className={`hero-section__text-box`}>
          <h1 className={`hero-section__title`}>Math Helper</h1>
          <h3 className={`hero-section__sub-title`}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam
            assumenda aut culpa dignissimos eveniet id, illo incidunt ipsam
            magnam natus nihil obcaecati
          </h3>
        </div>
      </div>
      ;
    </div>
  );
};

export default HeroSection;
