import React, { useEffect } from "react";
import translate from "../../translations/translate";

import { connect, MapDispatchToProps } from "react-redux";
import { createStructuredSelector } from "reselect";
import { fetchGameTabsStartAsync } from "../../redux/game-tabs/game-tabs.actions";
import {
  selectGameTabsList,
  selectIsGameTabsFetching,
} from "../../redux/game-tabs/game-tabs.selectors";

import AppTabsList from "../../copmonents/app-tabs-list/app-tabs-list";

import { AppTabProps } from "../../copmonents/app-tab/app-tab";

import { AppTabType } from "../../types/app-tabs/AppTab";
import Filter from "../../copmonents/filter/filter";
import { GameAppTabFieldName } from "../../types/app-tabs/GameAppTab";

import "./games-page.scss";
import {
  FetchGamesRequestData,
  GamesSortingProperty,
} from "../../redux/game-tabs/game-tabs.types";
import Sorter from "../../copmonents/sorter/sorter";
import AppTabHeader from "../../copmonents/app-tab-header/app-tab-header";
import HEADER_TABS_STATE from "../../redux/header-tabs/header-tabs.state";

export interface GamesPageProps {
  // redux props
  fetchGameTabsStartAsync?: any;
  isGameTabsFetching?: boolean;
  gameTabs?: AppTabProps[] | null;
}

const GamesPage: React.FC<GamesPageProps> = ({
  fetchGameTabsStartAsync,
  isGameTabsFetching,
  gameTabs,
}) => {
  // translation vars
  const translationPrefix: string = "gamesPage";
  const titleId: string = translationPrefix + ".title";

  useEffect(() => {
    fetchGameTabsStartAsync({
      gameCode: null,
      userCode: null,
      sortedBy: GamesSortingProperty.BY_LEVELS_COUNT,
      descending: true,
      offset: 0,
      limit: 10000,
    });
  }, []);

  return (
    <div className="games-page u-container">
      <h1 className="u-mb-sm">{translate(titleId)}</h1>
      <AppTabHeader
        type={AppTabType.GAME}
        fields={HEADER_TABS_STATE[AppTabType.GAME]}
      />
      {gameTabs && <AppTabsList tabs={gameTabs} />}
    </div>
  );
};

const mapDispatchToProps: MapDispatchToProps<any, any> = (dispatch: any) => ({
  fetchGameTabsStartAsync: (data: FetchGamesRequestData) =>
    dispatch(fetchGameTabsStartAsync(data)),
});

const mapStateToProps = createStructuredSelector<any, any>({
  isGameTabsFetching: selectIsGameTabsFetching,
  gameTabs: selectGameTabsList,
});

export default connect(mapStateToProps, mapDispatchToProps)(GamesPage);
