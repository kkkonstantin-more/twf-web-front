import USER_TABS_INITIAL_STATE from "./user-tabs.state";

import { UserTabsActionTypes, UserTabsState } from "./user-tabs.types";
import { AppTabProps } from "../../components/app-tab/app-tab";
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
      let userTabs: AppTabProps[] = filterFetchedUsersData(action.payload.tabs);
      if (
        state.sortedBy === action.payload.sortedBy &&
        state.sortedDescending === action.payload.sortedDescending
      ) {
        return {
          ...state,
          tabs: state.tabs ? state.tabs.concat(userTabs) : userTabs,
          isFetching: false,
          errorMessage: null,
          isAllFetched: userTabs.length !== state.pageSize,
          currentPage: ++state.currentPage,
        };
      } else {
        return {
          ...state,
          tabs: userTabs,
          isFetching: false,
          errorMessage: null,
          isAllFetched: userTabs.length !== state.pageSize,
          sortedBy: action.payload.sortedBy,
          sortedDescending: action.payload.sortedDescending,
          currentPage: 1,
        };
      }
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
