import React from "react";

import "./home-page.styles.scss";

// import RatingsTable from "../../copmonents/ratings-table/ratings.component";
import RatingsSection from "./sections/ratings-section.component";

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <RatingsSection />
    </div>
  );
};

export default HomePage;
