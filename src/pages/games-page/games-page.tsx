import React from "react";
import translate from "../../translations/translate";

import GameTabsList from "./components/game-tabs-list/game-tabs-list";

import "./games-page.scss";

const GamesPage: React.FC = () => {
  // translation vars
  const translationPrefix: string = "gamesPage";
  const titleId: string = translationPrefix + ".title";

  return (
    <div className="games-page u-container">
      <h1>{translate(titleId)}</h1>
      <GameTabsList />
    </div>
  );
};

export default GamesPage;
