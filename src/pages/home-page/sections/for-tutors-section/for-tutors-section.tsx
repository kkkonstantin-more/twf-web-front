import React from "react";
import translate from "../../../../translations/translate";
// icons
import Icon from "@mdi/react";
import { mdiNintendoGameBoy } from "@mdi/js";
import { mdiTimer } from "@mdi/js";
import { mdiRobot } from "@mdi/js";

import "./for-tutors-section.scss";

interface TextWithSvgBlock {
  svgUrl: string;
  captionTextId: string;
  backgroundColor: string;
  fontColor: string;
}

const ForTutorsSection: React.FC = () => {
  // translation vars
  const translationPrefix: string = "forTutorsSection";
  const titleId: string = translationPrefix + ".title";
  const mainTextId: string = translationPrefix + ".mainText";
  // other
  const bigSvgUrl: string = require("../../../../assets/home-page-for-tutors-section/teacher-and-desk.svg");

  const textWithSvgBlock: TextWithSvgBlock[] = [
    {
      svgUrl: mdiNintendoGameBoy,
      captionTextId: translationPrefix + ".carouselCaption1",
      backgroundColor: "#3F3D56",
      fontColor: "#cfd8dc",
    },
    {
      svgUrl: mdiRobot,
      captionTextId: translationPrefix + ".carouselCaption2",
      backgroundColor: "#455a64",
      fontColor: "#cfd8dc",
    },
    {
      svgUrl: mdiTimer,
      captionTextId: translationPrefix + ".carouselCaption3",
      backgroundColor: "#607D8B",
      fontColor: "#cfd8dc",
    },
  ];

  return (
    <div className="for-tutors-section">
      <h1 id="forTutorsSection" className="section-title">
        {translate(titleId)}
      </h1>
      <div className="for-tutors-section__texts-with-svg">
        {textWithSvgBlock.map((block: TextWithSvgBlock, i) => {
          return (
            <div className="for-tutors-section__text-with-svg" key={i}>
              <Icon
                path={block.svgUrl}
                style={{ color: block.backgroundColor }}
              />
              <p
                style={{
                  backgroundColor: block.backgroundColor,
                  color: block.fontColor,
                }}
              >
                {translate(block.captionTextId)}
              </p>
            </div>
          );
        })}
      </div>
      <div className="for-tutors-section__svg-and-text">
        <img
          src={bigSvgUrl}
          alt="man in front of a desk"
          className="for-tutors-section__svg"
        />
        <p className="for-tutors-section__text">{translate(mainTextId)}</p>
      </div>
    </div>
  );
};

export default ForTutorsSection;
