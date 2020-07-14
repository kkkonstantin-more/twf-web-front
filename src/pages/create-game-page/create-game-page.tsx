import React, { useState } from "react";

import "./create-game-page.scss";
import JSONEditorComponent from "../../copmonents/json-editor/json-editor";
import games from "./games";

const CreateGamePage = () => {
  const [game, setGame] = useState<object>(games[0]);

  return (
    <div className="create-game-page">
      <JSONEditorComponent initialJSON={game} />
      <ul>
        {games.map((game: any) => {
          return <li onClick={() => setGame(game)}>{game.name}</li>;
        })}
      </ul>
    </div>
  );
};

export default CreateGamePage;
