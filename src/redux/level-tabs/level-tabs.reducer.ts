import LEVEL_TABS_INITIAL_STATE from "./level-tabs.state";

import { LevelTabsActionTypes, LevelTabsState } from "./level-tabs.types";
import { filterFetchedLevelsData } from "./level-tabs.utils";

const levelTabsReducer = (
  state: LevelTabsState = LEVEL_TABS_INITIAL_STATE,
  action: {
    type: LevelTabsActionTypes;
    payload: any;
  }
) => {
  switch (action.type) {
    case LevelTabsActionTypes.FETCH_LEVEL_TABS_START:
      return {
        ...state,
        isFetching: true,
        errorMessage: null,
      };
    case LevelTabsActionTypes.FETCH_LEVEL_TABS_SUCCESS:
      return {
        ...state,
        tabs: filterFetchedLevelsData(action.payload),
        isFetching: false,
        errorMessage: null,
      };
    case LevelTabsActionTypes.FETCH_LEVEL_TABS_FAILURE:
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

export default levelTabsReducer;
