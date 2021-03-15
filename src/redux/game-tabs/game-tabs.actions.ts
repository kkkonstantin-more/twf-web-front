import axios from "axios";

import {
  FetchedGamesData,
  GameTabsActionTypes,
  FetchGamesRequestData,
} from "./game-tabs.types";
import { getAuthToken } from "../../utils/local-storage/auth-token";

export const fetchGameTabsStart = () => ({
  type: GameTabsActionTypes.FETCH_GAME_TABS_START,
});

export const fetchGameTabsSuccess = (tabs: FetchedGamesData) => ({
  type: GameTabsActionTypes.FETCH_GAME_TABS_SUCCESS,
  payload: tabs,
});

export const fetchGameTabsFailure = (e: any) => ({
  type: GameTabsActionTypes.FETCH_GAME_TABS_FAILURE,
  payload: e,
});

export const fetchGameTabsStartAsync = (data: FetchGamesRequestData) => {
  return (dispatch: any) => {
    dispatch(fetchGameTabsStart());
    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER_API}/activity_log/find_win_log_games`,
      data,
    })
      .then((res) => {
        const fetchedGamesData: FetchedGamesData = res.data;
        dispatch(fetchGameTabsSuccess(fetchedGamesData));
      })
      .catch((e) => dispatch(fetchGameTabsFailure(e)));
  };
};
