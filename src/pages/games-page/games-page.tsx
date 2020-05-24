import React, { useEffect, useState } from "react";
import translate from "../../translations/translate";
import axios from "axios";

import GameTabsList from "./components/game-tabs-list/game-tabs-list";
import SortersList from "../../copmonents/sorters-list/sorters-list";

import { GameTabProps } from "./components/game-tab/game-tab";
import { SortersListItemInterface } from "../../copmonents/sorters-list/sorters-list";

import { AppTabProps } from "../../copmonents/app-tab/app-tab";

import "./games-page.scss";

import demoGameTabsData from "./demo-game-tabs-data";

import AppTabsList from "../../copmonents/app-tabs-list/app-tabs-list";

import Filter from "../../filter/filter";

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
  const [gameTabs, setGameTabs] = useState<AppTabProps[]>(demoGameTabsData);

  interface Game {
    name: string;
    code: string;
    levels: string[];
    players: string[];
  }

  useEffect(() => {
    axios({
      method: "GET",
      url: "https://mathhelper.space:8443/api/activity_log/win_log_all",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI4NDNjZDJmOC0xYmVkLTQwYWItYjg4ZS1hYTkyOTExZDBmMDQiLCJpYXQiOjE1OTAzMjUwMDQsImV4cCI6MjEwODcyNTAwNH0.xUjastIkrWKQpgb4Z2YfBakuL9r9O33gl6fItK7fsFww0kOESzNecGGlpP3cMnFglE2KbUTtYEhloNy8eNRn1g",
      },
    }).then((res) => {
      let games: Game[] = [];
      const data = res.data;
      console.log(data);
      data.forEach((log: any) => {
        const gameIndex: number = games.findIndex(
          (game) => game.name === log.game_name
        );
        if (gameIndex === -1) {
          games.push({
            name: log.game_name,
            code: log.game_code,
            levels: [log.level_name],
            players: [log.user_login],
          });
        } else {
          const game = games[gameIndex];
          if (game) {
            if (!game.levels.find((level) => level === log.level_name)) {
              game.levels.push(log.level_name);
            }
            if (!game.players.find((player) => player === log.user_login)) {
              game.players.push(log.user_login);
            }
          }
        }
      });
      const filteredGames: AppTabProps[] = [];
      const translationPrefix = "gameTab.";
      games.forEach((game) => {
        filteredGames.push({
          link: {
            value: "/game-info/" + game.name,
          },
          name: {
            value: game.name,
          },
          code: {
            value: game.code,
            prefixTranslationId: translationPrefix + "gameCode",
          },
          levelsCount: {
            value: game.levels.length.toString(),
            prefixTranslationId: translationPrefix + "levelsCount",
          },
          playersCount: {
            value: game.players.length.toString(),
            prefixTranslationId: translationPrefix + "playersCount",
          },
        });
      });
      setGameTabs([...filteredGames]);
    });
  }, []);

  return (
    <div className="games-page u-container">
      <h1>{translate(titleId)}</h1>
      <SortersList
        state={{ array: gameTabs, stateSetter: setGameTabs }}
        items={sorters}
        className="u-mb-sm u-mt-sm"
      />
      <Filter
        array={gameTabs}
        stateSetter={setGameTabs}
        propertyName="code"
        translationTextId="code"
      />
      <Filter
        array={gameTabs}
        stateSetter={setGameTabs}
        propertyName="levelsCount"
        translationTextId="levelsCount"
      />
      <Filter
        array={gameTabs}
        stateSetter={setGameTabs}
        propertyName="playersCount"
        translationTextId="playersCount"
      />
      <AppTabsList tabs={gameTabs} />
    </div>
  );
};

export default GamesPage;
