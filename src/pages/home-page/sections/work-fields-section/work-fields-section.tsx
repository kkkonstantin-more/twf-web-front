import React from "react";
import translate from "../../../../translations/translate";

import WorkFieldsGraph from "./work-fields-graph/work-fields-graph";

import "./work-fields-section.scss";

const WorkFieldsSection: React.FC = () => {
  // translation variables
  const translationPrefix: string = "workFieldsSection";
  const titleId: string = translationPrefix + ".title";
  const linkTextId: string = translationPrefix + ".linkText";
  // other
  const siteWithComprehensiveDescriptionUrl: string =
    "https://www.mathhelper.space/twf/prototype/demo.html";

  return (
    <div className="work-fields-section">
      <h1 className="section-title">{translate(titleId)}</h1>
      <div className="work-fields-section__graph">
        <WorkFieldsGraph />
      </div>
      <a
        href={siteWithComprehensiveDescriptionUrl}
        rel="noopener noreferrer"
        target="_blank"
        className="work-fields-section__link"
      >
        {translate(linkTextId)}
      </a>
    </div>
  );
};

export default WorkFieldsSection;
