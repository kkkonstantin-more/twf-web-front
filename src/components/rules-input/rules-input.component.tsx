import React from "react";
import {RulesInputProps} from "./rules-input.types";
import Icon from "@mdi/react";
import {mdiClose, mdiNumericPositive1} from "@mdi/js";
import "./rules-input.styles.scss";
import MixedInput from "../mixed-input/mixed-input.component";
import {MathInputFormat} from "../../utils/kotlin-lib-functions";

const RulesInput = (
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
  }: RulesInputProps
) => {
  const rulesCountName = `${name}Count`
  const rulesCount = watch(rulesCountName);
  const setRulesCount = (count: number) => {
    onChangeInputValue(rulesCountName, rulesCount, count, constructorType)
  };

  const incrementRulesCount = () => {
    if (rulesCount == 5) {
      alert('5 maximum rules are allowed');
      return;
    }
    setRulesCount(rulesCount + 1);
  };

  const removeRule = (num: number) => {
    return () => {
      if (rulesCount == 1) {
        return;
      }
      for (let i = num; i < rulesCount; i++) {
        onChangeInputValue(`${name}[${i}]`,
          watch(`${name}[${i}]`),
          watch(`${name}[${i + 1}]`) || { left: {expression: " ", format: MathInputFormat.TEX}, right: {expression: " ", format: MathInputFormat.TEX} },
          constructorType);
      }
      setRulesCount( rulesCount - 1)
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
      {Array.from(Array(rulesCount).keys()).map((num) => {
        const leftInputName = `${name}[${num}].left`
        const leftFormatName = `${leftInputName}.format`
        const leftExpressionName = `${leftInputName}.expression`
        const rightInputName = `${name}[${num}].right`
        const rightFormatName = `${rightInputName}.format`
        const rightExpressionName = `${rightInputName}.expression`

        return (
          <div key={leftInputName}>
            <div style={{display: 'inline-block', width: '40%'}}>
              <MixedInput
                style={style}
                isRendered={isRendered}
                isVisible={isVisible}
                width={width}
                format={watch(leftFormatName)}
                expression={watch(leftExpressionName)}
                onChangeExpression={(value: string) => {
                  onChangeInputValue(
                    leftExpressionName,
                    watch(leftExpressionName),
                    value,
                    constructorType
                  );
                }}
                onChangeFormat={(value: MathInputFormat) => {
                  onChangeInputValue(
                    leftFormatName,
                    watch(leftFormatName),
                    value,
                    constructorType
                  );
                }}
              />
            </div>
            <div style={{display: 'inline-block', width: '1%'}}>
              =
            </div>
            <div style={{display: 'inline-block', width: '40%'}}>
              <MixedInput
                style={style}
                isRendered={isRendered}
                isVisible={isVisible}
                width={width}
                format={watch(rightFormatName)}
                expression={watch(rightExpressionName)}
                onChangeExpression={(value: string) => {
                  onChangeInputValue(
                    rightExpressionName,
                    watch(rightExpressionName),
                    value,
                    constructorType
                  );
                }}
                onChangeFormat={(value: MathInputFormat) => {
                  onChangeInputValue(
                    rightFormatName,
                    watch(rightFormatName),
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
              onClick={removeRule(num)}
            >
              <Icon path={mdiClose} size={1}/>
            </button>
            {num == rulesCount - 1 &&
            <button
                className="btn"
                style={{padding: 0, marginBottom: 5, marginLeft: 5}}
                type="button"
                onClick={incrementRulesCount}
            >
                <Icon path={mdiNumericPositive1} size={1}/>
            </button>}
          </div>
        )
      })}

    </div>
  );
};

export default RulesInput;
