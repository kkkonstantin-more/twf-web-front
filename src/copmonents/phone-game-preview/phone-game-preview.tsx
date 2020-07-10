import React from "react";
import { Carousel } from "react-bootstrap";

import "./phone-game-preview.scss";

const PhoneGamePreview: React.FC = () => {
  const gameScreenshotsUrls: string[] = [];
  // filling array with urls
  for (let i = 1; i < 12; i++) {
    gameScreenshotsUrls.push(
      require(`../../assets/component-phone-game-preview/screenshots/screenshot-${i}.jpg`)
    );
  }

  return (
    <div className="phone-game-preview">
      <Carousel
        className="phone-game-preview__screenshots-carousel"
        indicators={false}
        controls={false}
        // interval between slide swaps
        interval={3000}
      >
        {gameScreenshotsUrls.map((screenshotUrl: string, i: number) => (
          <Carousel.Item key={i} className="phone-game-preview__screenshot">
            <img src={screenshotUrl} alt={`game screenshot number ${i}`} />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default PhoneGamePreview;
