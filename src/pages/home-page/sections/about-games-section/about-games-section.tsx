import React from "react";

import { Carousel } from "react-bootstrap";

import "./about-games-section.scss";

const AboutGamesSection: React.FC = () => {
  interface CarouselSlide {
    imageUrl: string;
    caption: string;
  }

  const carouselSlides: Array<CarouselSlide> = [
    {
      imageUrl: require("../../../../assets/carousel-slides/carousel-slide-1.jpg"),
      caption:
        "Играй в лучшие математические игры, отобранные редакцией и сообществом игроков",
    },
    {
      imageUrl: require("../../../../assets/carousel-slides/carousel-slide-2.jpg"),
      caption: "Создавай свои собственные игры через наш конструктор",
    },
    {
      imageUrl: require("../../../../assets/carousel-slides/carousel-slide-3.jpg"),
      caption:
        "Повышай математическую грамотность, становись сильнее в учебе или в научной деятельности",
    },
  ];
  const svgUrl: string = require("../../../../assets/girl-with-phone.svg");
  const description: string =
    "Цель Math Helper Games - сделать процесс решения математических проблем увлекательным, творческим и" +
    " доступным для каждого человека, имеющего смартфон";

  return (
    <div className="about-games-section">
      <div className="about-games-section__text-box">
        <img src={svgUrl} alt="" className="about-games-section__svg" />
        <div className="about-games-section__description">{description}</div>
      </div>
      <Carousel className="about-games-section__carousel">
        {carouselSlides.map((slide: CarouselSlide, i: number) => (
          <Carousel.Item key={i}>
            <img
              src={slide.imageUrl}
              width="100%"
              height="100%"
              alt="carousel slide"
            />
            <Carousel.Caption className="about-games-section__carousel-caption">
              {slide.caption}
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default AboutGamesSection;
