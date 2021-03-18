// libs and hooks
// types
import React, { ChangeEvent, Dispatch, useEffect, useState } from "react";
import useMergedRef from "@react-hook/merged-ref";
// custom components
import MixedInput from "../mixed-input/mixed-input.component";
import { ConstructorInputProps } from "./construcor-input.types";
import { MathInputFormat } from "../../utils/kotlin-lib-functions";
import { createStructuredSelector } from "reselect";
import { RootState } from "../../redux/root-reducer";
import { TaskSetConstructorInputs } from "../../constructors/task-set-constructor/task-set-constructor.types";
import {
  ConstructorHistoryItem,
  ExpressionChange,
} from "../../redux/constructor-history/constructor-history.types";
import { selectTaskSetJSON } from "../../redux/constructor-jsons/constructor-jsons.selectors";
import {
  selectCurrentTaskSetHistoryChange,
  selectTaskSetHistory,
  selectTaskSetHistoryIndex,
} from "../../redux/constructor-history/constructor-history.selectors";
import {
  ConstructorInputs,
  ConstructorJSONType,
} from "../../redux/constructor-jsons/constructor-jsons.types";
import { updateConstructorJSON } from "../../redux/constructor-jsons/constructor-jsons.actions";
import { addOneLineChangeToHistory } from "../../redux/constructor-history/constructor-history.actions";
import { connect, ConnectedProps } from "react-redux";
import { useFormContext } from "react-hook-form";

// TODO: fix typescript and eslint errors

const ConstructorInput = ({
  name,
  type,
  label,
  defaultValue,
  disabled = false,
  isVisible = true,
  isRendered = true,
  isExpressionInput = false,
  constructorType,
  addItemToHistory,
  value,
  onChange,
}: ConstructorInputProps & ConnectedProps<typeof connector>): JSX.Element => {
  // const { register, setValue } = useFormContext();
  // const [inputValue, setInputValue] = useState(
  //   isExpressionInput ? defaultValue.expression : defaultValue
  // );
  // // expression input deps
  // const expressionRef: React.RefObject<HTMLInputElement> = React.createRef();
  // const formatRef: React.RefObject<HTMLInputElement> = React.createRef();
  // const mergedExpressionRef = useMergedRef(register(), expressionRef);
  // const mergedFormatRef = useMergedRef(register(), formatRef);

  if (isRendered) {
    return (
      <div
        className="constructor-input"
        style={{
          display: isVisible ? "block" : "none",
          marginBottom: isExpressionInput ? "2rem" : "1.5rem",
        }}
      >
        <div
          style={{
            marginBottom: isExpressionInput ? "0" : undefined,
          }}
        >
          <label>{label}</label>
          {/*{isExpressionInput && (*/}
          {/*  <>*/}
          {/*    <input*/}
          {/*      type="text"*/}
          {/*      name={name + ".format"}*/}
          {/*      defaultValue={defaultValue.format}*/}
          {/*      ref={mergedFormatRef}*/}
          {/*    />*/}
          {/*    <MixedInput*/}
          {/*      expressionRef={expressionRef}*/}
          {/*      expression={defaultValue.expression}*/}
          {/*      format={defaultValue.format}*/}
          {/*      style={{ width: "100%" }}*/}
          {/*      onChangeExpression={(value: string) => {*/}
          {/*        setValue(name + ".expression", value);*/}
          {/*        setInputValue((prevState: string) => {*/}
          {/*          if (prevState !== value) {*/}
          {/*            addItemToHistory(*/}
          {/*              {*/}
          {/*                propertyPath: name + ".expression",*/}
          {/*                value: prevState,*/}
          {/*              },*/}
          {/*              {*/}
          {/*                propertyPath: name + ".expression",*/}
          {/*                value: value,*/}
          {/*              },*/}
          {/*              constructorType*/}
          {/*            );*/}
          {/*          }*/}
          {/*          return value;*/}
          {/*        });*/}
          {/*      }}*/}
          {/*      onChangeFormat={(value: string) => {*/}
          {/*        if (formatRef && formatRef.current) {*/}
          {/*          formatRef.current.value = value;*/}
          {/*        }*/}
          {/*      }}*/}
          {/*      onBlur={(value: string) => {*/}
          {/*        if (expressionRef && expressionRef.current) {*/}
          {/*          expressionRef.current.value = value;*/}
          {/*        }*/}
          {/*      }}*/}
          {/*    />*/}
          {/*  </>*/}
          {/*)}*/}
          <input
            disabled={disabled}
            className="form-control"
            style={{
              display: isExpressionInput ? "none" : "block",
            }}
            // defaultValue={
            //   isExpressionInput ? defaultValue.expression : defaultValue
            // }
            value={value}
            name={isExpressionInput ? name + ".expression" : name}
            type={type}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              const value = event.target.value;
              if (onChange) {
                onChange(value);
              }
              // if (!isExpressionInput) {
              //   addItemToHistory(
              //     {
              //       propertyPath: name,
              //       value: inputValue,
              //     },
              //     {
              //       propertyPath: name,
              //       value: event.target.value,
              //     },
              //     constructorType
              //   );
              //   setInputValue(event.target.value);
              // }
            }}
            // ref={mergedExpressionRef}
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
    taskSetJSON: TaskSetConstructorInputs;
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
  updateJSON: (constructorType: ConstructorJSONType, JSON: ConstructorInputs) =>
    dispatch(updateConstructorJSON(constructorType, JSON)),
  addItemToHistory: (
    oldVal: ExpressionChange,
    newVal: ExpressionChange,
    constructorType: ConstructorJSONType
  ) => dispatch(addOneLineChangeToHistory({ oldVal, newVal, constructorType })),
});

const connector = connect(mapState, mapDispatch);

export default connector(ConstructorInput);
