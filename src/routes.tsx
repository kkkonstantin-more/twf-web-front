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
import NamespaceConstructorComponent from "./constructors/namespace-constructor/namespace-constructor.component";
import RulePackConstructorComponent from "./constructors/rule-pack-constructor/rule-pack-constructor.component";
import TaskSetConstructor from "./constructors/task-set-constructor/task-set-constructor.component";

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
        path={"/task-set-constructor/:code?"}
        component={TaskSetConstructor}
      />
      <Route
        exact
        path={"/constructor-menu/:activeTab?"}
        component={ConstructorMenuPageComponent}
      />
      <Route exact path={"/solve-math"} component={SolveMathPage} />
      <Route
        exact
        path="/namespace-constructor/:code?"
        component={NamespaceConstructorComponent}
      />
      <Route
        exact
        path="/rule-pack-constructor/:code?"
        component={RulePackConstructorComponent}
      />
    </Switch>
  );
};

export default Routes;
