import React from "react";
import { useLocation, useParams, Route } from "react-router-dom";

import "./create-game-page.scss";
import TaskSetConstructor from "../../constructors/task-set-constructor/task-set-constructor";

const CreateGamePage: React.FC = () => {
  const { gameCode } = useParams();

  return (
    <div>
      <TaskSetConstructor taskSetToEditCode={gameCode} />
    </div>
  );
};

export default CreateGamePage;
