import React, { useEffect } from "react";
import translate from "../../translations/translate";
// redux
import { connect, MapDispatchToProps } from "react-redux";
import { fetchGameTabsStartAsync } from "../../redux/game-tabs/game-tabs.actions";
import { createStructuredSelector } from "reselect";
import {
  selectGameTabsError,
  selectGameTabsList,
} from "../../redux/game-tabs/game-tabs.selectors";
// components
import AppTabHeader from "../../copmonents/app-tab-header/app-tab-header";
import AppTabsList from "../../copmonents/app-tabs-list/app-tabs-list";
import AppSpinner from "../../copmonents/app-spinner/app-spinner";
// types
import { AppTabProps } from "../../copmonents/app-tab/app-tab";
import { AppTabType } from "../../types/app-tabs/AppTab";
import {
  FetchGamesRequestData,
  GamesSortingProperty,
} from "../../redux/game-tabs/game-tabs.types";
// data
import HEADER_TABS_STATE from "../../redux/header-tabs/header-tabs.state";
// styles
import "./games-page.scss";
import FetchErrorMessage from "../../copmonents/fetch-error-message/fetch-error-message";

export interface GamesPageProps {
  // redux props
  fetchGameTabsStartAsync: (data: FetchGamesRequestData) => void;
  gameTabs: AppTabProps[] | null;
  gameTabsError: any;
}

const GamesPage: React.FC<GamesPageProps> = ({
  // redux props
  fetchGameTabsStartAsync,
  gameTabs,
  gameTabsError,
}) => {
  // translation vars
  const translationPrefix: string = "gamesPage";
  const titleId: string = translationPrefix + ".title";

  useEffect(() => {
    fetchGameTabsStartAsync({
      gameCode: null,
      userCode: null,
      sortedBy: GamesSortingProperty.BY_USERS_COUNT,
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
      {gameTabs ? (
        <AppTabsList tabs={gameTabs} />
      ) : gameTabsError ? (
        <FetchErrorMessage serverError={gameTabsError} />
      ) : (
        <AppSpinner loading={true} />
      )}
    </div>
  );
};

const mapDispatchToProps: MapDispatchToProps<any, any> = (dispatch: any) => ({
  fetchGameTabsStartAsync: (data: FetchGamesRequestData) =>
    dispatch(fetchGameTabsStartAsync(data)),
});

const mapStateToProps = createStructuredSelector<any, any>({
  gameTabs: selectGameTabsList,
  gameTabsError: selectGameTabsError,
});

export default connect(mapStateToProps, mapDispatchToProps)(GamesPage);
