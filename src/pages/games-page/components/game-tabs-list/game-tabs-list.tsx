import React, { useState } from "react";

import GameTab, { GameTabProps } from "../game-tab/game-tab";

import "./game-tabs-list.scss";

import demoGameTabsData from "./demo-game-tabs-data";
import { sortArrayOfObjectsByProperty } from "../../../../utils";

const GameTabsList: React.FC = () => {
  const [games, setGames] = useState(demoGameTabsData);

  return (
    <div className="game-tabs-list">
      <div className="game-tabs-list__actions">
        <button
          onClick={() =>
            setGames([...sortArrayOfObjectsByProperty(games, "name", false)])
          }
        >
          Сортировать по имени
        </button>
        <button
          onClick={() =>
            setGames([...sortArrayOfObjectsByProperty(games, "playersCount")])
          }
        >
          Сортировать по количеству игроков
        </button>
        <button
          onClick={() =>
            setGames([...sortArrayOfObjectsByProperty(games, "levelsCount")])
          }
        >
          Сортировать по количеству уровней
        </button>
      </div>
      <div className="game-tabs-list__list">
        {games.map((tab: GameTabProps, i: number) => {
          return <GameTab key={i} {...tab} />;
        })}
      </div>
    </div>
  );
};

export default GameTabsList;
