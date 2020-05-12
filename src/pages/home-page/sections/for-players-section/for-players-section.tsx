import React from "react";
import translate from "../../../../i18n/translate";

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
  const svgUrl: string = require("../../../../assets/girl-with-phone.svg");

  return (
    <div className="for-players-section">
      <h1 className="for-players-section__title">{translate(titleId)}</h1>
      <div className="for-players-section__container">
        <div className="for-players-section__left-block">
          <img src={svgUrl} alt="girl with a phone is sitting on the grass" />
          <p>{translate(sellingPhraseId)}</p>
        </div>
        <div className="for-players-section__instruction">
          {instructionBlockIds.map((instructionId: string, i: number) => (
            <div
              key={i}
              className={`for-players-section__instruction-block ${
                i % 2 !== 0 ? "inverted" : ""
              }`}
            >
              {i + 1}. {translate(instructionId)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ForPlayersSection;
