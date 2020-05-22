import React from "react";

import PlayerTab, { PlayerTabProps } from "../player-tab/player-tab";

import "./player-tabs-list.scss";

const PlayerTabsList: React.FC<{ playerTabs: PlayerTabProps[] }> = ({
  playerTabs,
}) => {
  return (
    <div className="player-tabs-list">
      <div className="player-tabs-list__list">
        {playerTabs.map((tab: PlayerTabProps, i: number) => (
          <PlayerTab key={i} {...tab} />
        ))}
      </div>
    </div>
  );
};

export default PlayerTabsList;
