// libs and hooks
import React, { Dispatch, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
// custom components
import ConstructorSelect from "../constructor-select/constructor-select.component";
import ConstructorInput from "../constructor-input/constructor-input.component";
// redux
import {
  addOneLineChangeToHistory,
  redoHistory,
  undoHistory,
} from "../../redux/constructor-history/constructor-history.actions";
import { connect, ConnectedProps } from "react-redux";
// types
import { LabeledValue } from "antd/es/select";
import {
  ConstructorInputs,
  ConstructorJSONType,
} from "../../redux/constructor-jsons/constructor-jsons.types";
import {
  AddOneLineChangeToHistoryAction,
  ConstructorHistoryItem,
  OneLineHistoryChange,
  RedoTaskSetHistoryAction,
  UndoTaskSetHistoryAction,
} from "../../redux/constructor-history/constructor-history.types";
import MixedInputAlt from "../mixed-input-alt/mixed-input-alt.component";
import { MathInputFormat } from "../../utils/kotlin-lib-functions";
import ConstructorUndoRedoPanel from "../constructor-undo-redo-panel/constructor-undo-redo-panel.component";
import { createStructuredSelector } from "reselect";
import { RootState } from "../../redux/root-reducer";
import { TaskSetConstructorInputs } from "../../constructors/task-set-constructor/task-set-constructor.types";
import {
  selectNamespaceJSON,
  selectRulePackJSON,
  selectTaskSetJSON,
} from "../../redux/constructor-jsons/constructor-jsons.selectors";
import { selectCurrentTaskSetHistoryChange } from "../../redux/constructor-history/constructor-history.selectors";
import {
  updateNamespaceJSON,
  updateRulePackJSON,
  updateTaskSetJSON,
} from "../../redux/constructor-jsons/constructor-jsons.actions";
import { RulePackConstructorInputs } from "../../constructors/rule-pack-constructor/rule-pack-constructor.types";
import { NamespaceConstructorInputs } from "../../constructors/namespace-constructor/namespace-constructor.types";
import {
  ConstructorFormExpressionInput,
  ConstructorFormInput,
  ConstructorFormProps,
  ConstructorFormSelectInput,
} from "./constructor-form.types";
import { ConstructorCreationMode } from "../../constructors/common-types";
import CONSTRUCTOR_JSONS_INITIAL_STATE from "../../redux/constructor-jsons/constructor-jsons.state";
import {
  getLastEditedCreationMode,
  getLastExampleConstructorCode,
  setLastEditedCreationMode,
  setLastExampleConstructorCode,
} from "../../utils/local-storage/last-edited-creation-type";
import TaskSetConstructorFormatter from "../../constructors/task-set-constructor/task-set-constructor.formatter";
import TaskSetConstructorRequestsHandler from "../../constructors/task-set-constructor/task-set-constructor.requests-handler";
import { TaskConstructorInputs } from "../../constructors/task-constructor/task-constructor.types";

const ConstructorForm = ({
  // constructor form props
  inputs,
  constructorType,
  // redux props
  currentHistoryChange,
  addOneLineChangeToHistory,
  undo,
  redo,
  taskSetJSON,
  namespaceJSON,
  rulePackJSON,
  updateTaskSetJSON,
  updateNamespaceJSON,
  updateRulePackJSON,
}: ConstructorFormProps & ConnectedProps<typeof connector>) => {
  // react-hook-form core functions from parent component
  // ConstructorForm should be wrapped inside FormProvider component
  const { setValue, watch, reset, getValues } = useFormContext();

  const isSelectInput = (
    input: ConstructorFormInput
  ): input is ConstructorFormSelectInput => {
    return (input as ConstructorFormSelectInput).options !== undefined;
  };

  const isExpressionInput = (
    input: ConstructorFormInput
  ): input is ConstructorFormExpressionInput => {
    return (
      (input as ConstructorFormExpressionInput).isExpressionInput !== undefined
    );
  };

  const addToHistory = (
    name: string,
    oldVal: string | string[],
    newVal: string | string[],
    constructorType: ConstructorJSONType
  ): void => {
    addOneLineChangeToHistory({
      oldVal: {
        propertyPath: name,
        value: oldVal,
      },
      newVal: {
        propertyPath: name,
        value: newVal,
      },
      constructorType,
    });
  };

  const updateReduxJSON = (() => {
    switch (constructorType) {
      case ConstructorJSONType.NAMESPACE:
        return updateNamespaceJSON;
      case ConstructorJSONType.RULE_PACK:
        return updateRulePackJSON;
      case ConstructorJSONType.TASK_SET:
        return updateTaskSetJSON;
    }
  })();

  const onChangeInputValue = (
    name: string,
    oldVal: string | string[],
    newVal: string | string[],
    constructorType: ConstructorJSONType
  ): void => {
    addToHistory(name, oldVal, newVal, constructorType);
    setValue(name, newVal);
  };

  const [undoOrRedoIsTriggered, setUndoOrRedoIsTriggered] = useState(false);

  useEffect(() => {
    if (undoOrRedoIsTriggered) {
      if (currentHistoryChange?.type === "ONE_LINE_CHANGE") {
        setValue(
          currentHistoryChange.item.propertyPath,
          currentHistoryChange.item.value
        );
      } else if (currentHistoryChange?.type === "MULTIPLE_LINES_CHANGE") {
        reset(currentHistoryChange.item);
      }
      setUndoOrRedoIsTriggered(false);
    }
  }, [undoOrRedoIsTriggered]);

  return (
    <div
      onBlur={() => {
        // update current JSON when users clicks/taps outside of form
        // @ts-ignore
        updateReduxJSON(getValues());
      }}
    >
      <ConstructorUndoRedoPanel
        undo={() => {
          undo(constructorType);
          setUndoOrRedoIsTriggered(true);
        }}
        redo={() => {
          redo(constructorType);
          setUndoOrRedoIsTriggered(true);
        }}
      />
      {inputs.map((input: ConstructorFormInput) => {
        const { name } = input;
        // current value from react-hook-form
        const watchValue = isExpressionInput(input) ? null : watch(name);

        if (isSelectInput(input)) {
          return (
            <ConstructorSelect
              {...input}
              key={name}
              value={watchValue}
              onChange={(value: string | string[]) => {
                onChangeInputValue(name, watchValue, value, constructorType);
              }}
            />
          );
        } else if (isExpressionInput(input)) {
          return (
            <MixedInputAlt
              {...input}
              key={name}
              expression={watch(name + ".expression")}
              format={watch(name + ".format")}
              onChangeExpression={(value: string) => {
                onChangeInputValue(
                  name + ".expression",
                  watch(name + ".expression"),
                  value,
                  constructorType
                );
              }}
              onChangeFormat={(value: MathInputFormat) => {
                onChangeInputValue(
                  name + ".format",
                  watch(name + ".format"),
                  value,
                  constructorType
                );
              }}
            />
          );
        } else {
          return (
            <ConstructorInput
              {...input}
              key={name}
              value={watchValue}
              onChange={(value: string | string[]) => {
                onChangeInputValue(name, watchValue, value, constructorType);
              }}
              constructorType={ConstructorJSONType.TASK_SET}
            />
          );
        }
      })}
    </div>
  );
};

// connecting redux
const mapState = createStructuredSelector<
  RootState,
  {
    currentHistoryChange: ConstructorHistoryItem | undefined;
    taskSetJSON: TaskSetConstructorInputs;
    namespaceJSON: NamespaceConstructorInputs;
    rulePackJSON: RulePackConstructorInputs;
  }
>({
  currentHistoryChange: selectCurrentTaskSetHistoryChange,
  taskSetJSON: selectTaskSetJSON,
  namespaceJSON: selectNamespaceJSON,
  rulePackJSON: selectRulePackJSON,
});

const mapDispatch = (dispatch: Dispatch<any>) => ({
  addOneLineChangeToHistory: (item: OneLineHistoryChange) =>
    dispatch(addOneLineChangeToHistory(item)),
  undo: (constructorType: ConstructorJSONType) =>
    dispatch(undoHistory(constructorType)),
  redo: (constructorType: ConstructorJSONType) =>
    dispatch(redoHistory(constructorType)),
  updateTaskSetJSON: (value: TaskSetConstructorInputs) =>
    dispatch(updateTaskSetJSON(value)),
  updateRulePackJSON: (value: RulePackConstructorInputs) =>
    dispatch(updateRulePackJSON(value)),
  updateNamespaceJSON: (value: NamespaceConstructorInputs) =>
    dispatch(updateNamespaceJSON(value)),
});

const connector = connect(mapState, mapDispatch);

export default connector(ConstructorForm);
