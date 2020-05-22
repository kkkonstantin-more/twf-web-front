import React, { useState } from "react";
import { useParams } from "react-router-dom";

import "./player-info-page.scss";
import translate from "../../translations/translate";
import SortersList, {
  SortersListItemInterface,
} from "../../copmonents/sorters-list/sorters-list";
import LevelTabsList from "../../copmonents/level-tabs-list/level-tabs-list";

import { LevelTabProps } from "../../copmonents/level-tab/level-tab";

import demoGameLevels from "../game-info-page/demo-game-levels";

const PlayerInfoPage: React.FC = () => {
  // translation vars
  const translationPrefix: string = "playerInfoPage";
  const titleId: string = translationPrefix + ".title";
  const completedLevelsId: string = translationPrefix + ".completedLevels";
  // other
  const [levels, setLevels] = useState<LevelTabProps[]>(demoGameLevels);
  const { id } = useParams();
  const levelsSorters: SortersListItemInterface[] = [
    {
      textId: "name",
      propertyName: "name",
      initialDescending: false,
    },
    {
      textId: "completesAmount",
      propertyName: "completesAmount",
      initialDescending: true,
    },
    {
      textId: "difficulty",
      propertyName: "difficulty",
      initialDescending: true,
    },
  ];
  return (
    <div className="player-info-page u-container">
      <h1>
        {translate(titleId)}: {id}
      </h1>
      <h1>{translate(completedLevelsId)}</h1>
      <SortersList
        state={{ array: levels, stateSetter: setLevels }}
        items={levelsSorters}
        className="u-mt-sm u-mb-sm"
      />
      <LevelTabsList levelTabs={levels} />
    </div>
  );
};

export default PlayerInfoPage;
