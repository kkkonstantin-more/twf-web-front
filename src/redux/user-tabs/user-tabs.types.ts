import { AppTabProps } from "../../copmonents/app-tab/app-tab";

export enum UserTabsActionTypes {
  FETCH_USER_TABS_START = "FETCH_USER_TABS_START",
  FETCH_USER_TABS_SUCCESS = "FETCH_USER_TABS_SUCCESS",
  FETCH_USER_TABS_FAILURE = "FETCH_USER_TABS_FAILURE",
}

export interface UserTabsState {
  tabs: AppTabProps[] | null;
  isFetching: boolean;
  errorMessage: string | null;
}

export enum UsersSortingProperty {
  BY_USER_LOGIN = "BY_USER_LOGIN",
  BY_USER_NAME = "BY_USER_NAME",
  BY_USER_FULL_NAME = "BY_USER_FULL_NAME",
  BY_LEVELS_COUNT = "BY_LEVELS_COUNT",
  NONE = "NONE",
}

export interface FetchUsersRequestData {
  levelCode: string | null;
  gameCode: string | null;
  sortedBy: UsersSortingProperty;
  descending: boolean;
  offset: number;
  limit: number;
}

export interface FetchedUsersData {
  userCode: string;
  userLogin: string;
  userName: string;
  userFullName: string;
  additionalInfo: string;
  levelsCount: number;
}
