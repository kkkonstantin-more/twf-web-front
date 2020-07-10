import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import translate from "../../../../translations/translate";

import RatingsTable from "../../../../copmonents/ratings-table/ratings-table";

// import {
//   demoRatingsTop5Users,
//   demoUserRating,
// } from "../../../../data/demo-data";

import "./ratings-section.scss";

import axios from "axios";
import {
  FetchedUsersData,
  UsersSortingProperty,
} from "../../../../redux/user-tabs/user-tabs.types";

export interface UserData {
  name: string;
  points: number;
  place: number;
}

const RatingsSection: React.FC = () => {
  const [topUsersByRating, setTopUsersByRating] = useState<UserData[]>([]);

  useEffect(() => {
    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER_API}/activity_log/find_win_log_users`,
      data: {
        offset: 0,
        limit: 100,
        sortedBy: UsersSortingProperty.BY_RATING,
        descending: true,
      },
    }).then((res) => {
      const filterData: UserData[] = res.data
        .filter((item: FetchedUsersData) => {
          const name = item.userFullName || item.userName || item.userLogin;
          return (
            !(
              item.additionalInfo.includes("SPBPU") ||
              item.additionalInfo.includes("СПБПУ") ||
              item.additionalInfo.includes("LETI") ||
              item.additionalInfo.includes("ЛЭТИ") ||
              item.additionalInfo.includes("363010")
            ) &&
            name !== "" &&
            !name.startsWith("guest")
          );
        })
        .map((item: FetchedUsersData, i: number) => {
          return {
            name: item.userFullName || item.userName || item.userLogin,
            points: Math.round(item.rating),
            place: i + 1,
          };
        })
        .slice(0, 5);
      setTopUsersByRating(filterData);
    });
  }, []);

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
            data={topUsersByRating}
            //            currentUserData={demoUserRating}
          />
          <Link
            to="/matify-players"
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
