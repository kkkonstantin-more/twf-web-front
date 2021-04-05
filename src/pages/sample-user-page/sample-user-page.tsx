import React, { Component } from "react";

import "./sample-user-page.scss";
import { Progress } from "antd";
import "antd/dist/antd.compact.min.css";

function SampleUserPage() {
  return (
    <div className="sample-user-page u-container">
      <div className="sample-user-page__info">
        <img
          width={"30rem"}
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
          width={"30rem"}
          height={"auto"}
          src="https://static.tildacdn.com/tild3539-3261-4864-b633-346332316433/trophy-award-icon.jpg"
        />
      </div>
    </div>
  );
}
export default SampleUserPage;
