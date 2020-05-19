import React from "react";

import HeroSection from "./sections/hero-section/hero-section";
import RatingsSection from "./sections/ratings-section/ratings-section";
import ForPlayersSection from "./sections/for-players-section/for-players-section";
import ForTutorsSection from "./sections/for-tutors-section/for-tutors-section";
import WorkFieldsSection from "./sections/work-fields-section/work-fields-section";
import AboutUsSection from "./sections/about-us-section/about-us-section";
import RanksSection from "./sections/ranks-section/ranks-section";

import "./home-page.scss";

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <HeroSection />
      <ForPlayersSection />
      <ForTutorsSection />
      <RatingsSection />
      <RanksSection />
      <AboutUsSection />
      <WorkFieldsSection />
    </div>
  );
};

export default HomePage;
