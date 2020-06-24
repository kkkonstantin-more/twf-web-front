import React from "react";
import axios from "axios";

import FetchedGames, {
  GamesSortingProperty,
} from "../../interfaces/fetched-data/FetchedGames";
import { AppTabProps } from "../../copmonents/app-tab/app-tab";

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
        fields: [
          {
            name: "gameName",
            value: game.gameName,
          },
          {
            name: "gameCode",
            value: game.gameCode,
          },
          {
            name: "levelsCount",
            value: game.levelsCount,
          },
          {
            name: "playersCount",
            value: game.usersCount,
          },
        ],
      });
    });
    stateSetter([...gamesAppTabProps]);
  });
};

export default fetchFilterSortGamesAndUpdateState;
