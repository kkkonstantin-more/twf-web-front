import React from "react";

import RatingsSection from "./sections/ratings-section/ratings-section";
import HeroSection from "./sections/hero-section/hero-section";

import "./home-page.scss";

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <HeroSection />
      <RatingsSection />
    </div>
  );
};

export default HomePage;
