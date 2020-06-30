import React from "react";
import { Link } from "react-router-dom";
import translate from "../../../../translations/translate";

import RatingsTable from "../../../../copmonents/ratings-table/ratings-table";

import {
  demoRatingsTop5Users,
  demoUserRating,
} from "../../../../data/demo-data";

import "./ratings-section.scss";

const RatingsSection: React.FC = () => {
  // translation vars
  const translationPrefix: string = "ratingsSection";
  const titleId: string = translationPrefix + ".title";
  const linkId: string = translationPrefix + ".link";
  const sloganId: string = translationPrefix + ".slogan";

  const svg = require("../../../../assets/home-page-rating-section/winner-cup.svg");
  return (
    <div className="ratings-section__wrapper" id="ratingsSection">
      <div className="ratings-section">
        <h1 className="section-title">{translate(titleId)}</h1>
        <div className="ratings-section__description">
          <img
            src={svg}
            width="100%"
            height="auto"
            alt="boy and girl are celebrating around winner's cup"
          />
          <h1>{translate(sloganId)}</h1>
        </div>
        <div className="ratings-section__table">
          <RatingsTable
            data={demoRatingsTop5Users}
            currentUserData={demoUserRating}
          />
          <Link
            to="/matifyplayers"
            target="_blank"
            className="ratings-section__table-link"
          >
            {translate(linkId)}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RatingsSection;
