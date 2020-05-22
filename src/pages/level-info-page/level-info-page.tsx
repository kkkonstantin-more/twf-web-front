import React, { useState } from "react";

import "./level-info-page.scss";
import { useParams } from "react-router-dom";
import PlayerTabsList from "../players-page/components/player-tabs-list/player-tabs-list";

import demoPlayerTabsData from "../players-page/demo-player-tabs-data";
import translate from "../../translations/translate";
import { PlayerTabProps } from "../players-page/components/player-tab/player-tab";
import SortersList, {
  SortersListItemInterface,
} from "../../copmonents/sorters-list/sorters-list";

const LevelInfoPage: React.FC = () => {
  // translation vars
  const translationPrefix: string = "levelInfoPage";
  const titleId: string = translationPrefix + ".title";
  const completedLevelPlayersId: string =
    translationPrefix + ".completedLevelPlayers";
  // other
  const { id } = useParams();
  const [players, setPlayers] = useState<PlayerTabProps[]>(demoPlayerTabsData);
  const playersSorters: SortersListItemInterface[] = [
    {
      textId: "name",
      propertyName: "name",
      initialDescending: false,
    },
    {
      textId: "levelsAmount",
      propertyName: "levelsCompleted",
      initialDescending: true,
    },
  ];

  return (
    <div className="level-info-page u-container">
      <h1>
        {translate(titleId)}: {id}
      </h1>
      <h1>{translate(completedLevelPlayersId)}</h1>
      <SortersList
        state={{ array: players, stateSetter: setPlayers }}
        items={playersSorters}
        className="u-mt-sm u-mb-sm"
      />
      <PlayerTabsList playerTabs={players} />
    </div>
  );
};

export default LevelInfoPage;
