import React, { useState } from "react";
import translate from "../../translations/translate";

import GameTabsList from "./components/game-tabs-list/game-tabs-list";
import SortersList from "../../copmonents/sorters-list/sorters-list";

import { GameTabProps } from "./components/game-tab/game-tab";
import { SortersListItemInterface } from "../../copmonents/sorters-list/sorters-list";

import "./games-page.scss";

import demoGameTabsData from "./demo-game-tabs-data";

const GamesPage: React.FC = () => {
  // translation vars
  const translationPrefix: string = "gamesPage";
  const titleId: string = translationPrefix + ".title";
  // other
  const sorters: SortersListItemInterface[] = [
    {
      textId: "name",
      propertyName: "name",
      initialDescending: false,
    },
    {
      textId: "playersAmount",
      propertyName: "playersCount",
      initialDescending: true,
    },
    {
      textId: "levelsAmount",
      propertyName: "levelsCount",
      initialDescending: true,
    },
  ];
  const [gameTabs, setGameTabs] = useState<GameTabProps[]>(demoGameTabsData);

  return (
    <div className="games-page u-container">
      <h1>{translate(titleId)}</h1>
      <SortersList
        state={{ array: gameTabs, stateSetter: setGameTabs }}
        items={sorters}
        className="u-mb-sm u-mt-sm"
      />
      <GameTabsList gameTabs={gameTabs} />
    </div>
  );
};

export default GamesPage;
