import { LevelTabsState } from "./level-tabs.types";

const LEVEL_TABS_INITIAL_STATE: LevelTabsState = {
  tabs: null,
  isFetching: false,
  isAllFetched: false,
  errorMessage: null,
  sortedBy: null,
  sortedDescending: true,
  pageSize: 10,
  currentPage: 0,
};

export default LEVEL_TABS_INITIAL_STATE;
