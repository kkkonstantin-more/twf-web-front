import axios from "axios";

import {
  FetchedUsersData,
  UserTabsActionTypes,
  FetchUsersRequestData,
} from "./user-tabs.types";

export const fetchUserTabsStart = () => ({
  type: UserTabsActionTypes.FETCH_USER_TABS_START,
});

export const fetchUserTabsSuccess = (tabs: FetchedUsersData) => ({
  type: UserTabsActionTypes.FETCH_USER_TABS_SUCCESS,
  payload: tabs,
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
        dispatch(fetchUserTabsSuccess(fetchedUsersData));
      })
      .catch(() => dispatch(fetchUserTabsFailure("error message")));
  };
};
