// libs and hooks
import React, { Dispatch, useEffect, useState } from "react";
import useMergedRef from "@react-hook/merged-ref";
// custom components
import MixedInput from "../mixed-input/mixed-input.component";
// types
import { ChangeEvent } from "react";
import { ConstructorInputProps } from "./construcor-input.types";
import { MathInputFormat } from "../../utils/kotlin-lib-functions";
import { HistoryItem } from "../../constructors/task-constructor/task-constructor.component";
import { createStructuredSelector } from "reselect";
import { RootState } from "../../redux/root-reducer";
import { TaskSetConstructorInputs } from "../../constructors/task-set-constructor/task-set-constructor.types";
import {
  AddOneLineChangeToHistoryAction,
  ConstructorHistoryItem,
  ExpressionChange,
  OneLineHistoryChange,
  RedoTaskSetHistoryAction,
  UndoTaskSetHistoryAction,
  UpdateTaskSetHistoryIndexAction,
} from "../../redux/constructor-history/constructor-history.types";
import { selectTaskSetJSON } from "../../redux/constructor-jsons/constructor-jsons.selectors";
import {
  selectCurrentTaskSetHistoryChange,
  selectTaskSetHistory,
  selectTaskSetHistoryIndex,
} from "../../redux/constructor-history/constructor-history.selectors";
import {
  ConstructorInputs,
  ConstructorJSONsTypes,
  UpdateNamespaceJSONAction,
  UpdateRulePackJSONAction,
  UpdateTaskSetJSONAction,
} from "../../redux/constructor-jsons/constructor-jsons.types";
import {
  updateConstructorJSON,
  updateNamespaceJSON,
  updateRulePackJSON,
  updateTaskSetJSON,
} from "../../redux/constructor-jsons/constructor-jsons.actions";
import {
  addOneLineChangeToHistory,
  redoTaskSetHistory,
  undoTaskSetHistory,
} from "../../redux/constructor-history/constructor-history.actions";
import { connect, ConnectedProps } from "react-redux";
import { NamespaceConstructorInputs } from "../../constructors/namespace-constructor/namespace-constructor.types";
import { RulePackConstructorInputs } from "../../constructors/rule-pack-constructor/rule-pack-constructor.types";
import { useFormContext } from "react-hook-form";
import { FetchedTaskSet } from "../../utils/fetch-constructors/fetch-constructors.types";

// TODO: fix typescript and eslint errors

const ConstructorInput = ({
  name,
  type,
  label,
  defaultValue,
  disabled = false,
  isVisible = true,
  isRendered = true,
  expressionInput = false,
  constructorType,
  updateJSON,
  addItemToHistory,
  onChange,
}: ConstructorInputProps & ConnectedProps<typeof connector>): JSX.Element => {
  const { register, getValues } = useFormContext();
  const mixedInputRef:
    | React.RefObject<HTMLInputElement>
    | undefined = expressionInput ? React.createRef() : undefined;
  const expressionFormatRef:
    | React.RefObject<HTMLInputElement>
    | undefined = expressionInput ? React.createRef() : undefined;

  const inputWrapperRef: React.RefObject<HTMLDivElement> = React.createRef();

  const [inputValue, setInputValue] = useState(defaultValue);

  const [mixedInputWidth, setMixedInputWidth] = useState<number>(100);

  useEffect(() => {
    if (inputWrapperRef.current) {
      const width = window.getComputedStyle(inputWrapperRef.current, null);
      setMixedInputWidth(
        parseFloat(width.getPropertyValue("width").slice(0, -2))
      );
    }
  }, [inputWrapperRef]);

  if (isRendered) {
    return (
      <div
        className="constructor-input"
        style={{
          display: isVisible ? "block" : "none",
          marginBottom: expressionInput ? "2rem" : undefined,
        }}
        ref={inputWrapperRef}
      >
        <div
          style={{
            marginBottom: expressionInput ? "0" : undefined,
          }}
        >
          <label>{label}</label>
          {expressionInput && (
            <>
              <input
                type="text"
                name={name + ".format"}
                defaultValue={defaultValue.format}
                // eslint-disable-next-line react-hooks/rules-of-hooks
                ref={useMergedRef(
                  // @ts-ignore
                  register(),
                  // @ts-ignore
                  expressionFormatRef
                )}
                // onChange={() => {
                //   if (constructorType) {
                //     // @ts-ignore
                //     updateJSON(constructorType, getValues());
                //   }
                // }}
              />
              <MixedInput
                value={defaultValue.expression}
                width={mixedInputWidth + "px"}
                // onBlur={() => {
                //   if (updateJSON) {
                //     updateJSON();
                //   }
                // }}
                onChange={() => {
                  if (updateJSON && constructorType) {
                    // @ts-ignore
                    updateJSON(constructorType, getValues());
                  }
                }}
                inputRef={mixedInputRef}
                formatRef={expressionFormatRef}
                initialFormat={defaultValue.format}
              />
            </>
          )}
          <input
            disabled={disabled}
            className="form-control"
            style={{
              display: expressionInput ? "none" : "block",
            }}
            defaultValue={defaultValue}
            name={expressionInput ? name + ".expression" : name}
            type={type}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              if (onChange) {
                onChange();
              }
              if (updateJSON && constructorType) {
                addItemToHistory(
                  {
                    propertyPath: name,
                    value: inputValue,
                  },
                  {
                    propertyPath: name,
                    value: event.target.value,
                  }
                );
              }
              setInputValue(event.target.value);
              // @ts-ignore
              updateJSON(constructorType, getValues());
            }}
            // @ts-ignore
            ref={
              expressionInput
                ? // eslint-disable-next-line react-hooks/rules-of-hooks
                  useMergedRef(
                    // @ts-ignore
                    register(),
                    // @ts-ignore
                    mixedInputRef
                  )
                : // @ts-ignore
                  // @ts-ignore
                  register()
            }
            // defaultValue={inputValue}
          />
        </div>
      </div>
    );
  } else {
    return <></>;
  }
};

const mapState = createStructuredSelector<
  RootState,
  {
    taskSetJSON: FetchedTaskSet;
    history: ConstructorHistoryItem[];
    historyIdx: number;
    currentHistoryChange: ConstructorHistoryItem | undefined;
  }
>({
  taskSetJSON: selectTaskSetJSON,
  history: selectTaskSetHistory,
  historyIdx: selectTaskSetHistoryIndex,
  currentHistoryChange: selectCurrentTaskSetHistoryChange,
});

const mapDispatch = (dispatch: Dispatch<any>) => ({
  updateJSON: (
    constructorType: ConstructorJSONsTypes,
    JSON: ConstructorInputs
  ) => dispatch(updateConstructorJSON(constructorType, JSON)),
  addItemToHistory: (oldVal: ExpressionChange, newVal: ExpressionChange) =>
    dispatch(addOneLineChangeToHistory({ oldVal, newVal })),
});

const connector = connect(mapState, mapDispatch);

export default connector(ConstructorInput);
