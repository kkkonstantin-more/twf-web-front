import { createSelector } from "reselect";
import { RootState } from "../root-reducer";
import { UserTabsState } from "./user-tabs.types";

const selectUserTabs = (state: RootState) => state.userTabs;

export const selectIsUserTabsFetching = createSelector(
  [selectUserTabs],
  (userTabs: UserTabsState) => userTabs.isFetching
);

export const selectUserTabsList = createSelector(
  [selectUserTabs],
  (userTabs: UserTabsState) => userTabs.tabs
);
