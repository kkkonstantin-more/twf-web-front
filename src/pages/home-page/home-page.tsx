import React from "react";

import HeroSection from "./sections/hero-section/hero-section";
import AboutGamesSection from "./sections/about-games-section/about-games-section";
import RatingsSection from "./sections/ratings-section/ratings-section";

import "./home-page.scss";

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <HeroSection />
      <AboutGamesSection />
      <RatingsSection />
    </div>
  );
};

export default HomePage;
