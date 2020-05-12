import React from "react";
import { Carousel } from "react-bootstrap";
import "./phone-game-preview.scss";

const PhoneGamePreview: React.FC = () => {
  const googlePlayButtonUrl: string = require("../../assets/google-play-button.png");
  const title: string = "Math Helper Games";
  const slogan: string = "Математика просто и весело";
  const about: string =
    "Автоматически применяй преобразования к выражениям в типовых учебных задачах";

  const gameScreenshotsUrls: Array<string> = [
    require("../../assets/screenshot-1.jpg"),
    require("../../assets/screenshot-2.jpg"),
    require("../../assets/screenshot-3.jpg"),
  ];

  return (
    <div className={`phone-game-preview`}>
      <div className={`phone-game-preview__phone-image`}>
        <Carousel
          className="phone-game-preview__carousel"
          indicators={false}
          controls={false}
          interval={3000}
        >
          {gameScreenshotsUrls.map((screen: string, i: number) => (
            <Carousel.Item>
              <img
                src={gameScreenshotsUrls[i]}
                width="100%"
                height="auto"
                alt={`game screenshot ${i}`}
              />
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
      <div className="phone-game-preview__text-box">
        <h1 className="phone-game-preview__title">{title}</h1>
        <h2 className="phone-game-preview__slogan">{slogan}</h2>
        <h2 className="phone-game-preview__slogan">{about}</h2>
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
