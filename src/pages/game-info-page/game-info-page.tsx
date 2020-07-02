import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import translate from "../../translations/translate";
import AppTabsList from "../../copmonents/app-tabs-list/app-tabs-list";

import { AppTabProps } from "../../copmonents/app-tab/app-tab";

import "./game-info-page.scss";
import { connect, MapDispatchToProps } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectIsLevelTabsFetching,
  selectLevelTabsList,
} from "../../redux/level-tabs/level-tabs-selectors";
import { fetchLevelTabsStartAsync } from "../../redux/level-tabs/level-tabs.actions";
import {
  FetchLevelsRequestData,
  LevelsSortingProperty,
} from "../../redux/level-tabs/level-tabs.types";

import { Tab, Tabs } from "react-bootstrap";
import { injectIntl } from "react-intl";
import { AppTabType } from "../../types/app-tabs/AppTab";
import HEADER_TABS_STATE from "../../redux/header-tabs/header-tabs.state";
import AppTabHeader from "../../copmonents/app-tab-header/app-tab-header";
import { selectUserTabsList } from "../../redux/user-tabs/user-tabs.selectors";
import {
  FetchUsersRequestData,
  UsersSortingProperty,
} from "../../redux/user-tabs/user-tabs.types";
import { fetchUserTabsStartAsync } from "../../redux/user-tabs/user-tabs.actions";

import InfiniteScroll from "react-infinite-scroller";

// @ts-ignore

interface GameInfoPageProps {
  // using intl obj to insert translation into the tab title attribute
  intl: any;
  // redux props
  isLevelTabsFetching: any;
  levelTabs: any;
  userTabs: any;
  fetchLevelTabsStartAsync: (data: FetchLevelsRequestData) => void;
  fetchUserTabsStartAsync: (data: FetchUsersRequestData) => void;
}

const GameInfoPage: React.FC<GameInfoPageProps> = ({
  intl,
  isLevelTabsFetching,
  levelTabs,
  userTabs,
  fetchLevelTabsStartAsync,
  fetchUserTabsStartAsync,
}) => {
  // translation vars
  const translationPrefix: string = "gameInfoPage";
  const gameNameTitleId: string = translationPrefix + ".gameNameTitle";
  const playersTabId: string = translationPrefix + ".playersTab";
  const levelsTabId: string = translationPrefix + ".levelsTab";
  // other
  const { gameCode } = useParams();

  useEffect(() => {
    fetchLevelTabsStartAsync({
      userCode: null,
      gameCode,
      sortedBy: LevelsSortingProperty.BY_USERS_COUNT,
      descending: true,
      offset: 0,
      limit: 5,
    });
    fetchUserTabsStartAsync({
      levelCode: null,
      gameCode,
      sortedBy: UsersSortingProperty.BY_LEVELS_COUNT,
      descending: true,
      offset: 0,
      limit: 10000,
    });
  }, [gameCode]);

  const [page, setPage] = useState<number>(1);

  const nextPage = () => {
    fetchLevelTabsStartAsync({
      userCode: null,
      gameCode,
      sortedBy: LevelsSortingProperty.BY_USERS_COUNT,
      descending: true,
      offset: page * 5,
      limit: 5,
    });
    setPage((prevState) => prevState++);
  };

  const scrollParentRef = useRef<HTMLElement>(null);

  return (
    <div className="game-info-page u-container">
      <h1>
        {translate(gameNameTitleId)} {gameCode}
      </h1>

      <Tabs defaultActiveKey="players" id="tabs">
        <Tab
          eventKey="players"
          title={intl.formatMessage({ id: playersTabId })}
        >
          <div className="game-info-page__played-game-players">
            <AppTabHeader
              type={AppTabType.USER}
              fields={HEADER_TABS_STATE[AppTabType.USER]}
              refersTo={{ gameCode }}
            />
            {userTabs && <AppTabsList tabs={userTabs} />}
          </div>
        </Tab>
        <Tab eventKey="levels" title={intl.formatMessage({ id: levelsTabId })}>
          <AppTabHeader
            type={AppTabType.LEVEL}
            fields={HEADER_TABS_STATE[AppTabType.LEVEL]}
            refersTo={{ gameCode }}
          />
          {levelTabs && (
            <InfiniteScroll
              loadMore={() => {
                nextPage();
              }}
              hasMore={true}
              loader={<p>loading...</p>}
              // @ts-ignore
              getScrollParent={() => scrollParentRef}
            >
              <AppTabsList tabs={levelTabs} />
            </InfiniteScroll>
          )}
          {/*<div className="game-info-page__levels" ref={scrollParentRef}>*/}
          {/*  <SortersList*/}
          {/*    state={{ array: levels, stateSetter: setLevels }}*/}
          {/*    items={levelsSorters}*/}
          {/*    className="u-mt-sm u-mb-sm"*/}
          {/*  />*/}
          {/*  <FiltersList*/}
          {/*    array={levels}*/}
          {/*    stateSetter={setLevels}*/}
          {/*    items={levelsFilters}*/}
          {/*    className="u-mb-sm"*/}
          {/*  />*/}
          {/*  <InfiniteScroll*/}
          {/*    pageStart={0}*/}
          {/*    loadMore={() => {*/}
          {/*      nextPage();*/}
          {/*    }}*/}
          {/*    hasMore={true}*/}
          {/*    loader={<p>loading...</p>}*/}
          {/*    getScrollParent={() => scrollParentRef}*/}
          {/*  >*/}
          {/*    <AppTabsList tabs={currentLevels} />*/}
          {/*  </InfiniteScroll>*/}
          {/*</div>*/}
        </Tab>
      </Tabs>
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
  isLevelTabsFetching: selectIsLevelTabsFetching,
  levelTabs: selectLevelTabsList,
  userTabs: selectUserTabsList,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(GameInfoPage));
