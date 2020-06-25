import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import translate from "../../translations/translate";
import { injectIntl } from "react-intl";

// @ts-ignore
import InfiniteScroll from "react-infinite-scroller";

import { Tabs, Tab } from "react-bootstrap";

import AppTabsList from "../../copmonents/app-tabs-list/app-tabs-list";
import FiltersList from "../../copmonents/filters-list/filters-list";
import SortersList from "../../copmonents/sorters-list/sorters-list";

import { AppTabProps } from "../../copmonents/app-tab/app-tab";
import { SortersListItemInterface } from "../../copmonents/sorters-list/sorters-list";
import { FiltersListItemProps } from "../../copmonents/filters-list/filters-list";
import { FetchedUser } from "../../fetch-requests/fetch-users";
import { FetchedLevel } from "../../fetch-requests/fetch-levels";

import fetchUsers from "../../fetch-requests/fetch-users";
import fetchLevels from "../../fetch-requests/fetch-levels";

import "./game-info-page.scss";

const GameInfoPage: React.FC<{ intl: any }> = ({ intl }) => {
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
  const levelsSorters: SortersListItemInterface[] = [
    {
      textId: "name",
      propertyName: "name",
      initialDescending: true,
    },
    {
      textId: "code",
      propertyName: "code",
      initialDescending: true,
    },
    {
      textId: "difficulty",
      propertyName: "difficulty",
      initialDescending: false,
    },
    {
      textId: "playersPlayedAmount",
      propertyName: "playersPlayedAmount",
      initialDescending: false,
    },
    {
      textId: "gameName",
      propertyName: "gameName",
      initialDescending: false,
    },
  ];
  const levelsFilters: FiltersListItemProps[] = [
    {
      propertyName: "code",
      translationTextId: "code",
    },
    {
      propertyName: "difficulty",
      translationTextId: "difficulty",
    },
    {
      propertyName: "playersPlayedAmount",
      translationTextId: "playersCount",
    },
    {
      propertyName: "gameName",
      translationTextId: "gameName",
    },
  ];

  useEffect(() => {
    // const createTabsWithFetchedUsers = async () => {
    //   const users: FetchedUser[] = await fetchUsers({ gameCode });
    //   const usersForAppTabs: AppTabProps[] = [];
    //   users.forEach((user: FetchedUser) => {
    //     usersForAppTabs.push({
    //       link: "/player-info/" + user.code,
    //       fields: [
    //         {
    //           name: "playerLogin",
    //           value: user.login,
    //         },
    //         {
    //           name: "playerCode",
    //           value: user.code,
    //         },
    //         {
    //           name: "playerName",
    //           value: user.name,
    //         },
    //         {
    //           name: "playerFullName",
    //           value: user.fullName,
    //         },
    //         {
    //           name: "completedLevelsCount",
    //           value: user.completedLevels.length,
    //         },
    //         {
    //           name: "additionalInfo",
    //           value: user.additionalInfo,
    //         },
    //       ],
    //     });
    //   });
    //   setPlayers(usersForAppTabs);
    // };
    // createTabsWithFetchedUsers();
  }, [gameCode]);

  useEffect(() => {
    // const createTabsWithFetchedLevels = async () => {
    //   const levels: FetchedLevel[] = await fetchLevels({ gameCode });
    //   const levelsForAppTabs: AppTabProps[] = [];
    //   levels.forEach((level: FetchedLevel) => {
    //     levelsForAppTabs.push({
    //       link: "/level-info/" + level.code,
    //       fields: [
    //         {
    //           name: "levelName",
    //           value: level.name,
    //         },
    //         {
    //           name: "levelCode",
    //           value: level.code,
    //         },
    //         {
    //           name: "gameName",
    //           value: level.gameName,
    //         },
    //         {
    //           name: "difficulty",
    //           value: level.difficulty,
    //         },
    //         {
    //           name: "playersPlayedCount",
    //           value: level.players.length,
    //         },
    //       ],
    //     });
    //   });
    //   setLevels(levelsForAppTabs);
    //   setCurrentLevels(levelsForAppTabs.slice(0, 5));
    // };
    // createTabsWithFetchedLevels();
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
      {/*<h1>*/}
      {/*  {translate(gameNameTitleId)} {gameCode}*/}
      {/*</h1>*/}
      {/*<Tabs defaultActiveKey="players" id="tabs">*/}
      {/*  <Tab*/}
      {/*    eventKey="players"*/}
      {/*    title={intl.formatMessage({ id: playersTabId })}*/}
      {/*  >*/}
      {/*    <div className="game-info-page__played-game-players">*/}
      {/*      <SortersList*/}
      {/*        state={{ array: players, stateSetter: setPlayers }}*/}
      {/*        items={playersSorters}*/}
      {/*        className="u-mt-sm u-mb-sm"*/}
      {/*      />*/}
      {/*      <FiltersList*/}
      {/*        array={players}*/}
      {/*        stateSetter={setPlayers}*/}
      {/*        items={playerFilters}*/}
      {/*        className="u-mb-sm"*/}
      {/*      />*/}
      {/*      <AppTabsList tabs={players} />*/}
      {/*    </div>*/}
      {/*  </Tab>*/}
      {/*  <Tab eventKey="levels" title={intl.formatMessage({ id: levelsTabId })}>*/}
      {/*    <div className="game-info-page__levels" ref={scrollParentRef}>*/}
      {/*      <SortersList*/}
      {/*        state={{ array: levels, stateSetter: setLevels }}*/}
      {/*        items={levelsSorters}*/}
      {/*        className="u-mt-sm u-mb-sm"*/}
      {/*      />*/}
      {/*      <FiltersList*/}
      {/*        array={levels}*/}
      {/*        stateSetter={setLevels}*/}
      {/*        items={levelsFilters}*/}
      {/*        className="u-mb-sm"*/}
      {/*      />*/}
      {/*      <InfiniteScroll*/}
      {/*        pageStart={0}*/}
      {/*        loadMore={() => {*/}
      {/*          nextPage();*/}
      {/*        }}*/}
      {/*        hasMore={true}*/}
      {/*        loader={<p>loading...</p>}*/}
      {/*        getScrollParent={() => scrollParentRef}*/}
      {/*      >*/}
      {/*        <AppTabsList tabs={currentLevels} />*/}
      {/*      </InfiniteScroll>*/}
      {/*    </div>*/}
      {/*  </Tab>*/}
      {/*</Tabs>*/}
    </div>
  );
};

export default injectIntl(GameInfoPage);
