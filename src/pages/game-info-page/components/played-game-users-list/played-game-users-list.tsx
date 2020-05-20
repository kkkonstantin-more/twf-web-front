import React, { useState } from "react";

import "./played-game-users-list.scss";
import PlayedGameUserTab, {
  PlayedGameUserTabProps,
} from "../played-game-user-tab/played-game-user-tab";
import { demoPlayedGameUsersData } from "./demoUsersData";
import translate from "../../../../translations/translate";

const PlayedGameUsersList: React.FC = () => {
  // translation vars
  const translationPrefix: string = "playedGameUsersList";
  const titleId: string = translationPrefix + ".title";
  const nameRowId: string = translationPrefix + ".nameRow";
  const levelsCompletedRowId: string =
    translationPrefix + ".levelsCompletedRow";
  const sortByNameButtonTextId: string =
    translationPrefix + ".sortByNameButtonText";
  const sortByLevelsCompletedButtonTextId: string =
    translationPrefix + ".sortByLevelsCompletedButtonText";

  const [users, setUsers] = useState<PlayedGameUserTabProps[]>(
    demoPlayedGameUsersData
  );

  const sortByCompletedLevels = (
    data: PlayedGameUserTabProps[]
  ): PlayedGameUserTabProps[] => {
    return [
      ...data.sort((a, b) => (a.levelsCompleted > b.levelsCompleted ? -1 : 1)),
    ];
  };

  const sortByName = (
    data: PlayedGameUserTabProps[]
  ): PlayedGameUserTabProps[] => {
    return [...data.sort((a, b) => (a.fullName > b.fullName ? 1 : -1))];
  };

  return (
    <div className="played-game-users-list">
      <h1>{translate(titleId)}</h1>
      <div className="played-game-users-list__actions">
        <button
          className="btn btn-outline-dark"
          onClick={() => setUsers(sortByName(users))}
        >
          {translate(sortByNameButtonTextId)}
        </button>
        <button
          className="btn btn-outline-dark"
          onClick={() => setUsers(sortByCompletedLevels(users))}
        >
          {translate(sortByLevelsCompletedButtonTextId)}
        </button>
      </div>
      <div className="played-game-users-list__list">
        <div className="played-game-users-list__rows">
          <p>{translate(nameRowId)}</p>
          <p>{translate(levelsCompletedRowId)}</p>
        </div>
        {users.map((data: PlayedGameUserTabProps) => {
          const { fullName, levelsCompleted } = data;
          return (
            <PlayedGameUserTab
              key={fullName}
              fullName={fullName}
              levelsCompleted={levelsCompleted}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PlayedGameUsersList;
