import React, { useEffect, useState } from "react";
import translate from "../../translations/translate";
import axios from "axios";

import SortersList from "../../copmonents/sorters-list/sorters-list";
import AppTabsList from "../../copmonents/app-tabs-list/app-tabs-list";
import FiltersList from "../../copmonents/filters-list/filters-list";

import { SortersListItemInterface } from "../../copmonents/sorters-list/sorters-list";
import { FiltersListItemProps } from "../../copmonents/filters-list/filters-list";
import { AppTabProps } from "../../copmonents/app-tab/app-tab";

import "./games-page.scss";

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
  const filters: FiltersListItemProps[] = [
    {
      propertyName: "code",
      translationTextId: "code",
    },
    {
      propertyName: "levelsCount",
      translationTextId: "levelsCount",
    },
    {
      propertyName: "playersCount",
      translationTextId: "playersCount",
    },
  ];

  const [gameTabs, setGameTabs] = useState<AppTabProps[]>([]);

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
    }).then((res) => {
      let games: Game[] = [];
      const data = res.data;
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
            value: "/game-info/" + game.code,
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
      <FiltersList
        array={gameTabs}
        stateSetter={setGameTabs}
        items={filters}
        className="u-mb-sm"
      />
      <AppTabsList tabs={gameTabs} />
    </div>
  );
};

export default GamesPage;
