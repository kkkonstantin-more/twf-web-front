import React, { useEffect, useState } from "react";
import axios from "axios";

import { Tabs, Tab } from "react-bootstrap";

import RatingsTablePreview from "../../copmonents/ratings-table/ratings-table";

import { demoRatingsTop5Users, demoUserRating } from "../../data/demo-data";

import { UserRatingTabProps } from "../../copmonents/user-rating-tab/user-rating-tab";

import "./ratings-page.styles.scss";

const RatingsPage: React.FC = () => {
  const [demoData, setDemoData] = useState<Array<UserRatingTabProps>>([]);

  useEffect(() => {
    axios.get("https://randomuser.me/api/?results=150").then((res) => {
      const filteredData: Array<UserRatingTabProps> = [];
      let place = 1;
      res.data.results.forEach((user: any, i: number) => {
        if (place % 50 === 0) place = 0;
        filteredData.push({
          name: user.name.first + " " + user.name.last,
          avatarUrl: user.picture.thumbnail,
          place: place++,
          points: 150 - i,
        });
      });
      setDemoData([...filteredData]);
    });
  }, []);

  return (
    <div className={"ratings-page u-container"}>
      <Tabs defaultActiveKey="general" id="rating-tabs">
        <Tab eventKey={"general"} title="Общий рейтинг">
          <RatingsTablePreview
            data={demoData.slice(0, 50)}
            currentUserData={demoUserRating}
          />
        </Tab>
        <Tab eventKey={"trigonometry"} title="Триногометрия">
          <RatingsTablePreview
            data={demoData.slice(50, 100)}
            currentUserData={demoUserRating}
          />
        </Tab>
        <Tab eventKey={"tuple-theory"} title="Теория множеств">
          <RatingsTablePreview
            data={demoData.slice(100, 150)}
            currentUserData={demoUserRating}
          />
        </Tab>
      </Tabs>
    </div>
  );
};

export default RatingsPage;
