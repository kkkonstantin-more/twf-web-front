import { LevelTabsState } from "./level-tabs.types";

const LEVEL_TABS_INITIAL_STATE: LevelTabsState = {
  tabs: null,
  isFetching: false,
  isAllFetched: false,
  errorMessage: null,
};

export default LEVEL_TABS_INITIAL_STATE;
