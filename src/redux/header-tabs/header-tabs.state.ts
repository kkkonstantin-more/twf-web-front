import { AppTabType } from "../../types/app-tabs/AppTab";
import { GameAppTabFieldName } from "../../types/app-tabs/GameAppTab";
import { UserAppTabFieldName } from "../../types/app-tabs/UserAppTab";
import { LevelAppTabFieldName } from "../../types/app-tabs/LevelAppTab";
import { GamesSortingProperty } from "../game-tabs/game-tabs.types";

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
  }[];
  [AppTabType.USER]: {
    name: UserAppTabFieldName;
    textId: string;
    withFilter: boolean;
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
    },
    {
      name: UserAppTabFieldName.userLogin,
      textId: "appTabHeader.userLogin",
      withFilter: false,
    },
    {
      name: UserAppTabFieldName.userName,
      textId: "appTabHeader.userName",
      withFilter: true,
    },
    {
      name: UserAppTabFieldName.userFullName,
      textId: "appTabHeader.usersFullName",
      withFilter: true,
    },
    {
      name: UserAppTabFieldName.levelsCompleted,
      textId: "appTabHeader.levelsCompleted",
      withFilter: true,
    },
    {
      name: UserAppTabFieldName.additionalInfo,
      textId: "appTabHeader.additionalInfo",
      withFilter: true,
    },
  ],
  [AppTabType.LEVEL]: [
    {
      name: LevelAppTabFieldName.levelCode,
      textId: "appTabHeader.levelCode",
      withFilter: false,
    },
    {
      name: LevelAppTabFieldName.gameName,
      textId: "appTabHeader.gameName",
      withFilter: true,
    },
    {
      name: LevelAppTabFieldName.difficulty,
      textId: "appTabHeader.difficulty",
      withFilter: true,
    },
    {
      name: LevelAppTabFieldName.usersCount,
      textId: "appTabHeader.usersCount",
      withFilter: true,
    },
  ],
};

export default HEADER_TABS_STATE;
