import axios from "axios";

import {
  FetchedLevelsData,
  LevelTabsActionTypes,
  FetchLevelsRequestData,
  LevelsSortingProperty,
} from "./level-tabs.types";

export const fetchLevelTabsStart = () => ({
  type: LevelTabsActionTypes.FETCH_LEVEL_TABS_START,
});

export const fetchLevelTabsSuccess = (
  tabs: FetchedLevelsData,
  sortedBy: LevelsSortingProperty,
  sortedDescending: boolean
) => ({
  type: LevelTabsActionTypes.FETCH_LEVEL_TABS_SUCCESS,
  payload: {
    tabs,
    sortedBy,
    sortedDescending,
  },
});

export const fetchLevelTabsFailure = (e: any) => ({
  type: LevelTabsActionTypes.FETCH_LEVEL_TABS_FAILURE,
  payload: e,
});

export const fetchLevelTabsStartAsync = (data: FetchLevelsRequestData) => {
  return (dispatch: any) => {
    dispatch(fetchLevelTabsStart());
    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER_API}/activity_log/find_win_log_levels`,
      data,
    })
      .then((res) => {
        const fetchedLevelsData: FetchedLevelsData = res.data;
        dispatch(
          fetchLevelTabsSuccess(
            fetchedLevelsData,
            data.sortedBy,
            data.descending
          )
        );
      })
      .catch((e) => dispatch(fetchLevelTabsFailure(e)));
  };
};
