import React, { useState } from "react";
import { Progress } from "antd";
import AppModal from "../app-modal/app-modal.component";

function AchievementConstructor(props: {
  Title: string;
  Description: string;
  ImgSrc: string;
  ImgWidth?: string;
  ImgHeight?: string;
  ProgressRate: number;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div style={{ margin: "2rem" }} onClick={() => setIsModalOpen(true)}>
      <img
        src={props.ImgSrc}
        width={props.ImgWidth ? props.ImgWidth : "80rem"}
        height={props.ImgHeight ? props.ImgHeight : "80rem"}
      />
      <Progress percent={props.ProgressRate} size={"small"} />
      <AppModal isOpen={isModalOpen} close={() => setIsModalOpen(false)}>
        <div>
          <h1>{props.Title}</h1>
          <div>{props.Description}</div>
        </div>
      </AppModal>
    </div>
  );
}

export default AchievementConstructor;
