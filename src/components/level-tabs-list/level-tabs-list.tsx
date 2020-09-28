import React from "react";

import "./level-tabs-list.scss";

import LevelTab, { LevelTabProps } from "../level-tab/level-tab";

const LevelTabsList: React.FC<{ levelTabs: LevelTabProps[] }> = ({
  levelTabs,
}) => {
  return (
    <div className="level-tabs-list">
      {levelTabs.map((level: LevelTabProps, i: number) => (
        <LevelTab key={i} {...level} />
      ))}
    </div>
  );
};

export default LevelTabsList;
