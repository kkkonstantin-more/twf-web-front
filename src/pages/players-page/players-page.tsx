import React from "react";
import translate from "../../translations/translate";

import PlayersTabsList from "./components/player-tabs-list/player-tabs-list";

import "./players-page.scss";

const PlayersPage: React.FC = () => {
  // translation vars
  const translationPrefix: string = "playersPage";
  const titleId: string = translationPrefix + ".title";

  return (
    <div className="players-page u-container">
      <h1>{translate(titleId)}</h1>
      <PlayersTabsList />
    </div>
  );
};

export default PlayersPage;
