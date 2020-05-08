import React from "react";

import "./phone-game-preview.scss";

const PhoneGamePreview: React.FC = () => {
  const phoneImageUrl: string = require("../../assets/game-on-phone.png");
  const googlePlayButtonUrl: string = require("../../assets/google-play-button.png");
  const title: string = "Math Helper Games";
  const slogan: string = "Математика просто и весело";

  return (
    <div className={`phone-game-preview`}>
      <div className={`phone-game-preview__phone-image`}>
        <img
          src={phoneImageUrl}
          alt="game on the phone"
          width="100%"
          height="auto"
        />
      </div>
      <div className="phone-game-preview__text-box">
        <h1 className="phone-game-preview__title">{title}</h1>
        <h2 className="phone-game-preview__slogan">{slogan}</h2>
        <button className="phone-game-preview__button">
          <img
            src={googlePlayButtonUrl}
            alt="google play button"
            width="100%"
            height="auto"
          />
        </button>
      </div>
    </div>
  );
};

export default PhoneGamePreview;
