import axios from "axios";

import {
  FetchedGamesData,
  GameTabsActionTypes,
  FetchGamesRequestData,
} from "./game-tabs.types";
// import { GamesSortingProperty } from "../../types/fetched-data/FetchedGames";
import { GamesSortingProperty } from "./game-tabs.types";

export const fetchGameTabsStart = () => ({
  type: GameTabsActionTypes.FETCH_GAME_TABS_START,
});

export const fetchGameTabsSuccess = (tabs: FetchedGamesData) => ({
  type: GameTabsActionTypes.FETCH_GAME_TABS_SUCCESS,
  payload: tabs,
});

export const fetchGameTabsFailure = (errorMessage: string) => ({
  type: GameTabsActionTypes.FETCH_GAME_TABS_FAILURE,
  payload: errorMessage,
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
      .catch(() => dispatch(fetchGameTabsFailure("error message")));
  };
};
