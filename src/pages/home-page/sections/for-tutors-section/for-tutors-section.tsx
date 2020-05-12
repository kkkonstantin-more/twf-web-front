import React from "react";
import translate from "../../../../i18n/translate";

import { Carousel } from "react-bootstrap";
// import Carousel from "react-responsive-carousel";

import "./for-tutors-section.scss";

const ForTutorsSection: React.FC = () => {
  // translation vars
  const translationPrefix: string = "forTutorsSection";
  const titleId: string = translationPrefix + ".title";
  const mainTextId: string = translationPrefix + ".mainText";
  // other
  const svgUrl: string = require("../../../../assets/teacher-and-desk.svg");
  interface CarouselSlide {
    imgUrl: string;
    captionTextId: string;
  }
  const carouselSlides: Array<CarouselSlide> = [
    {
      imgUrl: require("../../../../assets/for-tutors/carousel/carousel-slide-1.jpg"),
      captionTextId: translationPrefix + ".carouselCaption1",
    },
    {
      imgUrl: require("../../../../assets/for-tutors/carousel/carousel-slide-2.jpg"),
      captionTextId: translationPrefix + ".carouselCaption2",
    },
    {
      imgUrl: require("../../../../assets/for-tutors/carousel/carousel-slide-3.jpg"),
      captionTextId: translationPrefix + ".carouselCaption3",
    },
  ];

  return (
    <div className="for-tutors-section">
      <h1 className="for-tutors-section__title">{translate(titleId)}</h1>
      <div className="for-tutors-section__container">
        {/*<Carousel>*/}
        {/*  <div>*/}
        {/*    <img src="assets/1.jpeg" />*/}
        {/*    <p className="legend">Legend 1</p>*/}
        {/*  </div>*/}
        {/*  <div>*/}
        {/*    <img src="assets/2.jpeg" />*/}
        {/*    <p className="legend">Legend 2</p>*/}
        {/*  </div>*/}
        {/*  <div>*/}
        {/*    <img src="assets/3.jpeg" />*/}
        {/*    <p className="legend">Legend 3</p>*/}
        {/*  </div>*/}
        {/*</Carousel>*/}
        {/*</Carousel>*/}
        <Carousel className="for-tutors-section__carousel">
          {carouselSlides.map((slide: CarouselSlide, i: number) => (
            <Carousel.Item
              key={i}
              className="for-tutors-section__carousel-slide"
            >
              <img
                src={slide.imgUrl}
                width="100%"
                height="auto"
                alt={`carousel slide ${i}`}
              />
              <Carousel.Caption className="for-tutors-section__carousel-caption">
                {translate(slide.captionTextId)}
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
        <div className="for-tutors-section__svg-and-text">
          <img
            src={svgUrl}
            alt="man in front of a desk"
            className="for-tutors-section__svg"
          />
          <p className="for-tutors-section__text">{translate(mainTextId)}</p>
        </div>
      </div>
    </div>
  );
};

export default ForTutorsSection;
