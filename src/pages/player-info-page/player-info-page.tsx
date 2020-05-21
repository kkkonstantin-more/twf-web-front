import React from "react";
import { useParams } from "react-router-dom";

import "./player-info-page.scss";

const PlayerInfoPage: React.FC = () => {
  const { id } = useParams();
  return (
    <div className="player-info-page u-container">
      <h1>Игрок с id: {id}</h1>
    </div>
  );
};

export default PlayerInfoPage;
