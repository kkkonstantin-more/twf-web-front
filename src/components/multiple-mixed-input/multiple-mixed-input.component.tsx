import React from "react";
import {MultipleMixedInputProps} from "./multiple-mixed-input.types";
import Icon from "@mdi/react";
import {mdiClose, mdiNumericPositive1} from "@mdi/js";
import "./multiple-mixed-input.styles.scss";
import MixedInput from "../mixed-input/mixed-input.component";
import {MathInputFormat} from "../../utils/kotlin-lib-functions";

const MultipleMixedInput = (
  {
    watch,
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
  const answerCountName = `${name}Count`
  const answersCount = watch(answerCountName) || 1;
  const setAnswersCount = (count: number) => {
    onChangeInputValue(answerCountName, answersCount, count, constructorType)
  };

  const incrementAnswersCount = () => {
    if (answersCount == 5) {
      alert('5 maximum concrete answers are allowed');
      return;
    }
    setAnswersCount(answersCount + 1);
  };

  const removeAnswer = (num: number) => {
    return () => {
      if (answersCount == 1) {
        return;
      }
      for (let i = num; i < answersCount; i++) {
        const newValue = watch(`${name}[${i + 1}]`) || {expression: " ", format: MathInputFormat.TEX};
        if (newValue.expression === "") {
          newValue.expression = " ";
        }
        onChangeInputValue(`${name}[${i}]`,
          watch(`${name}[${i}]`),
          newValue,
          constructorType);
      }
      setAnswersCount( answersCount - 1)
    }
  }

  return (
    <div
      className="multiple-mixed-input"
      style={
        style
          ? { ...style, display: isVisible ? "block" : "hidden" }
          : { display: isVisible ? "block" : "hidden", flexBasis: `${width - 1}%`, marginRight: '1%' }
      }>
      {label && <div className="label">{label}</div>}
      {Array.from(Array(answersCount).keys()).map((num) => {
        const inputName = `${name}[${num}]`
        const formatName = `${inputName}.format`
        const expressionName = `${inputName}.expression`
        return (
          <div key={inputName}>
            <div style={{display: 'inline-block', width: '50%'}}>
              <MixedInput
                style={style}
                isRendered={isRendered}
                isVisible={isVisible}
                width={width}
                format={watch(formatName)}
                expression={watch(expressionName)}
                onChangeExpression={(value: string) => {
                  onChangeInputValue(
                    expressionName,
                    watch(expressionName),
                    value,
                    constructorType
                  );
                }}
                onChangeFormat={(value: MathInputFormat) => {
                  onChangeInputValue(
                    formatName,
                    watch(formatName),
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
              onClick={removeAnswer(num)}
            >
              <Icon path={mdiClose} size={1}/>
            </button>
            {num == answersCount - 1 &&
            <button
                className="btn"
                style={{padding: 0, marginBottom: 5, marginLeft: 5}}
                type="button"
                onClick={incrementAnswersCount}
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
