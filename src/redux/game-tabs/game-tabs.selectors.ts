import { createSelector } from "reselect";
import { RootState } from "../root-reducer";
import { GameTabsState } from "./game-tabs.types";

const selectGameTabs = (state: RootState) => state.gameTabs;

export const selectIsGameTabsFetching = createSelector(
  [selectGameTabs],
  (gameTabs: GameTabsState) => gameTabs.isFetching
);

export const selectGameTabsList = createSelector(
  [selectGameTabs],
  (gameTabs: GameTabsState) => gameTabs.tabs
);
