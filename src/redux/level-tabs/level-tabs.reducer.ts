import LEVEL_TABS_INITIAL_STATE from "./level-tabs.state";

import { LevelTabsActionTypes, LevelTabsState } from "./level-tabs.types";
import { filterFetchedLevelsData } from "./level-tabs.utils";
import { AppTabProps } from "../../components/app-tab/app-tab";

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
      let levelTabs: AppTabProps[] = filterFetchedLevelsData(
        action.payload.tabs
      );
      if (
        state.sortedBy === action.payload.sortedBy &&
        state.sortedDescending === action.payload.sortedDescending
      ) {
        return {
          ...state,
          tabs: state.tabs ? state.tabs.concat(levelTabs) : levelTabs,
          isFetching: false,
          errorMessage: null,
          isAllFetched: levelTabs.length !== state.pageSize,
          currentPage: ++state.currentPage,
        };
      } else {
        return {
          ...state,
          tabs: levelTabs,
          isFetching: false,
          errorMessage: null,
          isAllFetched: levelTabs.length !== state.pageSize,
          sortedBy: action.payload.sortedBy,
          sortedDescending: action.payload.sortedDescending,
          currentPage: 1,
        };
      }
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
