import LEVEL_TABS_INITIAL_STATE from "./level-tabs.state";

import { LevelTabsActionTypes, LevelTabsState } from "./level-tabs.types";
import { filterFetchedLevelsData } from "./level-tabs.utils";
import { AppTabProps } from "../../copmonents/app-tab/app-tab";

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
      const levelTabs: AppTabProps[] = filterFetchedLevelsData(action.payload);
      return {
        ...state,
        tabs: state.tabs ? state.tabs.concat(levelTabs) : levelTabs,
        isFetching: false,
        errorMessage: null,
        isAllFetched: levelTabs.length === 0,
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
