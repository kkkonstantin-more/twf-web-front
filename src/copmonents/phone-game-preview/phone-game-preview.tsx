import React from "react";
import { Carousel } from "react-bootstrap";
import "./phone-game-preview.scss";

const PhoneGamePreview: React.FC = () => {
  const gameScreenshotsUrls: Array<string> = [
    require("../../assets/component-phone-game-preview/screenshots/screenshot-1.jpg"),
    require("../../assets/component-phone-game-preview/screenshots/screenshot-2.jpg"),
    require("../../assets/component-phone-game-preview/screenshots/screenshot-3.jpg"),
  ];

  return (
    <div className="phone-game-preview">
      <div className="phone-game-preview__phone-image">
        <Carousel
          className="phone-game-preview__screenshots-carousel"
          indicators={false}
          controls={false}
          // interval between slide swaps
          interval={3000}
        >
          {gameScreenshotsUrls.map((screenshotUrl: string, i: number) => (
            <Carousel.Item key={i}>
              <img
                src={screenshotUrl}
                width="100%"
                height="auto"
                alt={`game screenshot number ${i}`}
              />
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default PhoneGamePreview;
