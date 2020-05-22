import React, { useState } from "react";
import translate from "../../translations/translate";
import { useParams } from "react-router-dom";
import { injectIntl } from "react-intl";

import { Tabs, Tab } from "react-bootstrap";

import PlayerTabsList from "../players-page/components/player-tabs-list/player-tabs-list";
import LevelTabsList from "../../copmonents/level-tabs-list/level-tabs-list";
import SortersList from "../../copmonents/sorters-list/sorters-list";

import { PlayerTabProps } from "../players-page/components/player-tab/player-tab";
import { LevelTabProps } from "../../copmonents/level-tab/level-tab";
import { SortersListItemInterface } from "../../copmonents/sorters-list/sorters-list";

import demoPlayedGamePlayersData from "./demo-played-game-players-data";
import demoGameLevels from "./demo-game-levels";

import "./game-info-page.scss";

const GameInfoPage: React.FC<{ intl: any }> = ({ intl }) => {
  // translation vars
  const translationPrefix: string = "gameInfoPage";
  const gameNameTitleId: string = translationPrefix + ".gameNameTitle";
  const playersTabId: string = translationPrefix + ".playersTab";
  const levelsTabId: string = translationPrefix + ".levelsTab";
  // other
  const { id } = useParams();
  const [players, setPlayers] = useState<PlayerTabProps[]>(
    demoPlayedGamePlayersData
  );
  const [levels, setLevels] = useState<LevelTabProps[]>(demoGameLevels);
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
    <div className="game-info-page u-container">
      <h1>
        {translate(gameNameTitleId)} {id}
      </h1>
      <Tabs defaultActiveKey="players" id="tabs">
        <Tab
          eventKey="players"
          title={intl.formatMessage({ id: playersTabId })}
        >
          <div className="game-info-page__played-game-players">
            <SortersList
              state={{ array: players, stateSetter: setPlayers }}
              items={playersSorters}
              className="u-mt-sm u-mb-sm"
            />
            <PlayerTabsList playerTabs={players} />
          </div>
        </Tab>
        <Tab eventKey="levels" title={intl.formatMessage({ id: levelsTabId })}>
          <div className="game-info-page__levels">
            <SortersList
              state={{ array: levels, stateSetter: setLevels }}
              items={levelsSorters}
              className="u-mt-sm u-mb-sm"
            />
            <LevelTabsList levelTabs={levels} />
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};

export default injectIntl(GameInfoPage);
