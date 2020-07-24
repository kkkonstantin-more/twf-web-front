import React, { useState } from "react";

import JSONEditorComponent from "../../copmonents/json-editor/json-editor";
import CodeMirror from "../../copmonents/editors/code-mirror/code-mirror";
import games from "./games";
import JSONEditorForm from "../../copmonents/json-editor-form/json-editor-form";
import MathQuill from "../../copmonents/math-quill/math-quill";

import "./create-game-page.scss";

const CreateGamePage = () => {
  const [game, setGame] = useState<object>(games[0]);

  return (
    <div className="create-game-page">
      {/*<MathQuill />*/}
      <JSONEditorForm />
      {/*<CodeMirror initialJSON={game} />*/}
      {/*<JSONEditorComponent initialJSON={game} />*/}
      {/*<ul>*/}
      {/*  {games.map((game: any, i: number) => {*/}
      {/*    return (*/}
      {/*      <li key={i} onClick={() => setGame(game)}>*/}
      {/*        {game.name}*/}
      {/*      </li>*/}
      {/*    );*/}
      {/*  })}*/}
      {/*</ul>*/}
    </div>
  );
};

export default CreateGamePage;
