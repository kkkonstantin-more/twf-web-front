import React from "react";
import translate from "../../../../translations/translate";

import { Carousel } from "react-bootstrap";
// import Carousel from "react-responsive-carousel";

import Icon from "@mdi/react";
import { mdiNintendoGameBoy } from "@mdi/js";
import { mdiHeadLightbulb } from "@mdi/js";
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
  const svgUrl: string = require("../../../../assets/home-page-for-tutors-section/teacher-and-desk.svg");

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
      svgUrl: mdiHeadLightbulb,
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
        {textWithSvgBlock.map((block: TextWithSvgBlock) => {
          return (
            <div className="for-tutors-section__text-with-svg">
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
        {/*{carouselSlides.map((slide: CarouselSlide, i: number) => (*/}
        {/*  <Carousel.Item key={i} className="for-tutors-section__carousel-slide">*/}
        {/*    <img*/}
        {/*      src={slide.imgUrl}*/}
        {/*      width="100%"*/}
        {/*      height="auto"*/}
        {/*      alt={`carousel slide ${i}`}*/}
        {/*    />*/}
        {/*    <Carousel.Caption className="for-tutors-section__carousel-caption">*/}
        {/*      {translate(slide.captionTextId)}*/}
        {/*    </Carousel.Caption>*/}
        {/*  </Carousel.Item>*/}
        {/*))}*/}
      </div>
      <div className="for-tutors-section__svg-and-text">
        <img
          src={svgUrl}
          alt="man in front of a desk"
          className="for-tutors-section__svg"
        />
        <p className="for-tutors-section__text">{translate(mainTextId)}</p>
      </div>
    </div>
  );
};

export default ForTutorsSection;
