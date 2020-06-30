import { UserTabsState } from "./user-tabs.types";

const USER_TABS_INITIAL_STATE: UserTabsState = {
  tabs: null,
  isFetching: false,
  errorMessage: null,
};

export default USER_TABS_INITIAL_STATE;
