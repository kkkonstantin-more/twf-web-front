import axios from "axios";

import {
  FetchedLevelsData,
  LevelTabsActionTypes,
  FetchLevelsRequestData,
} from "./level-tabs.types";

export const fetchGameTabsStart = () => ({
  type: LevelTabsActionTypes.FETCH_LEVEL_TABS_START,
});

export const fetchGameTabsSuccess = (tabs: FetchedLevelsData) => ({
  type: LevelTabsActionTypes.FETCH_LEVEL_TABS_SUCCESS,
  payload: tabs,
});

export const fetchGameTabsFailure = (errorMessage: string) => ({
  type: LevelTabsActionTypes.FETCH_LEVEL_TABS_FAILURE,
  payload: errorMessage,
});

export const fetchLevelTabsStartAsync = (data: FetchLevelsRequestData) => {
  return (dispatch: any) => {
    dispatch(fetchGameTabsStart());
    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER_API}/activity_log/find_win_log_levels`,
      data,
    })
      .then((res) => {
        const fetchedLevelsData: FetchedLevelsData = res.data;
        dispatch(fetchGameTabsSuccess(fetchedLevelsData));
      })
      .catch(() => dispatch(fetchGameTabsFailure("error message")));
  };
};
