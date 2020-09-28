import { AppTabProps } from "../../components/app-tab/app-tab";

export enum GameTabsActionTypes {
  FETCH_GAME_TABS_START = "FETCH_GAME_TABS_START",
  FETCH_GAME_TABS_SUCCESS = "FETCH_GAME_TABS_SUCCESS",
  FETCH_GAME_TABS_FAILURE = "FETCH_GAME_TABS_FAILURE",
}

export interface GameTabsState {
  tabs: AppTabProps[] | null;
  isFetching: boolean;
  errorMessage: string | null;
}

export interface FetchedGamesData {
  gameName: string;
  gameCode: string;
  levelsCount: number;
  usersCount: number;
}

export enum GamesSortingProperty {
  BY_GAME_NAME = "BY_GAME_NAME",
  BY_USERS_COUNT = "BY_USERS_COUNT",
  BY_LEVELS_COUNT = "BY_LEVELS_COUNT",
  NONE = "NONE",
}

export interface FetchGamesRequestData {
  gameCode: string | null;
  userCode: string | null;
  sortedBy: GamesSortingProperty;
  descending: boolean;
  offset: number;
  limit: number;
}
