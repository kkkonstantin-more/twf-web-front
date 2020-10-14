// libs
import React from "react";
import {
  Route,
  Switch,
  useLocation,
  useRouteMatch,
  useParams,
} from "react-router-dom";
// constructors
import TaskSetConstructor from "../../constructors/task-set-constructor/task-set-constructor.component";
import NamespaceConstructor from "../../constructors/namespace-constructor/namespace-constructor.component";
import RulePackConstructor from "../../constructors/rule-pack-constructor/rule-pack-constructor.component";

const ConstructorPage = (): JSX.Element => {
  const { url } = useRouteMatch();

  return (
    <Switch>
      <Route
        exact
        path={`${url}/task-set/:code?`}
        render={() => <TaskSetConstructor />}
      />
      <Route
        exact
        path={`${url}/namespace/:code?`}
        render={() => <NamespaceConstructor />}
      />
      <Route
        exact
        path={`${url}/rule-pack/:code?`}
        render={() => <RulePackConstructor />}
      />
    </Switch>
  );
};

export default ConstructorPage;
