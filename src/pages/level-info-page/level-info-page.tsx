import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
//
import translate from "../../translations/translate";
import AppTabHeader from "../../copmonents/app-tab-header/app-tab-header";
import { AppTabType } from "../../types/app-tabs/AppTab";
import HEADER_TABS_STATE from "../../redux/header-tabs/header-tabs.state";
import AppTabsList from "../../copmonents/app-tabs-list/app-tabs-list";
import { connect, MapDispatchToProps } from "react-redux";
import { FetchLevelsRequestData } from "../../redux/level-tabs/level-tabs.types";
import { fetchLevelTabsStartAsync } from "../../redux/level-tabs/level-tabs.actions";
import { createStructuredSelector } from "reselect";
import {
  selectIsUserTabsFetching,
  selectUserTabsList,
} from "../../redux/user-tabs/user-tabs.selectors";
import { AppTabProps } from "../../copmonents/app-tab/app-tab";
import {
  FetchUsersRequestData,
  UsersSortingProperty,
} from "../../redux/user-tabs/user-tabs.types";
import { fetchUserTabsStartAsync } from "../../redux/user-tabs/user-tabs.actions";

import "./level-info-page.scss";

interface LevelInfoPageProps {
  // redux props
  isUserTabsFetching: boolean;
  userTabs: AppTabProps[] | null;
  fetchUserTabsStartAsync: (data: FetchUsersRequestData) => void;
}
const LevelInfoPage: React.FC<LevelInfoPageProps> = ({
  isUserTabsFetching,
  userTabs,
  fetchUserTabsStartAsync,
}) => {
  // translation vars
  const translationPrefix: string = "levelInfoPage";
  const titleId: string = translationPrefix + ".title";
  const completedLevelPlayersId: string =
    translationPrefix + ".completedLevelPlayers";
  // other
  const { levelCode } = useParams();

  useEffect(() => {
    fetchUserTabsStartAsync({
      levelCode,
      gameCode: null,
      sortedBy: UsersSortingProperty.BY_LEVELS_COUNT,
      descending: true,
      offset: 0,
      limit: 10000,
    });
  }, [levelCode]);

  return (
    <div className="level-info-page u-container">
      <h1>
        {translate(titleId)}: {levelCode}
      </h1>
      <h1>{translate(completedLevelPlayersId)}:</h1>
      <AppTabHeader
        type={AppTabType.USER}
        fields={HEADER_TABS_STATE[AppTabType.USER]}
        refersTo={{ levelCode }}
      />
      {userTabs && <AppTabsList tabs={userTabs} />}
    </div>
  );
};

const mapDispatchToProps: MapDispatchToProps<any, any> = (dispatch: any) => ({
  fetchLevelTabsStartAsync: (data: FetchLevelsRequestData) =>
    dispatch(fetchLevelTabsStartAsync(data)),
  fetchUserTabsStartAsync: (data: FetchUsersRequestData) =>
    dispatch(fetchUserTabsStartAsync(data)),
});

const mapStateToProps = createStructuredSelector<any, any>({
  isUserTabsFetching: selectIsUserTabsFetching,
  userTabs: selectUserTabsList,
});

export default connect(mapStateToProps, mapDispatchToProps)(LevelInfoPage);
