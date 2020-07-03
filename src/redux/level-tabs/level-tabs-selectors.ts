import { createSelector } from "reselect";
import { RootState } from "../root-reducer";
import { LevelTabsState } from "./level-tabs.types";

const selectLevelTabs = (state: RootState) => state.levelTabs;

export const selectIsLevelTabsFetching = createSelector(
  [selectLevelTabs],
  (levelTabs: LevelTabsState) => levelTabs.isFetching
);

export const selectIsAllLevelTabsFetched = createSelector(
  [selectLevelTabs],
  (levelTabs: LevelTabsState) => levelTabs.isAllFetched
);

export const selectLevelTabsList = createSelector(
  [selectLevelTabs],
  (levelTabs: LevelTabsState) => levelTabs.tabs
);

export const selectLevelTabsSortedBy = createSelector(
  [selectLevelTabs],
  (levelTabs: LevelTabsState) => levelTabs.sortedBy
);

export const selectLevelTabsSortedDescending = createSelector(
  [selectLevelTabs],
  (levelTabs: LevelTabsState) => levelTabs.sortedDescending
);

export const selectLevelTabsPageSize = createSelector(
  [selectLevelTabs],
  (levelTabs: LevelTabsState) => levelTabs.pageSize
);

export const selectLevelTabsCurrentPage = createSelector(
  [selectLevelTabs],
  (levelTabs: LevelTabsState) => levelTabs.currentPage
);
