import React, { useEffect } from "react";
import translate from "../../translations/translate";
// redux
import { connect, MapDispatchToProps } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectIsUserTabsFetching,
  selectUserTabsList,
} from "../../redux/user-tabs/user-tabs.selectors";
import { fetchUserTabsStartAsync } from "../../redux/user-tabs/user-tabs.actions";
// components
import AppTabHeader from "../../copmonents/app-tab-header/app-tab-header";
import AppTabsList from "../../copmonents/app-tabs-list/app-tabs-list";
// types
import { AppTabProps } from "../../copmonents/app-tab/app-tab";
import { AppTabType } from "../../types/app-tabs/AppTab";
import {
  FetchUsersRequestData,
  UsersSortingProperty,
} from "../../redux/user-tabs/user-tabs.types";

import HEADER_TABS_STATE from "../../redux/header-tabs/header-tabs.state";

import "./users-page.scss";

interface UsersPageProps {
  // redux props
  isUserTabsFetching: boolean;
  userTabs: AppTabProps[] | null;
  fetchUserTabsStartAsync: (data: FetchUsersRequestData) => AppTabProps[];
}

const UsersPage: React.FC<UsersPageProps> = ({
  isUserTabsFetching,
  userTabs,
  fetchUserTabsStartAsync,
}) => {
  // translation vars
  const translationPrefix: string = "playersPage";
  const titleId: string = translationPrefix + ".title";

  useEffect(() => {
    fetchUserTabsStartAsync({
      gameCode: null,
      levelCode: null,
      sortedBy: UsersSortingProperty.BY_LEVELS_COUNT,
      descending: true,
      offset: 0,
      limit: 10000,
    });
  }, []);

  return (
    <div className="players-page u-container">
      <h1 className="u-mb-sm">{translate(titleId)}</h1>
      <AppTabHeader
        type={AppTabType.USER}
        fields={HEADER_TABS_STATE[AppTabType.USER]}
      />
      {userTabs && <AppTabsList tabs={userTabs} />}
    </div>
  );
};

const mapDispatchToProps: MapDispatchToProps<any, any> = (dispatch: any) => ({
  fetchUserTabsStartAsync: (data: FetchUsersRequestData) =>
    dispatch(fetchUserTabsStartAsync(data)),
});

const mapStateToProps = createStructuredSelector<any, any>({
  isUserTabsFetching: selectIsUserTabsFetching,
  userTabs: selectUserTabsList,
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersPage);
