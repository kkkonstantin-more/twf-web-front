import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import translate from "../../translations/translate";
// @ts-ignore

import AppTabsList from "../../copmonents/app-tabs-list/app-tabs-list";

import { AppTabProps } from "../../copmonents/app-tab/app-tab";

import "./game-info-page.scss";
import { connect, MapDispatchToProps } from "react-redux";
import { FetchGamesRequestData } from "../../redux/game-tabs/game-tabs.types";
import { fetchGameTabsStartAsync } from "../../redux/game-tabs/game-tabs.actions";
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

import { Tabs, Tab } from "react-bootstrap";
import { injectIntl } from "react-intl";
import { AppTabType } from "../../types/app-tabs/AppTab";
import HEADER_TABS_STATE from "../../redux/header-tabs/header-tabs.state";
import AppTabHeader from "../../copmonents/app-tab-header/app-tab-header";

interface GameInfoPageProps {
  // using intl obj to insert translation into the tab title attribute
  intl: any;
  // redux props
  isLevelTabsFetching: any;
  levelTabs: any;
  fetchLevelTabsStartAsync: any;
}

const GameInfoPage: React.FC<GameInfoPageProps> = ({
  intl,
  isLevelTabsFetching,
  levelTabs,
  fetchLevelTabsStartAsync,
}) => {
  // translation vars
  const translationPrefix: string = "gameInfoPage";
  const gameNameTitleId: string = translationPrefix + ".gameNameTitle";
  const playersTabId: string = translationPrefix + ".playersTab";
  const levelsTabId: string = translationPrefix + ".levelsTab";
  // other
  const { gameCode } = useParams();
  const [players, setPlayers] = useState<AppTabProps[]>([]);
  const [levels, setLevels] = useState<AppTabProps[]>([]);

  const [currentLevels, setCurrentLevels] = useState<AppTabProps[]>([]);

  useEffect(() => {
    fetchLevelTabsStartAsync({
      userCode: null,
      gameCode,
      sortedBy: LevelsSortingProperty.BY_USERS_COUNT,
      descending: true,
      offset: 0,
      limit: 10000,
    });
  }, [gameCode]);

  const nextPage = () => {
    const items: number = currentLevels.length + 5;
    if (items < levels.length) {
      setTimeout(() => {
        setCurrentLevels(levels.slice(0, items));
      }, 1000);
    }
  };

  const scrollParentRef: React.RefObject<any> = React.createRef();

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
            users
            {/*<AppTabsList tabs={players} />*/}
          </div>
        </Tab>
        <Tab eventKey="levels" title={intl.formatMessage({ id: levelsTabId })}>
          <AppTabHeader
            type={AppTabType.LEVEL}
            fields={HEADER_TABS_STATE[AppTabType.LEVEL]}
          />
          {levelTabs && <AppTabsList tabs={levelTabs} />}
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
});

const mapStateToProps = createStructuredSelector<any, any>({
  isLevelTabsFetching: selectIsLevelTabsFetching,
  levelTabs: selectLevelTabsList,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(GameInfoPage));

// export default injectIntl(GameInfoPage);
