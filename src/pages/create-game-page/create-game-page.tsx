import React from "react";
import { useLocation, useParams, Route } from "react-router-dom";

import "./create-game-page.scss";
import TaskSetConstructorComponent from "../../constructors/task-set-constructor/task-set-constructor.component";

const CreateGamePage: React.FC = () => {
  const { gameCode } = useParams();

  return (
    <div>
      <TaskSetConstructorComponent taskSetToEditCode={gameCode} />
    </div>
  );
};

export default CreateGamePage;
