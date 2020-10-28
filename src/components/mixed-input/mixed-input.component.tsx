// libs and hooks
import React, { useEffect, useState } from "react";
// components
import MathQuillEditor from "../math-quill-editor/math-quill-editor";
// twf lib functions
import {
  convertMathInput,
  getErrorFromMathInput,
  MathInputFormat,
} from "../../utils/kotlin-lib-functions";
// types
import { MixedInputProps } from "./mixed-input.types";
// styles
import "./mixed-input.styles.scss";

const MixedInput = ({ inputRef, width, value, onChange }: MixedInputProps) => {
  const [currentInputFormat, setCurrentInputFormat] = useState<MathInputFormat>(
    MathInputFormat.TEX
  );
  const [currentVisibleFormat, setCurrentVisibleFormat] = useState<
    MathInputFormat
  >(MathInputFormat.TEX);

  const [currentValue, setCurrentValue] = useState<string>(value ? value : "");
  const [error, setError] = useState<string | null>(null);

  const changeInputMode = (toFormat: MathInputFormat): void => {
    // validation of empty string leads to error
    if (currentValue !== "") {
      try {
        setCurrentValue(
          convertMathInput(currentInputFormat, toFormat, currentValue)
        );
        setCurrentInputFormat(toFormat);
        setError(null);
      } catch ({ message }) {
        setError(message);
      }
    } else {
      setCurrentInputFormat(toFormat);
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = currentValue;
    }
    if (onChange) {
      onChange();
    }
  }, [currentValue]);

  return (
    <div className="mixed-input" style={{ width }}>
      <div className="mixed-input__mode-tabs">
        <div
          className={`mixed-input__mode-tab ${
            currentVisibleFormat === MathInputFormat.TEX &&
            "mixed-input__mode-tab--active"
          }`}
          onClick={() => {
            setCurrentVisibleFormat(MathInputFormat.TEX);
            // changeInputMode(MathInputFormat.TEX);
          }}
        >
          <span>TEX</span>
        </div>
        <div
          className={`mixed-input__mode-tab ${
            currentVisibleFormat === MathInputFormat.PLAIN_TEXT &&
            "mixed-input__mode-tab--active"
          }`}
          onClick={(): void => {
            setCurrentVisibleFormat(MathInputFormat.PLAIN_TEXT);
          }}
        >
          <span>Plain Text</span>
        </div>
        <div
          className={`mixed-input__mode-tab ${
            currentVisibleFormat === MathInputFormat.STRUCTURE_STRING &&
            "mixed-input__mode-tab--active"
          }`}
          onClick={(): void => {
            setCurrentVisibleFormat(MathInputFormat.STRUCTURE_STRING);
          }}
        >
          <span>Structure String</span>
        </div>
      </div>
      {currentVisibleFormat === MathInputFormat.TEX && (
        <MathQuillEditor
          startingLatexExpression={
            currentInputFormat === MathInputFormat.TEX
              ? currentValue
              : convertMathInput(
                  currentInputFormat,
                  MathInputFormat.TEX,
                  currentValue
                )
          }
          inputRef={inputRef}
          showOperationTab={false}
          updateValue={(value: string) => {
            if (currentInputFormat !== MathInputFormat.TEX) {
              changeInputMode(MathInputFormat.TEX);
            }
            setCurrentValue(value);
          }}
          width={width}
          // isInvalid={!!error}
        />
      )}
      {currentVisibleFormat === MathInputFormat.PLAIN_TEXT && (
        <input
          style={{ width: width }}
          type="text"
          className={`mixed-input__input form-control ${
            error !== null && "is-invalid"
          }`}
          value={
            currentInputFormat === MathInputFormat.PLAIN_TEXT
              ? currentValue
              : convertMathInput(
                  currentInputFormat,
                  MathInputFormat.PLAIN_TEXT,
                  currentValue
                )
          }
          onChange={(event) => {
            if (currentInputFormat !== MathInputFormat.PLAIN_TEXT) {
              changeInputMode(MathInputFormat.PLAIN_TEXT);
            }
            setCurrentValue(event.target.value);
          }}
          onBlur={() => {
            setError(
              getErrorFromMathInput(MathInputFormat.PLAIN_TEXT, currentValue)
            );
          }}
        />
      )}
      {currentVisibleFormat === MathInputFormat.STRUCTURE_STRING && (
        <input
          style={{ width: width }}
          type="text"
          className={`mixed-input__input form-control ${
            error !== null && "is-invalid"
          }`}
          value={
            currentInputFormat === MathInputFormat.STRUCTURE_STRING
              ? currentValue
              : convertMathInput(
                  currentInputFormat,
                  MathInputFormat.STRUCTURE_STRING,
                  currentValue
                )
          }
          onChange={(event) => {
            if (currentInputFormat !== MathInputFormat.STRUCTURE_STRING) {
              changeInputMode(MathInputFormat.STRUCTURE_STRING);
            }
            setCurrentValue(event.target.value);
          }}
          onBlur={() => {
            setError(
              getErrorFromMathInput(
                MathInputFormat.STRUCTURE_STRING,
                currentValue
              )
            );
          }}
        />
      )}
      {error !== null && (
        <div className="mixed-input__error-message">{error}</div>
      )}
    </div>
  );
};

export default MixedInput;
