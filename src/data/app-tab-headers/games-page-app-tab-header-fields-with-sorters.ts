import React from "react";
import { GamesSortingProperty } from "../../types/fetched-data/FetchedGames";
import { AppTabHeaderField } from "../../copmonents/app-tab-header/app-tab-header";

import fetchFilterSortGamesAndUpdateState from "../../utils/fetching-data/fetchFilterSortGamesAndUpdateState";
import { GameAppTabFieldName } from "../../types/app-tabs/GameAppTab";

const gamesPageAppTabHeaderFieldsWithSorters = (
  stateSetter: React.Dispatch<any>
): AppTabHeaderField[] => [
  {
    name: GameAppTabFieldName.gameName,
    textId: "appTabHeader.gameName",
    // sorterProps: {
    //   sortAndUpdateState: (descending: boolean) =>
    //     fetchFilterSortGamesAndUpdateState(
    //       stateSetter,
    //       null,
    //       null,
    //       GamesSortingProperty.BY_GAME_NAME,
    //       descending
    //     ),
    //   initialDescending: false,
    // },
  },
  {
    fieldName: "gameCode",
    fieldTextId: "appTabHeader.gameCode",
  },
  {
    fieldName: "levelsCount",
    fieldTextId: "appTabHeader.levelsCount",
    sorterProps: {
      sortAndUpdateState: (descending: boolean) =>
        fetchFilterSortGamesAndUpdateState(
          stateSetter,
          null,
          null,
          GamesSortingProperty.BY_LEVELS_COUNT,
          descending
        ),
      initialDescending: true,
    },
  },
  {
    fieldName: "usersCount",
    fieldTextId: "appTabHeader.usersCount",
    sorterProps: {
      sortAndUpdateState: (descending: boolean) =>
        fetchFilterSortGamesAndUpdateState(
          stateSetter,
          null,
          null,
          GamesSortingProperty.BY_USERS_COUNT,
          descending
        ),
      initialDescending: true,
    },
  },
];

export default gamesPageAppTabHeaderFieldsWithSorters;
