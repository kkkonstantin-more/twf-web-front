import React from "react";

import WorkFieldsGraph from "../../../../copmonents/work-fields-graph/work-fields-graph";

import "./about-us-section.scss";

const AboutUsSection: React.FC = () => {
  return (
    <div className="about-us-section">
      <h1 className="section-title">Направления нашей работы</h1>
      <div className="about-us-section__graph">
        <WorkFieldsGraph />
      </div>
    </div>
  );
};

export default AboutUsSection;
