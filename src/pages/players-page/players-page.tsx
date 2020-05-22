import React, { useState } from "react";
import translate from "../../translations/translate";

import PlayersTabsList from "./components/player-tabs-list/player-tabs-list";
import SortersList from "../../copmonents/sorters-list/sorters-list";

import { PlayerTabProps } from "./components/player-tab/player-tab";
import { SortersListItemInterface } from "../../copmonents/sorters-list/sorters-list";

import demoPlayerTabsData from "./demo-player-tabs-data";

import "./players-page.scss";

const PlayersPage: React.FC = () => {
  // translation vars
  const translationPrefix: string = "playersPage";
  const titleId: string = translationPrefix + ".title";
  // other
  const [playerTabs, setPlayerTabs] = useState<PlayerTabProps[]>(
    demoPlayerTabsData
  );
  const sortersListItems: SortersListItemInterface[] = [
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
    <div className="players-page u-container">
      <h1>{translate(titleId)}</h1>
      <SortersList
        state={{ array: playerTabs, stateSetter: setPlayerTabs }}
        items={sortersListItems}
        className="u-mt-sm u-mb-sm"
      />
      <PlayersTabsList playerTabs={playerTabs} />
    </div>
  );
};

export default PlayersPage;
