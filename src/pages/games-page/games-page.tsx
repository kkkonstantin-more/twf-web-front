import React, { useEffect, useState } from "react";
import translate from "../../translations/translate";

import AppTabsList from "../../copmonents/app-tabs-list/app-tabs-list";
import AppTabHeader, {
  AppTabHeaderProps,
} from "../../copmonents/app-tab-header/app-tab-header";

import { AppTabProps } from "../../copmonents/app-tab/app-tab";

import fetchFilterSortGamesAndUpdateState from "../../utils/fetching-data/fetchFilterSortGamesAndUpdateState";

import gamesPageAppTabHeaderFieldsWithSorters from "../../data/app-tab-headers/games-page-app-tab-header-fields-with-sorters";

import "./games-page.scss";

const GamesPage: React.FC = () => {
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
    </div>
  );
};

export default GamesPage;
