import React, { useEffect, useState } from "react";

// import "./level-info-page.scss";
// import { useParams } from "react-router-dom";
//
// import translate from "../../translations/translate";
// import SortersList, {
//   SortersListItemInterface,
// } from "../../copmonents/sorters-list/sorters-list";
// import FiltersList, {
//   FiltersListItemProps,
// } from "../../copmonents/filters-list/filters-list";
// import fetchUsers, { FetchedUser } from "../../fetch-requests/fetch-users";
// import { AppTabProps } from "../../copmonents/app-tab/app-tab";
// import AppTabsList from "../../copmonents/app-tabs-list/app-tabs-list";
//
const LevelInfoPage: React.FC = () => {
  //   // translation vars
  //   const translationPrefix: string = "levelInfoPage";
  //   const titleId: string = translationPrefix + ".title";
  //   const completedLevelPlayersId: string =
  //     translationPrefix + ".completedLevelPlayers";
  //   // other
  //   const { levelCode } = useParams();
  //   const [players, setPlayers] = useState<AppTabProps[]>([]);
  //   const playersSorters: SortersListItemInterface[] = [
  //     {
  //       textId: "login",
  //       propertyName: "login",
  //       initialDescending: true,
  //     },
  //     {
  //       textId: "code",
  //       propertyName: "code",
  //       initialDescending: true,
  //     },
  //     {
  //       textId: "name",
  //       propertyName: "name",
  //       initialDescending: true,
  //     },
  //     {
  //       textId: "fullName",
  //       propertyName: "fullName",
  //       initialDescending: true,
  //     },
  //     {
  //       textId: "completedLevelsCount",
  //       propertyName: "completedLevelsCount",
  //       initialDescending: false,
  //     },
  //   ];
  //   const playerFilters: FiltersListItemProps[] = [
  //     {
  //       propertyName: "code",
  //       translationTextId: "code",
  //     },
  //     {
  //       propertyName: "name",
  //       translationTextId: "name",
  //     },
  //     {
  //       propertyName: "fullName",
  //       translationTextId: "fullName",
  //     },
  //     {
  //       propertyName: "completedLevelsCount",
  //       translationTextId: "completedLevelsCount",
  //     },
  //     {
  //       propertyName: "additionalInfo",
  //       translationTextId: "additionalInfo",
  //     },
  //   ];
  //
  //   useEffect(() => {
  //     const createTabsWithFetchedUsers = async () => {
  //       const users: FetchedUser[] = await fetchUsers({ levelCode });
  //       const usersForAppTabs: AppTabProps[] = [];
  //       const translationPrefix: string = "appTab.";
  //       users.forEach((user: FetchedUser) => {
  //         usersForAppTabs.push({
  //           link: {
  //             value: "/player-info/" + user.code + "?login=" + user.login,
  //           },
  //           login: {
  //             value: user.login,
  //           },
  //           code: {
  //             value: user.code,
  //             prefixTranslationId: translationPrefix + "code",
  //           },
  //           name: {
  //             value: user.name,
  //             prefixTranslationId: translationPrefix + "name",
  //           },
  //           fullName: {
  //             value: user.fullName,
  //             prefixTranslationId: translationPrefix + "fullName",
  //           },
  //           completedLevelsCount: {
  //             value: user.completedLevels.length.toString(),
  //             prefixTranslationId: translationPrefix + "levelsCompleted",
  //           },
  //           additionalInfo: {
  //             value: user.additionalInfo,
  //             prefixTranslationId: translationPrefix + "additionalInfo",
  //           },
  //         });
  //       });
  //       setPlayers(usersForAppTabs);
  //     };
  //     createTabsWithFetchedUsers();
  //   }, [levelCode]);

  return (
    <div className="level-info-page u-container">
      {/*<h1>*/}
      {/*  {translate(titleId)}: {levelCode}*/}
      {/*</h1>*/}
      {/*<h1>{translate(completedLevelPlayersId)}</h1>*/}
      {/*<SortersList*/}
      {/*  state={{ array: players, stateSetter: setPlayers }}*/}
      {/*  items={playersSorters}*/}
      {/*  className="u-mt-sm u-mb-sm"*/}
      {/*/>*/}
      {/*<FiltersList*/}
      {/*  array={players}*/}
      {/*  stateSetter={setPlayers}*/}
      {/*  items={playerFilters}*/}
      {/*  className="u-mb-sm"*/}
      {/*/>*/}
      {/*<AppTabsList tabs={players} />*/}
    </div>
  );
};

export default LevelInfoPage;
