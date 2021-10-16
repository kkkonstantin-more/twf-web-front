// libs and hooks
import React, { ChangeEvent, useEffect, useState } from "react";
// lib components
import { EditableMathField, MathField } from "react-mathquill";
// twf lib functions
import {
  convertMathInput,
  getErrorFromMathInput,
  MathInputFormat,
} from "../../utils/kotlin-lib-functions";
// types
import { MixedInputProps, ModeTab } from "./mixed-input.types";
// styles
import "./mixed-input.styles.scss";

const MixedInput = ({
  format,
  expression,
  onChangeExpression,
  onChangeFormat,
  style,
  label,
  isRendered = true,
  isVisible = true,
  width = 100,
}: MixedInputProps) => {
  const modeTabs: ModeTab[] = [
    {
      label: "TEX",
      format: MathInputFormat.TEX,
    },
    {
      label: "Plain Text",
      format: MathInputFormat.PLAIN_TEXT,
    },
    {
      label: "Structure string",
      format: MathInputFormat.STRUCTURE_STRING,
    },
  ];

  const [currentVisibleFormat, setCurrentVisibleFormat] = useState<
    MathInputFormat
  >(format || MathInputFormat.TEX);
  const [currentInputFormat, setCurrentInputFormat] = useState<MathInputFormat>(
    format || MathInputFormat.TEX
  );
  const [currentValue, setCurrentValue] = useState<string>(
    expression ? expression : ""
  );
  const [error, setError] = useState<null | string>(null);

  const getVisibleInputValue = (format: MathInputFormat): string => {
    return currentVisibleFormat === currentInputFormat
      ? currentValue
      : convertMathInput(currentInputFormat, format, currentValue);
  };

  useEffect(() => {
    if (expression) {
      setCurrentValue(expression);
    }
  }, [expression]);

  if (isRendered) {
    return (
      <div
        className="mixed-input"
        style={
          style
            ? { ...style, display: isVisible ? "block" : "hidden" }
            : { display: isVisible ? "block" : "hidden", flexBasis: `${width - 1}%`, marginRight: '1%' }
        }
      >
        {label && <div className="label">{label}</div>}
        <div className="mixed-input__mode-tabs">
          {modeTabs.map((tab: ModeTab) => {
            const { label, format } = tab;
            return (
              <div
                key={label}
                className={`mixed-input__mode-tab ${
                  currentVisibleFormat === format
                    ? "mixed-input__mode-tab--active"
                    : ""
                }`}
                onClick={(): void => {
                  if (error === null) {
                    setCurrentVisibleFormat(format);
                  }
                }}
              >
                <span>{label}</span>
              </div>
            );
          })}
        </div>
        {currentVisibleFormat === MathInputFormat.TEX && (
          <EditableMathField
            latex={getVisibleInputValue(MathInputFormat.TEX)}
            style={{
              width: "100%",
            }}
            onChange={(mathField: MathField) => {
              // check if mathquill input is focused
              if (
                mathField.el().childNodes[0].childNodes[0] ===
                document.activeElement
              ) {
                setCurrentValue(mathField.latex());
                setCurrentInputFormat(MathInputFormat.TEX);
                if (onChangeExpression) {
                  onChangeExpression(mathField.latex());
                }
                if (
                  onChangeFormat &&
                  currentInputFormat !== MathInputFormat.TEX
                ) {
                  setCurrentInputFormat(MathInputFormat.TEX);
                  onChangeFormat(MathInputFormat.TEX);
                }
              }
            }}
            onBlur={() => {
              if (currentInputFormat === MathInputFormat.TEX) {
                setError(
                  getErrorFromMathInput(MathInputFormat.TEX, currentValue)
                );
              }
            }}
          />
        )}
        {[MathInputFormat.PLAIN_TEXT, MathInputFormat.STRUCTURE_STRING]
          .filter(
            (inputFormat: MathInputFormat) =>
              inputFormat === currentVisibleFormat
          )
          .map((inputFormat: MathInputFormat) => {
            return (
              <input
                key={inputFormat}
                style={{ width: "100%" }}
                type="text"
                className={`mixed-input__input form-control ${
                  error ? "is-invalid" : ""
                }`}
                value={getVisibleInputValue(inputFormat)}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  setCurrentValue(event.target.value);
                  setCurrentInputFormat(inputFormat);
                  if (onChangeExpression) {
                    onChangeExpression(event.target.value);
                  }
                  if (onChangeFormat && currentInputFormat !== inputFormat) {
                    setCurrentInputFormat(inputFormat);
                    onChangeFormat(inputFormat);
                  }
                }}
                onBlur={(event: React.FocusEvent<HTMLInputElement>) => {
                  setError(
                    getErrorFromMathInput(inputFormat, event.target.value)
                  );
                }}
              />
            );
          })}
        {error !== null && (
          <div className="mixed-input__error-message">{error}</div>
        )}
      </div>
    );
  } else {
    return <></>;
  }
};

export default MixedInput;
