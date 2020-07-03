import axios from "axios";

import {
  FetchedUsersData,
  UserTabsActionTypes,
  FetchUsersRequestData,
  UsersSortingProperty,
} from "./user-tabs.types";
import { LevelsSortingProperty } from "../level-tabs/level-tabs.types";

export const fetchUserTabsStart = () => ({
  type: UserTabsActionTypes.FETCH_USER_TABS_START,
});

export const fetchUserTabsSuccess = (
  tabs: FetchedUsersData,
  sortedBy: UsersSortingProperty,
  sortedDescending: boolean
) => ({
  type: UserTabsActionTypes.FETCH_USER_TABS_SUCCESS,
  payload: {
    tabs,
    sortedBy,
    sortedDescending,
  },
});

export const fetchUserTabsFailure = (errorMessage: string) => ({
  type: UserTabsActionTypes.FETCH_USER_TABS_FAILURE,
  payload: errorMessage,
});

export const fetchUserTabsStartAsync = (data: FetchUsersRequestData) => {
  return (dispatch: any) => {
    dispatch(fetchUserTabsStart());
    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER_API}/activity_log/find_win_log_users`,
      data,
    })
      .then((res) => {
        const fetchedUsersData: FetchedUsersData = res.data;
        dispatch(
          fetchUserTabsSuccess(fetchedUsersData, data.sortedBy, data.descending)
        );
      })
      .catch(() => dispatch(fetchUserTabsFailure("error message")));
  };
};
