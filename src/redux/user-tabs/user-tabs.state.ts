import { UserTabsState } from "./user-tabs.types";

const USER_TABS_INITIAL_STATE: UserTabsState = {
  tabs: null,
  isFetching: false,
  isAllFetched: false,
  errorMessage: null,
  sortedBy: null,
  sortedDescending: true,
  pageSize: 100,
  currentPage: 0,
};

export default USER_TABS_INITIAL_STATE;
