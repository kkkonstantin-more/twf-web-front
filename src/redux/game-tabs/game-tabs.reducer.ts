import GAME_TABS_INITIAL_STATE from "./game-tabs.state";

import { GameTabsActionTypes, GameTabsState } from "./game-tabs.types";
import { filterFetchedGamesData } from "./game-tabs.utils";

const gameTabsReducer = (
  state: GameTabsState = GAME_TABS_INITIAL_STATE,
  action: {
    type: GameTabsActionTypes;
    payload: any;
  }
) => {
  switch (action.type) {
    case GameTabsActionTypes.FETCH_GAME_TABS_START:
      return {
        ...state,
        isFetching: true,
        errorMessage: null,
      };
    case GameTabsActionTypes.FETCH_GAME_TABS_SUCCESS:
      return {
        ...state,
        tabs: filterFetchedGamesData(action.payload),
        isFetching: false,
        errorMessage: null,
      };
    case GameTabsActionTypes.FETCH_GAME_TABS_FAILURE:
      return {
        ...state,
        tabs: null,
        isFetching: false,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export default gameTabsReducer;
