import React from "react";

import "./ranks-section.scss";
import translate from "../../../../translations/translate";

import brainSvgImg from "../../../../assets/home-page-ranks-section/strong-brain.svg";
import stairWaySvgImg from "../../../../assets/home-page-ranks-section/stairway.svg";

const RanksSection: React.FC = () => {
  // translation vars
  const translationPrefix: string = "ranksSection";
  const titleId: string = translationPrefix + ".title";
  const sellingPhraseId: string = translationPrefix + ".sellingPhrase";
  const ranksIds: Array<string> = [
    translationPrefix + ".dunno",
    translationPrefix + ".thinker",
    translationPrefix + ".intellectual",
    translationPrefix + ".expert",
  ];

  return (
    <div className="ranks-section" id="ranksSection">
      <h1 className="section-title">{translate(titleId)}</h1>
      <div className="ranks-section__ranks">
        <img
          src={brainSvgImg}
          alt="strong brain"
          className="ranks-section__svg-brain"
        />
        {ranksIds.reverse().map((rankId: string, i: number) => {
          return (
            <div
              key={i}
              className="ranks-section__rank-block"
              style={{ width: `${40 + i * 20}%` }}
            >
              {translate(rankId)}
            </div>
          );
        })}
      </div>
      <div className="ranks-section__image-and-text">
        <img src={stairWaySvgImg} alt="stairway" />
        <p>{translate(sellingPhraseId)}</p>
      </div>
    </div>
  );
};

export default RanksSection;
