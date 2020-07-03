import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./player-info-page.scss";
import translate from "../../translations/translate";
import { AppTabProps } from "../../copmonents/app-tab/app-tab";
import { Tab, Tabs } from "react-bootstrap";
import AppTabHeader from "../../copmonents/app-tab-header/app-tab-header";
import { AppTabType } from "../../types/app-tabs/AppTab";
import HEADER_TABS_STATE from "../../redux/header-tabs/header-tabs.state";
import { connect, MapDispatchToProps } from "react-redux";
import {
  FetchLevelsRequestData,
  LevelsSortingProperty,
} from "../../redux/level-tabs/level-tabs.types";
import { fetchLevelTabsStartAsync } from "../../redux/level-tabs/level-tabs.actions";
import { createStructuredSelector } from "reselect";
import {
  selectIsAllLevelTabsFetched,
  selectIsLevelTabsFetching,
  selectLevelTabsCurrentPage,
  selectLevelTabsList,
  selectLevelTabsPageSize,
  selectLevelTabsSortedBy,
  selectLevelTabsSortedDescending,
} from "../../redux/level-tabs/level-tabs-selectors";
import { injectIntl } from "react-intl";
import {
  selectGameTabsList,
  selectIsGameTabsFetching,
} from "../../redux/game-tabs/game-tabs.selectors";
import {
  FetchGamesRequestData,
  GamesSortingProperty,
} from "../../redux/game-tabs/game-tabs.types";
import { fetchGameTabsStartAsync } from "../../redux/game-tabs/game-tabs.actions";
import AppTabsList from "../../copmonents/app-tabs-list/app-tabs-list";
import InfiniteScroll from "react-infinite-scroller";
import AppSpinner from "../../copmonents/app-spinner/app-spinner";

interface PlayerInfoPageProps {
  intl: any;
  // redux props
  fetchLevelTabsStartAsync: (data: FetchLevelsRequestData) => void;
  isLevelTabsFetching: boolean;
  fetchGameTabsStartAsync: (data: FetchGamesRequestData) => void;
  isAllLevelTabsFetched: boolean;
  isGameTabsFetching: boolean;
  levelTabs: AppTabProps[];
  gameTabs: AppTabProps[];
  levelsTabsSortedBy: LevelsSortingProperty;
  levelsSortedByDescending: boolean;
  levelTabsPageSize: number;
  levelTabsCurrentPage: number;
}

const PlayerInfoPage: React.FC<PlayerInfoPageProps> = ({
  fetchLevelTabsStartAsync,
  fetchGameTabsStartAsync,
  isLevelTabsFetching,
  isGameTabsFetching,
  isAllLevelTabsFetched,
  levelTabs,
  gameTabs,
  levelsTabsSortedBy,
  levelsSortedByDescending,
  levelTabsPageSize,
  levelTabsCurrentPage,
}) => {
  // translation vars
  const translationPrefix: string = "playerInfoPage";
  const titleId: string = translationPrefix + ".title";
  // other
  const { playerCode } = useParams();

  useEffect(() => {
    fetchGameTabsStartAsync({
      userCode: playerCode,
      gameCode: null,
      sortedBy: GamesSortingProperty.BY_USERS_COUNT,
      descending: true,
      offset: 0,
      limit: 10000,
    });
    fetchLevelTabsStartAsync({
      userCode: playerCode,
      gameCode: null,
      sortedBy: LevelsSortingProperty.BY_USERS_COUNT,
      descending: true,
      offset: 0,
      limit: 10,
    });
  }, [playerCode]);

  const nextPage = (sortedBy: LevelsSortingProperty) => {
    if (!isLevelTabsFetching) {
      fetchLevelTabsStartAsync({
        userCode: playerCode,
        gameCode: null,
        sortedBy,
        descending: levelsSortedByDescending,
        offset: levelTabsCurrentPage * levelTabsPageSize,
        limit: levelTabsPageSize,
      });
    }
  };

  return (
    <div className="player-info-page u-container">
      <h1>
        {translate(titleId)}: {playerCode}
      </h1>
      <Tabs defaultActiveKey="games" id="tabs">
        <Tab
          eventKey="games"
          title={"Сыграл в игры"}

          // title={intl.formatMessage({ id: playersTabId })}
        >
          <div className="game-info-page__played-game-players">
            <AppTabHeader
              type={AppTabType.GAME}
              fields={HEADER_TABS_STATE[AppTabType.GAME]}
              refersTo={{ userCode: playerCode }}
            />
            {gameTabs ? (
              <AppTabsList tabs={gameTabs} />
            ) : (
              <AppSpinner loading={true} />
            )}
          </div>
        </Tab>
        <Tab
          eventKey="levels"
          title="Пройденные уровни"
          // title={intl.formatMessage({ id: levelsTabId })}
        >
          <AppTabHeader
            type={AppTabType.LEVEL}
            fields={HEADER_TABS_STATE[AppTabType.LEVEL]}
            refersTo={{ userCode: playerCode }}
          />
          {/*{levelTabs && <AppTabsList tabs={levelTabs} />}*/}

          {levelTabs ? (
            <InfiniteScroll
              loadMore={() => {
                nextPage(levelsTabsSortedBy);
              }}
              hasMore={!isAllLevelTabsFetched}
              loader={<AppSpinner loading={true} />}
            >
              <AppTabsList tabs={levelTabs} />
            </InfiniteScroll>
          ) : (
            <AppSpinner loading={true} />
          )}
        </Tab>
      </Tabs>
    </div>
  );
};

const mapDispatchToProps: MapDispatchToProps<any, any> = (dispatch: any) => ({
  fetchLevelTabsStartAsync: (data: FetchLevelsRequestData) =>
    dispatch(fetchLevelTabsStartAsync(data)),
  fetchGameTabsStartAsync: (data: FetchGamesRequestData) =>
    dispatch(fetchGameTabsStartAsync(data)),
});

const mapStateToProps = createStructuredSelector<any, any>({
  isLevelTabsFetching: selectIsLevelTabsFetching,
  isAllLevelTabsFetched: selectIsAllLevelTabsFetched,
  levelTabs: selectLevelTabsList,
  isGameTabsFetching: selectIsGameTabsFetching,
  gameTabs: selectGameTabsList,
  levelsTabsSortedBy: selectLevelTabsSortedBy,
  levelsSortedByDescending: selectLevelTabsSortedDescending,
  levelTabsPageSize: selectLevelTabsPageSize,
  levelTabsCurrentPage: selectLevelTabsCurrentPage,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(PlayerInfoPage));
