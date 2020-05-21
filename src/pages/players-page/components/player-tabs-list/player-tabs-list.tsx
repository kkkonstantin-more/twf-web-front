import React, { useState } from "react";

import PlayerTab, { PlayerTabProps } from "../player-tab/player-tab";

import { sortArrayOfObjectsByProperty } from "../../../../utils";

import "./player-tabs-list.scss";

import demoPlayerTabsData from "./demo-player-tabs-data";

const PlayerTabsList: React.FC = () => {
  const [playerTabs, setPlayerTabs] = useState<PlayerTabProps[]>(
    demoPlayerTabsData
  );
  return (
    <div className="player-tabs-list">
      <div className="player-tabs-list__actions">
        <button
          onClick={() =>
            setPlayerTabs([
              ...sortArrayOfObjectsByProperty(playerTabs, "name", false),
            ])
          }
        >
          Сортировать по имени
        </button>
        <button
          onClick={() =>
            setPlayerTabs([
              ...sortArrayOfObjectsByProperty(playerTabs, "levelsCompleted"),
            ])
          }
        >
          Сортировать по количеству пройденных уровней
        </button>
      </div>
      <div className="player-tabs-list__list">
        {playerTabs.map((tab: PlayerTabProps, i: number) => (
          <PlayerTab key={i} {...tab} />
        ))}
      </div>
    </div>
  );
};

export default PlayerTabsList;
