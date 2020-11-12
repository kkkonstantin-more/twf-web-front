// libs
import React, { useState } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
// constructors
import TaskSetConstructor from "../../constructors/task-set-constructor/task-set-constructor.component";
import NamespaceConstructor from "../../constructors/namespace-constructor/namespace-constructor.component";
import RulePackConstructor from "../../constructors/rule-pack-constructor/rule-pack-constructor.component";
import CodeMirrorEditor from "../../components/code-mirror/code-mirror";
// types
import { ConstructorType, EditingMode } from "./constructor-page.types";
// styles
import "./constructor-page.styles.scss";

const ConstructorPage = (): JSX.Element => {
  const { url } = useRouteMatch();
  const [currentEditingMode, setCurrentEditingMode] = useState<EditingMode>(
    "textEditor"
  );

  const renderConstructor = (
    constructorType: ConstructorType,
    editingMode: EditingMode
  ): JSX.Element => {
    return editingMode === "forms" ? (
      <>
        {constructorType === "namespace" && <NamespaceConstructor />}
        {constructorType === "rulePack" && <RulePackConstructor />}
        {constructorType === "taskSet" && <TaskSetConstructor />}
      </>
    ) : (
      <CodeMirrorEditor constructorType={constructorType} />
    );
  };

  return (
    <div className="constructor-page">
      <div className="constructor-page__editing-mode-switchers">
        <div
          className={`constructor-page__editing-mode-switcher ${
            currentEditingMode === "forms" &&
            "constructor-page__editing-mode-switcher--active"
          }`}
          onClick={() => setCurrentEditingMode("forms")}
        >
          Формы
        </div>
        <div
          className={`constructor-page__editing-mode-switcher ${
            currentEditingMode === "textEditor" &&
            "constructor-page__editing-mode-switcher--active"
          }`}
          onClick={() => setCurrentEditingMode("textEditor")}
        >
          JSON
        </div>
      </div>
      <Switch>
        <Route
          exact
          path={`${url}/task-set/:code?`}
          render={() => renderConstructor("taskSet", currentEditingMode)}
        />
        <Route
          exact
          path={`${url}/namespace/:code?`}
          render={() => renderConstructor("namespace", currentEditingMode)}
        />
        <Route
          exact
          path={`${url}/rule-pack/:code?`}
          render={() => renderConstructor("rulePack", currentEditingMode)}
        />
      </Switch>
    </div>
  );
};

export default ConstructorPage;
