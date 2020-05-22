import React from "react";

import GameTab, { GameTabProps } from "../game-tab/game-tab";

import "./game-tabs-list.scss";

const GameTabsList: React.FC<{ gameTabs: GameTabProps[] }> = ({ gameTabs }) => {
  return (
    <div className="game-tabs-list">
      {gameTabs.map((tab: GameTabProps, i: number) => {
        return <GameTab key={i} {...tab} />;
      })}
    </div>
  );
};

export default GameTabsList;
