import React from "react";
import axios from "axios";

import FetchedGames from "../../types/fetched-data/FetchedGames";
import { GamesSortingProperty } from "../../redux/game-tabs/game-tabs.types";
import { AppTabProps } from "../../copmonents/app-tab/app-tab";
import { AppTabType } from "../../types/app-tabs/AppTab";
import { GameAppTabFieldName } from "../../types/app-tabs/GameAppTab";

const fetchFilterSortGamesAndUpdateState = (
  stateSetter: React.Dispatch<AppTabProps[]>,
  gameCode: string | null = null,
  userCode: string | null = null,
  sortedBy: GamesSortingProperty = GamesSortingProperty.NONE,
  descending: boolean = false,
  offset: number = 0,
  limit: number = 10000
): void => {
  axios({
    method: "post",
    url: `${process.env.REACT_APP_SERVER_API}/activity_log/find_win_log_games`,
    data: {
      gameCode,
      userCode,
      sortedBy,
      descending,
      offset,
      limit,
    },
  }).then((res) => {
    const games: FetchedGames[] = res.data;
    const gamesAppTabProps: AppTabProps[] = [];
    // filter fetched games
    games.forEach((game: FetchedGames) => {
      gamesAppTabProps.push({
        link: "/matifygames/" + game.gameCode,
        type: AppTabType.GAME,
        fields: [
          {
            name: GameAppTabFieldName.gameName,
            value: game.gameName,
          },
          {
            name: GameAppTabFieldName.gameCode,
            value: game.gameCode,
          },
          {
            name: GameAppTabFieldName.levelsCount,
            value: game.levelsCount,
          },
          {
            name: GameAppTabFieldName.usersCount,
            value: game.usersCount,
          },
        ],
      });
    });
    stateSetter([...gamesAppTabProps]);
  });
};

export default fetchFilterSortGamesAndUpdateState;
