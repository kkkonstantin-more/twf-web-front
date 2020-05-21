import React from "react";
import { Link } from "react-router-dom";
import translate from "../../../../translations/translate";

import "./game-tab.scss";

export interface GameTabProps {
  name: string;
  code: string;
  authorName: string;
  authorPhotoUrl: string;
  levelsCount: number;
  playersCount: number;
}

const GameTab: React.FC<GameTabProps> = ({
  name,
  code,
  levelsCount,
  playersCount,
  authorName,
  authorPhotoUrl,
}) => {
  // translation vars
  const translationPrefix: string = "gameTab";
  const authorId: string = translationPrefix + ".author";
  const gameCodeId: string = translationPrefix + ".gameCode";
  const levelsCountId: string = translationPrefix + ".levelsCount";
  const playersCountId: string = translationPrefix + ".playersCount";
  // other
  const userInfoPageUrl: string = `/player-info/${authorName}`;
  const gameInfoPageUrl: string = `/game-info/${name}`;

  return (
    <div className="game-tab">
      <div className="game-tab__author-info">
        <Link
          to={userInfoPageUrl}
          target="_blank"
          className="game-tab__author-info__avatar"
          style={{ backgroundImage: `url(${authorPhotoUrl})` }}
        />
        <Link
          to={userInfoPageUrl}
          target="_blank"
          className="game-tab__author-info__name"
        >
          <b>{translate(authorId)}: </b>
          {authorName}
        </Link>
      </div>
      <div className="game-tab__game-ids">
        <Link
          to={gameInfoPageUrl}
          target="_blank"
          className="game-tab__game-ids__name"
        >
          {name}
        </Link>
        <Link
          to={gameInfoPageUrl}
          target="_blank"
          className="game-tab__game-ids__code"
        >
          <b>{translate(gameCodeId)}: </b>
          {code}
        </Link>
      </div>
      <div className="game-tab__players-count">
        <b>{translate(playersCountId)}: </b>
        {playersCount}
      </div>
      <div className="game-tab__levels-count">
        <b>{translate(levelsCountId)}: </b>
        {levelsCount}
      </div>
    </div>
  );
};

export default GameTab;
