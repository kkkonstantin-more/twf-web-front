import USER_TABS_INITIAL_STATE from "./user-tabs.state";

import { UserTabsActionTypes, UserTabsState } from "./user-tabs.types";
import { filterFetchedUsersData } from "./user-tabs.utils";

const userTabsReducer = (
  state: UserTabsState = USER_TABS_INITIAL_STATE,
  action: {
    type: UserTabsActionTypes;
    payload: any;
  }
) => {
  switch (action.type) {
    case UserTabsActionTypes.FETCH_USER_TABS_START:
      return {
        ...state,
        isFetching: true,
        errorMessage: null,
      };
    case UserTabsActionTypes.FETCH_USER_TABS_SUCCESS:
      return {
        ...state,
        tabs: filterFetchedUsersData(action.payload),
        isFetching: false,
        errorMessage: null,
      };
    case UserTabsActionTypes.FETCH_USER_TABS_FAILURE:
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

export default userTabsReducer;
