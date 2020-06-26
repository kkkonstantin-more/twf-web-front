import React from "react";
// import { GamesSortingProperty } from "../../types/fetched-data/FetchedGames";
import { GamesSortingProperty } from "../../redux/game-tabs/game-tabs.types";
import { AppTabHeaderField } from "../../copmonents/app-tab-header/app-tab-header";

import fetchFilterSortGamesAndUpdateState from "../../utils/fetching-data/fetchFilterSortGamesAndUpdateState";
import { GameAppTabFieldName } from "../../types/app-tabs/GameAppTab";

const gamesPageAppTabHeaderFieldsWithSorters = (
  stateSetter: React.Dispatch<any>
): AppTabHeaderField[] => [
  {
    name: GameAppTabFieldName.gameName,
    textId: "appTabHeader.gameName",
    withFilter: false,
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
    name: GameAppTabFieldName.gameCode,
    textId: "appTabHeader.gameCode",
    withFilter: true,
  },
  {
    name: GameAppTabFieldName.levelsCount,
    textId: "appTabHeader.levelsCount",
    withFilter: true,
    // sorterProps: {
    //   sortAndUpdateState: (descending: boolean) =>
    //     fetchFilterSortGamesAndUpdateState(
    //       stateSetter,
    //       null,
    //       null,
    //       GamesSortingProperty.BY_LEVELS_COUNT,
    //       descending
    //     ),
    //   initialDescending: true,
    // },
  },
  {
    name: GameAppTabFieldName.usersCount,
    textId: "appTabHeader.usersCount",
    withFilter: true,
    // sorterProps: {
    //   sortAndUpdateState: (descending: boolean) =>
    //     fetchFilterSortGamesAndUpdateState(
    //       stateSetter,
    //       null,
    //       null,
    //       GamesSortingProperty.BY_USERS_COUNT,
    //       descending
    //     ),
    //   initialDescending: true,
    // },
  },
];

export default gamesPageAppTabHeaderFieldsWithSorters;
