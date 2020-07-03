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

export const selectUserTabsSortedBy = createSelector(
  [selectUserTabs],
  (userTabs: UserTabsState) => userTabs.sortedBy
);

export const selectUserTabsSortedDescending = createSelector(
  [selectUserTabs],
  (userTabs: UserTabsState) => userTabs.sortedDescending
);

export const selectUserTabsPageSize = createSelector(
  [selectUserTabs],
  (userTabs: UserTabsState) => userTabs.pageSize
);

export const selectUserTabsCurrentPage = createSelector(
  [selectUserTabs],
  (userTabs: UserTabsState) => userTabs.currentPage
);

export const selectIsAllUserTabsFetched = createSelector(
  [selectUserTabs],
  (userTabs: UserTabsState) => userTabs.isAllFetched
);
