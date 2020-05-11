import React, { useEffect, useState } from "react";

import "./phone-game-preview.scss";

const PhoneGamePreview: React.FC = () => {
  const phoneImageUrl: string = require("../../assets/screenshot-1.jpg");
  const googlePlayButtonUrl: string = require("../../assets/google-play-button.png");
  const title: string = "Math Helper Games";
  const slogan: string = "Математика просто и весело";
  const about: string =
    "Автоматически применяй преобразования к выражениям в типовых учебных задачах";

  const [counter, setCounter] = useState<number>(0);

  const gameScreenshotsUrls: Array<string> = [
    require("../../assets/screenshot-1.jpg"),
    require("../../assets/screenshot-2.jpg"),
    require("../../assets/screenshot-3.jpg"),
  ];

  const screenShots: Array<React.RefObject<HTMLImageElement>> = [
    React.createRef(),
    React.createRef(),
    React.createRef(),
  ];

  const slide: React.RefObject<HTMLInputElement> = React.createRef();

  useEffect(() => {
    setInterval(() => {
      if (slide.current !== null) {
        if (counter === 0) {
          // @ts-ignore
          slide.current.style.transition = "none";
          // setCounter(1);
        } else {
          // @ts-ignore
          slide.current.style.transition = "transform 0.4s ease-in-out";
        }
        // @ts-ignore
        const size: number = screenShots[0].current.clientWidth;
        // @ts-ignore
        slide.current.style.transform = `translateX(${-size * counter}px)`;
        if (counter === screenShots.length) {
          // slide.current.style.transition = "none";
          setCounter(0);
        } else {
          setCounter(counter + 1);
        }
      }
    }, 2000);
  }, [slide]);

  return (
    <div className={`phone-game-preview`}>
      <div className={`phone-game-preview__phone-image`}>
        <div className="phone-game-preview__screenshots-container">
          <div className="phone-game-preview__screenshot" ref={slide}>
            {gameScreenshotsUrls.map((screen: string, i: number) => (
              <img
                key={i}
                src={screen}
                ref={screenShots[i]}
                width="100%"
                height="auto"
                alt="game screenshot"
              />
            ))}
            <img
              src={gameScreenshotsUrls[0]}
              ref={screenShots[0]}
              width="100%"
              height="auto"
              alt="game screenshot"
            />
          </div>
        </div>
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
