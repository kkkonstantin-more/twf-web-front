import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./player-info-page.scss";
import translate from "../../translations/translate";
import SortersList, {
  SortersListItemInterface,
} from "../../copmonents/sorters-list/sorters-list";

import fetchLevels, { FetchedLevel } from "../../fetch-requests/fetch-levels";
import { AppTabProps } from "../../copmonents/app-tab/app-tab";
import AppTabsList from "../../copmonents/app-tabs-list/app-tabs-list";
import FiltersList, {
  FiltersListItemProps,
} from "../../copmonents/filters-list/filters-list";

const PlayerInfoPage: React.FC = () => {
  // translation vars
  // const translationPrefix: string = "playerInfoPage";
  // const titleId: string = translationPrefix + ".title";
  // const completedLevelsId: string = translationPrefix + ".completedLevels";
  // // other
  // const [levels, setLevels] = useState<AppTabProps[]>([]);
  // const { playerCode } = useParams();
  // const levelsSorters: SortersListItemInterface[] = [
  //   {
  //     textId: "name",
  //     propertyName: "name",
  //     initialDescending: true,
  //   },
  //   {
  //     textId: "code",
  //     propertyName: "code",
  //     initialDescending: true,
  //   },
  //   {
  //     textId: "difficulty",
  //     propertyName: "difficulty",
  //     initialDescending: false,
  //   },
  //   {
  //     textId: "playersPlayedAmount",
  //     propertyName: "playersPlayedAmount",
  //     initialDescending: false,
  //   },
  //   {
  //     textId: "gameName",
  //     propertyName: "gameName",
  //     initialDescending: false,
  //   },
  // ];
  // const levelsFilters: FiltersListItemProps[] = [
  //   {
  //     propertyName: "code",
  //     translationTextId: "code",
  //   },
  //   {
  //     propertyName: "difficulty",
  //     translationTextId: "difficulty",
  //   },
  //   {
  //     propertyName: "playersPlayedAmount",
  //     translationTextId: "playersCount",
  //   },
  //   {
  //     propertyName: "gameName",
  //     translationTextId: "gameName",
  //   },
  // ];
  // useEffect(() => {
  //   const createTabsWithFetchedLevels = async () => {
  //     const levels: FetchedLevel[] = await fetchLevels();
  //     const levelsForAppTabs: AppTabProps[] = [];
  //     const translationPrefix: string = "appTab.";
  //     levels.forEach((level: FetchedLevel) => {
  //       if (level.players.find((player) => player === playerCode)) {
  //         levelsForAppTabs.push({
  //           link: {
  //             value: "/level-info/" + level.code,
  //           },
  //           name: {
  //             value: level.name,
  //           },
  //           code: {
  //             value: level.code,
  //             prefixTranslationId: translationPrefix + "code",
  //           },
  //           gameName: {
  //             value: level.gameName,
  //             prefixTranslationId: translationPrefix + "gameName",
  //           },
  //           difficulty: {
  //             value: level.difficulty.toString(),
  //             prefixTranslationId: translationPrefix + "difficulty",
  //           },
  //           playersPlayedAmount: {
  //             value: level.players.length.toString(),
  //             prefixTranslationId: translationPrefix + "playersPlayedAmount",
  //           },
  //         });
  //       }
  //     });
  //     setLevels(levelsForAppTabs);
  //   };
  //   createTabsWithFetchedLevels();
  // }, [playerCode]);
  return (
    <div className="player-info-page u-container">
      {/*<h1>*/}
      {/*  {translate(titleId)}: {playerCode}*/}
      {/*</h1>*/}
      {/*<h1>{translate(completedLevelsId)}</h1>*/}
      {/*<SortersList*/}
      {/*  state={{ array: levels, stateSetter: setLevels }}*/}
      {/*  items={levelsSorters}*/}
      {/*  className="u-mt-sm u-mb-sm"*/}
      {/*/>*/}
      {/*<FiltersList*/}
      {/*  array={levels}*/}
      {/*  stateSetter={setLevels}*/}
      {/*  items={levelsFilters}*/}
      {/*  className="u-mb-sm"*/}
      {/*/>*/}
      {/*<AppTabsList tabs={levels} />*/}
    </div>
  );
};

export default PlayerInfoPage;
