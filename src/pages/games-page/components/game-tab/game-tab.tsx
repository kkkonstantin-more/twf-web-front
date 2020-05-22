import React from "react";
import { Link } from "react-router-dom";
import translate from "../../../../translations/translate";

import "./game-tab.scss";

export interface GameTabProps {
  name: string;
  code: string;
  levelsCount: number;
  playersCount: number;
}

const GameTab: React.FC<GameTabProps> = ({
  name,
  code,
  levelsCount,
  playersCount,
}) => {
  // translation vars
  const translationPrefix: string = "gameTab";
  const gameCodeId: string = translationPrefix + ".gameCode";
  const levelsCountId: string = translationPrefix + ".levelsCount";
  const playersCountId: string = translationPrefix + ".playersCount";
  // other
  const gameInfoPageUrl: string = `/game-info/${name}`;

  return (
    <Link to={gameInfoPageUrl} target="_blank" className="game-tab">
      <div className="game-tab__name">{name}</div>
      <div className="game-tab__code">
        <b>{translate(gameCodeId)}: </b>
        {code}
      </div>
      <div className="game-tab__players-count">
        <b>{translate(playersCountId)}: </b>
        {playersCount}
      </div>
      <div className="game-tab__levels-count">
        <b>{translate(levelsCountId)}: </b>
        {levelsCount}
      </div>
    </Link>
  );
};

export default GameTab;
