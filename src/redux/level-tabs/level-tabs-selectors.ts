import { createSelector } from "reselect";
import { RootState } from "../root-reducer";
import { LevelTabsState } from "./level-tabs.types";

const selectLevelTabs = (state: RootState) => state.levelTabs;

export const selectIsLevelTabsFetching = createSelector(
  [selectLevelTabs],
  (levelTabs: LevelTabsState) => levelTabs.isFetching
);

export const selectLevelTabsList = createSelector(
  [selectLevelTabs],
  (levelTabs: LevelTabsState) => levelTabs.tabs
);
