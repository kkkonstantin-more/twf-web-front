import { AppTabType } from "../../types/app-tabs/AppTab";
import { GameAppTabFieldName } from "../../types/app-tabs/GameAppTab";
import { UserAppTabFieldName } from "../../types/app-tabs/UserAppTab";
import { LevelAppTabFieldName } from "../../types/app-tabs/LevelAppTab";
import { GamesSortingProperty } from "../game-tabs/game-tabs.types";
import { LevelsSortingProperty } from "../level-tabs/level-tabs.types";
import { UsersSortingProperty } from "../user-tabs/user-tabs.types";

export interface HeaderTabsState {
  [AppTabType.GAME]: {
    name: GameAppTabFieldName;
    textId: string;
    withFilter: boolean;
    withSorter: GamesSortingProperty | null;
  }[];
  [AppTabType.LEVEL]: {
    name: LevelAppTabFieldName;
    textId: string;
    withFilter: boolean;
    withSorter: LevelsSortingProperty | null;
  }[];
  [AppTabType.USER]: {
    name: UserAppTabFieldName;
    textId: string;
    withFilter: boolean;
    withSorter: UsersSortingProperty | null;
  }[];
}

const HEADER_TABS_STATE: HeaderTabsState = {
  [AppTabType.GAME]: [
    {
      name: GameAppTabFieldName.gameName,
      textId: "appTabHeader.gameName",
      withFilter: false,
      withSorter: GamesSortingProperty.BY_GAME_NAME,
    },
    {
      name: GameAppTabFieldName.gameCode,
      textId: "appTabHeader.gameCode",
      withFilter: true,
      withSorter: null,
    },
    {
      name: GameAppTabFieldName.levelsCount,
      textId: "appTabHeader.levelsCount",
      withFilter: true,
      withSorter: GamesSortingProperty.BY_LEVELS_COUNT,
    },
    {
      name: GameAppTabFieldName.usersCount,
      textId: "appTabHeader.usersCount",
      withFilter: true,
      withSorter: GamesSortingProperty.BY_USERS_COUNT,
    },
  ],
  [AppTabType.USER]: [
    {
      name: UserAppTabFieldName.userCode,
      textId: "appTabHeader.userCode",
      withFilter: true,
      withSorter: null,
    },
    {
      name: UserAppTabFieldName.userLogin,
      textId: "appTabHeader.userLogin",
      withFilter: false,
      withSorter: UsersSortingProperty.BY_USER_LOGIN,
    },
    {
      name: UserAppTabFieldName.userName,
      textId: "appTabHeader.userName",
      withFilter: true,
      withSorter: UsersSortingProperty.BY_USER_NAME,
    },
    {
      name: UserAppTabFieldName.userFullName,
      textId: "appTabHeader.usersFullName",
      withFilter: true,
      withSorter: UsersSortingProperty.BY_USER_FULL_NAME,
    },
    {
      name: UserAppTabFieldName.levelsCompleted,
      textId: "appTabHeader.levelsCompleted",
      withFilter: true,
      withSorter: UsersSortingProperty.BY_LEVELS_COUNT,
    },
    {
      name: UserAppTabFieldName.additionalInfo,
      textId: "appTabHeader.additionalInfo",
      withFilter: true,
      withSorter: null,
    },
  ],
  [AppTabType.LEVEL]: [
    {
      name: LevelAppTabFieldName.levelCode,
      textId: "appTabHeader.levelCode",
      withFilter: false,
      withSorter: null,
    },
    {
      name: LevelAppTabFieldName.gameName,
      textId: "appTabHeader.gameName",
      withFilter: true,
      withSorter: LevelsSortingProperty.BY_GAME_NAME,
    },
    {
      name: LevelAppTabFieldName.difficulty,
      textId: "appTabHeader.difficulty",
      withFilter: true,
      withSorter: LevelsSortingProperty.BY_DIFFICULTY,
    },
    {
      name: LevelAppTabFieldName.usersCount,
      textId: "appTabHeader.usersCount",
      withFilter: true,
      withSorter: LevelsSortingProperty.BY_USERS_COUNT,
    },
  ],
};

export default HEADER_TABS_STATE;
