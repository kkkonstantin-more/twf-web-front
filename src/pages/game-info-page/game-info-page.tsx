import React from "react";
import { useParams } from "react-router-dom";

import "./game-info-page.scss";
import translate from "../../translations/translate";

import PlayedGameUsersList from "./components/played-game-users-list/played-game-users-list";

const GameInfoPage: React.FC = () => {
  // translation vars
  const translationPrefix: string = "gameInfoPage";
  const gameNameTitleId: string = translationPrefix + ".gameNameTitle";
  // other
  const { id } = useParams();
  // DEMO PlayedGameUserTab GENERATION

  return (
    <div className="game-info-page u-container">
      <h1>
        {translate(gameNameTitleId)} {id}
      </h1>
      <PlayedGameUsersList />
    </div>
  );
};

export default GameInfoPage;
