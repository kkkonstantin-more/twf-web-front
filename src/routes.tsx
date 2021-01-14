import React from "react";
import { Route, Switch } from "react-router-dom";
// pages
import HomePage from "./pages/home-page/home-page";
import GamesPage from "./pages/games-page/games-page";
import GameInfoPage from "./pages/game-info-page/game-info-page";
import PlayerInfoPage from "./pages/player-info-page/player-info-page";
import UsersPage from "./pages/users-page/users-page";
import LevelInfoPage from "./pages/level-info-page/level-info-page";
import ConstructorMenuPageComponent from "./pages/constructor-menu-page/constructor-menu-page.component";
import SolveMathPage from "./pages/solve-math-page/solve-math-page";
import ConstructorPage from "./pages/constructor-page/constructor-page.component";

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route exact path={"/"} component={HomePage} />
      <Route exact path={"/matify-games"} component={GamesPage} />
      <Route exact path={"/matify-games/:gameCode"} component={GameInfoPage} />
      <Route
        exact
        path={"/matify-players/:playerCode"}
        component={PlayerInfoPage}
      />
      <Route exact path={"/matify-players"} component={UsersPage} />
      <Route
        exact
        path={"/matify-levels/:levelCode"}
        component={LevelInfoPage}
      />
      <Route
        exact
        path={"/constructor-menu/:activeTab?"}
        component={ConstructorMenuPageComponent}
      />
      <Route
        exact
        path={"/solve-math/:taskSetCode"}
        component={SolveMathPage}
      />
      <Route path={"/constructor"} component={ConstructorPage} />
    </Switch>
  );
};

export default Routes;
