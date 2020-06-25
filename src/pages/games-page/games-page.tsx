import React, { useEffect, useState } from "react";
import translate from "../../translations/translate";

import { connect, MapDispatchToProps } from "react-redux";

import AppTabsList from "../../copmonents/app-tabs-list/app-tabs-list";
import AppTabHeader from "../../copmonents/app-tab-header/app-tab-header";

import { AppTabProps } from "../../copmonents/app-tab/app-tab";

import fetchFilterSortGamesAndUpdateState from "../../utils/fetching-data/fetchFilterSortGamesAndUpdateState";

import gamesPageAppTabHeaderFieldsWithSorters from "../../data/app-tab-headers/games-page-app-tab-header-fields-with-sorters";

import "./games-page.scss";
import { toggleFieldHidden } from "../../redux/hidden-fields/hidden-fields.actions";
import { AppTabType } from "../../types/app-tabs/AppTab";
import Filter from "../../copmonents/filter/filter";
import { GameAppTabFieldName } from "../../types/app-tabs/GameAppTab";

const GamesPage: React.FC<{ hiddenFields?: any; toggleFieldHidden?: any }> = ({
  hiddenFields,
  toggleFieldHidden,
}) => {
  // translation vars
  const translationPrefix: string = "gamesPage";
  const titleId: string = translationPrefix + ".title";
  // other
  const [gameTabs, setGameTabs] = useState<AppTabProps[]>([]);

  useEffect(() => {
    fetchFilterSortGamesAndUpdateState(setGameTabs);
  }, []);

  return (
    <div className="games-page u-container">
      <h1 className="u-mb-sm">{translate(titleId)}</h1>
      <AppTabHeader
        fieldsWithSorters={gamesPageAppTabHeaderFieldsWithSorters(setGameTabs)}
      />
      <AppTabsList tabs={gameTabs} />
      <Filter
        tabType={AppTabType.GAME}
        fieldName={GameAppTabFieldName.gameCode}
      />
    </div>
  );
};

const mapDispatchToProps: MapDispatchToProps<any, any> = (dispatch: any) => ({
  toggleFieldHidden: (tabTypeAndFieldName: any) =>
    dispatch(toggleFieldHidden(tabTypeAndFieldName)),
});

// const mapStateToProps = (state: RootState) => ({
//   hiddenFields: selectHiddenFieldsOfTab(state, AppTab.GAME),
// });

export default connect(null, mapDispatchToProps)(GamesPage);
