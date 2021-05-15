import React, { Component } from "react";

import "./sample-user-page.scss";
import { Progress } from "antd";
import "antd/dist/antd.compact.min.css";
import AchievementConstructor from "../../components/achievement-constructor/achievement-constructor";

function SampleUserPage() {
  return (
    <div>
      <div className="sample-user-page u-container">
        <div className="sample-user-page__info">
          <img
            width={"50rem"}
            height={"auto"}
            src="https://www.seekpng.com/png/full/921-9210111_i-will-turn-your-photo-into-a-minimalist.png"
          />
          <div className="sample-user-page__login">vitek_aka</div>
          <div className="sample-user-page__name">Xavi Garsia</div>
        </div>

        <div className="sample-user-page__progress">
          <Progress percent={30} />
        </div>
        <div className="sample-user-page__rang">
          <img
            width={"50rem"}
            height={"auto"}
            src="https://static.tildacdn.com/tild3539-3261-4864-b633-346332316433/trophy-award-icon.jpg"
          />
        </div>
      </div>

      <div className="sample-user-page__achieve">
        {Array(20)
          .fill(1)
          .map((_, i) => {
            return (
              <AchievementConstructor
                key={i}
                Description="some info"
                Title="first achieve"
                ImgSrc="https://pp.userapi.com/c834100/v834100365/b2de7/l-iX0TyLuhY.jpg"
                ProgressRate={70}
              />
            );
          })}
      </div>
    </div>
  );
}
export default SampleUserPage;
