import React from "react";
import translate from "../../../../translations/translate";

import "./for-players-section.scss";

const ForPlayersSection: React.FC = () => {
  // translation vars
  const translationPrefix: string = "forPlayersSection";
  const instructionBlockIds: Array<string> = [
    translationPrefix + ".instruction1",
    translationPrefix + ".instruction2",
    translationPrefix + ".instruction3",
    translationPrefix + ".instruction4",
    translationPrefix + ".instruction5",
  ];
  const titleId: string = translationPrefix + ".title";
  const sellingPhraseId: string = translationPrefix + ".sellingPhrase";
  // other vars
  const svgUrl: string = require("../../../../assets/home-page-for-players/girl-with-phone.svg");

  return (
    <div className="for-players-section">
      <h1 id="forPlayersSection" className="for-players-section__title">
        {translate(titleId)}
      </h1>
      <div className="for-players-section__container">
        <div className="for-players-section__svg-and-selling-phrase">
          <img src={svgUrl} alt="girl with a phone is sitting on the grass" />
          <p>{translate(sellingPhraseId)}</p>
        </div>
        <div className="timeline">
          {instructionBlockIds.map((instruction: string, i: number) => (
            <div
              key={i}
              className={`timeline__container ${
                i % 2 !== 0 ? "right" : "left"
              }`}
            >
              <div className="content">{translate(instruction)}</div>
              <div className="timeline__container__number">{++i}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ForPlayersSection;
