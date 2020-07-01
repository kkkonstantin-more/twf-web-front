import React, { useEffect } from "react";
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
  selectIsLevelTabsFetching,
  selectLevelTabsList,
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

interface PlayerInfoPageProps {
  intl: any;
  // redux props
  fetchLevelTabsStartAsync: (data: FetchLevelsRequestData) => void;
  fetchGameTabsStartAsync: (data: FetchGamesRequestData) => void;
  isLevelTabsFetching: boolean;
  isGameTabsFetching: boolean;
  levelTabs: AppTabProps[];
  gameTabs: AppTabProps[];
}

const PlayerInfoPage: React.FC<PlayerInfoPageProps> = ({
  fetchLevelTabsStartAsync,
  fetchGameTabsStartAsync,
  isLevelTabsFetching,
  isGameTabsFetching,
  levelTabs,
  gameTabs,
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
      sortedBy: LevelsSortingProperty.BY_DIFFICULTY,
      descending: true,
      offset: 0,
      limit: 10000,
    });
  }, [playerCode]);
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
            {gameTabs && <AppTabsList tabs={gameTabs} />}
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
          {levelTabs && <AppTabsList tabs={levelTabs} />}
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
  levelTabs: selectLevelTabsList,
  isGameTabsFetching: selectIsGameTabsFetching,
  gameTabs: selectGameTabsList,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(PlayerInfoPage));
