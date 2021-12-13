import React from "react";
import {MultipleMixedInputProps} from "./multiple-mixed-input.types";
import Icon from "@mdi/react";
import {mdiClose, mdiNumericPositive1} from "@mdi/js";
import "./multiple-mixed-input.styles.scss";
import MixedInput from "../mixed-input/mixed-input.component";
import {MathInputFormat} from "../../utils/kotlin-lib-functions";
import {useFieldArray, useFormContext} from "react-hook-form";
import {ExpressionInput} from "../../constructors/task-constructor/task-constructor.types";

const MultipleMixedInput = (
  {
    onChangeInputValue,
    constructorType,
    name,
    style,
    label,
    isRendered = true,
    isVisible = true,
    width = 100,
  }: MultipleMixedInputProps
) => {
  // react-hook-form core functions from parent component's context
  // TaskConstructor should be wrapped inside FormProvider component
  const {control} = useFormContext();

  // react-hook-form's fieldArray initialization and getting its needed tools
  // in order to manage rule constructors
  const {fields: fieldsAnswers, append: appendAnswer, remove: removeAnswer} = useFieldArray<ExpressionInput>(
    {
      control,
      name: name,
    }
  );

  return (
    <div
      className="multiple-mixed-input"
      style={
        style
          ? {...style, display: isVisible ? "block" : "hidden"}
          : {display: isVisible ? "block" : "hidden", flexBasis: `${width - 1}%`, marginRight: '1%'}
      }>
      {label && <div className="label">{label}</div>}
      {fieldsAnswers.map((field, fieldIdx) => {
        return (
          <div key={field.id}>
            <div style={{display: 'inline-block', width: '50%'}}>
              <MixedInput
                style={style}
                isRendered={isRendered}
                isVisible={isVisible}
                width={width}
                format={field.format!}
                expression={field.expression!}
                onChangeExpression={(value: string) => {
                  onChangeInputValue(
                    `${name}[${fieldIdx}].expression`,
                    field.expression,
                    value,
                    constructorType
                  );
                }}
                onChangeFormat={(value: MathInputFormat) => {
                  onChangeInputValue(
                    `${name}[${fieldIdx}].format`,
                    field.format,
                    value,
                    constructorType
                  );
                }}
              />
            </div>

            <button
              className="btn"
              style={{padding: 0, marginBottom: 5}}
              type="button"
              onClick={() => {
                if (fieldsAnswers.length > 1) removeAnswer(fieldIdx)
              }}
            >
              <Icon path={mdiClose} size={1}/>
            </button>
            {fieldIdx == fieldsAnswers.length - 1 &&
            <button
                className="btn"
                style={{padding: 0, marginBottom: 5, marginLeft: 5}}
                type="button"
                onClick={() => {
                  if (fieldsAnswers.length < 5) appendAnswer({format: MathInputFormat.TEX, expression: ""})
                }}
            >
                <Icon path={mdiNumericPositive1} size={1}/>
            </button>}
          </div>
        )
      })}

    </div>
  );
};

export default MultipleMixedInput;
