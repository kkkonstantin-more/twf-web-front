import React, { useEffect, useState } from "react";

import MathQuillEditor from "../math-quill-editor/math-quill-editor";

import "./mixed-input.scss";
import {
  convertMathInput,
  getErrorFromMathInput,
  MathInputFormat,
} from "../../utils/kotlin-lib-functions";

interface MixedInputProps {
  inputRef: React.RefObject<HTMLInputElement>;
  width?: string;
}

const MixedInput: React.FC<MixedInputProps> = ({
  inputRef,
  width,
}: MixedInputProps) => {
  const [currentInputFormat, setCurrentInputFormat] = useState<MathInputFormat>(
    MathInputFormat.TEX
  );
  const [currentValue, setCurrentValue] = useState<string>("");
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
  }, [currentValue]);

  return (
    <div className="mixed-input" style={{ width }}>
      <div className="mixed-input__mode-tabs">
        <div
          className={`mixed-input__mode-tab ${
            currentInputFormat === MathInputFormat.TEX &&
            "mixed-input__mode-tab--active"
          }`}
          onClick={() => {
            changeInputMode(MathInputFormat.TEX);
          }}
        >
          <span>TEX</span>
        </div>
        <div
          className={`mixed-input__mode-tab ${
            currentInputFormat === MathInputFormat.PLAIN_TEXT &&
            "mixed-input__mode-tab--active"
          }`}
          onClick={(): void => {
            changeInputMode(MathInputFormat.PLAIN_TEXT);
          }}
        >
          <span>Plain Text</span>
        </div>
        <div
          className={`mixed-input__mode-tab ${
            currentInputFormat === MathInputFormat.STRUCTURE_STRING &&
            "mixed-input__mode-tab--active"
          }`}
          onClick={(): void => {
            changeInputMode(MathInputFormat.STRUCTURE_STRING);
          }}
        >
          <span>Structure String</span>
        </div>
      </div>
      {currentInputFormat === MathInputFormat.TEX && (
        <MathQuillEditor
          startingLatexExpression={currentValue}
          inputRef={inputRef}
          showOperationTab={false}
          updateValue={setCurrentValue}
          width={width}
          // isInvalid={!!error}
        />
      )}
      {currentInputFormat === MathInputFormat.PLAIN_TEXT && (
        <input
          style={{ width: width }}
          type="text"
          className={`mixed-input__input form-control ${
            error !== null && "is-invalid"
          }`}
          value={currentValue}
          onChange={(event) => {
            setCurrentValue(event.target.value);
          }}
          onBlur={() => {
            setError(
              getErrorFromMathInput(MathInputFormat.PLAIN_TEXT, currentValue)
            );
          }}
        />
      )}
      {currentInputFormat === MathInputFormat.STRUCTURE_STRING && (
        <input
          style={{ width: width }}
          type="text"
          className={`mixed-input__input form-control ${
            error !== null && "is-invalid"
          }`}
          value={currentValue}
          onChange={(event) => {
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
