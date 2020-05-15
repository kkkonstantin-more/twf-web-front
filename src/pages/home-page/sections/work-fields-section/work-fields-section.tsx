import React from "react";
import translate from "../../../../translations/translate";

import WorkFieldsGraph from "../../../../copmonents/work-fields-graph/work-fields-graph";

import "./work-fields-section.scss";

const WorkFieldsSection: React.FC = () => {
  // translation variables
  const translationPrefix: string = "workFieldsSection";
  const titleId: string = translationPrefix + ".title";

  return (
    <div className="about-us-section">
      <h1 className="section-title">{translate(titleId)}</h1>
      <div className="about-us-section__graph">
        <WorkFieldsGraph />
      </div>
    </div>
  );
};

export default WorkFieldsSection;
