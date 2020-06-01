import React, { useEffect, useState } from "react";
import translate from "../../translations/translate";

import SortersList, {
  SortersListItemInterface,
} from "../../copmonents/sorters-list/sorters-list";

import AppTabsList from "../../copmonents/app-tabs-list/app-tabs-list";

import fetchUsers, { FetchedUser } from "../../fetch-requests/fetch-users";
import { AppTabProps } from "../../copmonents/app-tab/app-tab";
import FiltersList, {
  FiltersListItemProps,
} from "../../copmonents/filters-list/filters-list";

import "./players-page.scss";

const PlayersPage: React.FC = () => {
  // translation vars
  const translationPrefix: string = "playersPage";
  const titleId: string = translationPrefix + ".title";
  // other
  const [players, setPlayers] = useState<AppTabProps[]>([]);
  const playersSorters: SortersListItemInterface[] = [
    {
      textId: "login",
      propertyName: "login",
      initialDescending: true,
    },
    {
      textId: "code",
      propertyName: "code",
      initialDescending: true,
    },
    {
      textId: "name",
      propertyName: "name",
      initialDescending: true,
    },
    {
      textId: "fullName",
      propertyName: "fullName",
      initialDescending: true,
    },
    {
      textId: "completedLevelsCount",
      propertyName: "completedLevelsCount",
      initialDescending: false,
    },
  ];
  const playerFilters: FiltersListItemProps[] = [
    {
      propertyName: "code",
      translationTextId: "code",
    },
    {
      propertyName: "name",
      translationTextId: "name",
    },
    {
      propertyName: "fullName",
      translationTextId: "fullName",
    },
    {
      propertyName: "completedLevelsCount",
      translationTextId: "completedLevelsCount",
    },
    {
      propertyName: "additionalInfo",
      translationTextId: "additionalInfo",
    },
  ];

  useEffect(() => {
    const createTabsWithFetchedUsers = async () => {
      const users: FetchedUser[] = await fetchUsers();
      const usersForAppTabs: AppTabProps[] = [];
      const translationPrefix: string = "appTab.";
      users.forEach((user: FetchedUser) => {
        usersForAppTabs.push({
          link: {
            value: "/player-info/" + user.code,
          },
          login: {
            value: user.login,
          },
          code: {
            value: user.code,
            prefixTranslationId: translationPrefix + "code",
          },
          name: {
            value: user.name,
            prefixTranslationId: translationPrefix + "name",
          },
          fullName: {
            value: user.fullName,
            prefixTranslationId: translationPrefix + "fullName",
          },
          completedLevelsCount: {
            value: user.completedLevels.length.toString(),
            prefixTranslationId: translationPrefix + "levelsCompleted",
          },
          additionalInfo: {
            value: user.additionalInfo,
            prefixTranslationId: translationPrefix + "additionalInfo",
          },
        });
      });
      setPlayers(usersForAppTabs);
    };
    createTabsWithFetchedUsers();
  }, []);

  return (
    <div className="players-page u-container">
      <h1>{translate(titleId)}</h1>
      <SortersList
        state={{ array: players, stateSetter: setPlayers }}
        items={playersSorters}
        className="u-mt-sm u-mb-sm"
      />
      <FiltersList
        array={players}
        stateSetter={setPlayers}
        items={playerFilters}
        className="u-mb-sm"
      />
      <AppTabsList tabs={players} />
    </div>
  );
};

export default PlayersPage;
