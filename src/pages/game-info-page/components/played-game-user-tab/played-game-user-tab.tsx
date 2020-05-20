import React from "react";

import "./played-game-user-tab.scss";

export interface PlayedGameUserTabProps {
  fullName: string;
  levelsCompleted: number;
}

const PlayedGameUserTab: React.FC<PlayedGameUserTabProps> = ({
  fullName,
  levelsCompleted,
}) => {
  return (
    <div className="played-game-user-tab">
      <div className="played-game-user-tab__full-name">{fullName}</div>
      <div className="played-game-user-tab__levels-completed">
        {levelsCompleted}
      </div>
    </div>
  );
};

export default PlayedGameUserTab;
