// libs
import React, { Dispatch, useState } from "react";
import { Route, Switch, useLocation, useRouteMatch } from "react-router-dom";
// constructors
import TaskSetConstructor from "../../constructors/task-set-constructor/task-set-constructor.component";
import NamespaceConstructor from "../../constructors/namespace-constructor/namespace-constructor.component";
import RulePackConstructor from "../../constructors/rule-pack-constructor/rule-pack-constructor.component";
import CodeMirrorEditor from "../../components/code-mirror/code-mirror.component";
// types
import {
  EditingMode,
  EditingModeSwitcherOption,
} from "./constructor-page.types";
// styles
import "./constructor-page.styles.scss";
import { ConstructorJSONsTypes } from "../../redux/constructor-jsons/constructor-jsons.types";
import { createStructuredSelector } from "reselect";
import { RootState } from "../../redux/root-reducer";
import { NamespaceConstructorInputs } from "../../constructors/namespace-constructor/namespace-constructor.types";
import { RulePackConstructorInputs } from "../../constructors/rule-pack-constructor/rule-pack-constructor.types";
import { TaskSetConstructorInputs } from "../../constructors/task-set-constructor/task-set-constructor.types";
import {
  ConstructorHistoryItem,
  ExpressionChange,
} from "../../redux/constructor-history/constructor-history.types";
import {
  selectIsNamespaceJSONValid,
  selectIsRulePackJSONValid,
  selectIsTaskSetJSONValid,
  selectNamespaceJSON,
  selectRulePackJSON,
  selectTaskSetJSON,
} from "../../redux/constructor-jsons/constructor-jsons.selectors";
import {
  selectCurrentNamespaceHistoryChange,
  selectCurrentRulePackHistoryChange,
  selectCurrentTaskSetHistoryChange,
} from "../../redux/constructor-history/constructor-history.selectors";
import {
  setJSONValidity,
  updateNamespaceJSON,
  updateRulePackJSON,
  updateTaskSetJSON,
} from "../../redux/constructor-jsons/constructor-jsons.actions";
import {
  addMultipleLinesChangeToHistory,
  addOneLineChangeToHistory,
  redoHistory,
  undoHistory,
} from "../../redux/constructor-history/constructor-history.actions";
import { connect, ConnectedProps } from "react-redux";

const ConstructorPage = ({
  isTaskSetJSONValid,
  isRulePackJSONValid,
  isNamespaceJSONValid,
}: ConnectedProps<typeof connector>): JSX.Element => {
  const { url } = useRouteMatch();
  const { pathname } = useLocation();

  const constructorType = (() => {
    if (pathname.includes("task-set")) {
      return ConstructorJSONsTypes.TASK_SET;
    } else if (pathname.includes("rule-pack")) {
      return ConstructorJSONsTypes.RULE_PACK;
    } else {
      return ConstructorJSONsTypes.NAMESPACE;
    }
  })();

  const isCurrentJSONValid = (() => {
    switch (constructorType) {
      case ConstructorJSONsTypes.NAMESPACE:
        return isNamespaceJSONValid;
      case ConstructorJSONsTypes.RULE_PACK:
        return isRulePackJSONValid;
      case ConstructorJSONsTypes.TASK_SET:
        return isTaskSetJSONValid;
    }
  })();

  const [currentEditingMode, setCurrentEditingMode] = useState<EditingMode>(
    "forms"
  );

  const renderConstructor = (
    constructorType: ConstructorJSONsTypes,
    editingMode: EditingMode
  ): JSX.Element => {
    return editingMode === "forms" ? (
      <>
        {constructorType === ConstructorJSONsTypes.NAMESPACE && (
          <NamespaceConstructor />
        )}
        {constructorType === ConstructorJSONsTypes.RULE_PACK && (
          <RulePackConstructor />
        )}
        {constructorType === ConstructorJSONsTypes.TASK_SET && (
          <TaskSetConstructor />
        )}
      </>
    ) : (
      <CodeMirrorEditor constructorType={constructorType} />
    );
  };

  const editingModeSwitcherOptions: EditingModeSwitcherOption[] = [
    {
      label: "Формы",
      value: "forms",
    },
    {
      label: "JSON",
      value: "textEditor",
    },
  ];

  return (
    <div className="constructor-page">
      <div className="constructor-page__editing-mode-switchers">
        {editingModeSwitcherOptions.map((option: EditingModeSwitcherOption) => {
          return (
            <div
              className={`constructor-page__editing-mode-switcher ${
                currentEditingMode === option.value
                  ? "constructor-page__editing-mode-switcher--active"
                  : ""
              }`}
              onClick={() => {
                if (
                  currentEditingMode === "textEditor" &&
                  !isCurrentJSONValid
                ) {
                  alert(
                    "Вы не можете переключиться в режим форм, если текущее значение JSON невалидное"
                  );
                } else {
                  setCurrentEditingMode(option.value);
                }
              }}
            >
              {option.label}
            </div>
          );
        })}
      </div>
      <Switch>
        <Route
          exact
          path={`${url}/task-set/:code?`}
          render={() =>
            renderConstructor(
              ConstructorJSONsTypes.TASK_SET,
              currentEditingMode
            )
          }
        />
        <Route
          exact
          path={`${url}/namespace/:code?`}
          render={() =>
            renderConstructor(
              ConstructorJSONsTypes.NAMESPACE,
              currentEditingMode
            )
          }
        />
        <Route
          exact
          path={`${url}/rule-pack/:code?`}
          render={() =>
            renderConstructor(
              ConstructorJSONsTypes.RULE_PACK,
              currentEditingMode
            )
          }
        />
      </Switch>
    </div>
  );
};

const mapStateToProps = createStructuredSelector<
  RootState,
  {
    isNamespaceJSONValid: boolean;
    isTaskSetJSONValid: boolean;
    isRulePackJSONValid: boolean;
  }
>({
  isNamespaceJSONValid: selectIsNamespaceJSONValid,
  isTaskSetJSONValid: selectIsTaskSetJSONValid,
  isRulePackJSONValid: selectIsRulePackJSONValid,
});

const connector = connect(mapStateToProps);

export default connector(ConstructorPage);
