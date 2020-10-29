// libs and hooks
import React, { ChangeEvent, useEffect, useState } from "react";
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

  const onSelectMode = (format: MathInputFormat): void => {
    if (error === null) {
      setCurrentVisibleFormat(format);
    }
  };

  const onChangeInputValue = (value: string, format: MathInputFormat): void => {
    if (currentInputFormat !== format) {
      changeInputMode(format);
    }
    setCurrentValue(value);
  };

  const onBlur = (format: MathInputFormat): void => {
    setError(getErrorFromMathInput(format, currentValue));
  };

  const getVisibleInputValue = (format: MathInputFormat): string => {
    return currentInputFormat === format
      ? currentValue
      : convertMathInput(currentInputFormat, format, currentValue);
  };

  const modeTabs: { label: string; format: MathInputFormat }[] = [
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
        {modeTabs.map((tab: { label: string; format: MathInputFormat }) => {
          const { label, format } = tab;
          return (
            <div
              key={label}
              className={`mixed-input__mode-tab ${
                currentVisibleFormat === format &&
                "mixed-input__mode-tab--active"
              }`}
              onClick={(): void => onSelectMode(format)}
            >
              <span>{label}</span>
            </div>
          );
        })}
      </div>
      {currentVisibleFormat === MathInputFormat.TEX && (
        <MathQuillEditor
          startingLatexExpression={getVisibleInputValue(MathInputFormat.TEX)}
          inputRef={inputRef}
          showOperationTab={false}
          updateValue={(value: string) => {
            onChangeInputValue(value, MathInputFormat.TEX);
          }}
          onBlur={() => onBlur(MathInputFormat.TEX)}
          width={width}
        />
      )}
      {currentVisibleFormat === MathInputFormat.PLAIN_TEXT && (
        <input
          style={{ width: width }}
          type="text"
          className={`mixed-input__input form-control ${
            error !== null && "is-invalid"
          }`}
          value={getVisibleInputValue(MathInputFormat.PLAIN_TEXT)}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            onChangeInputValue(event.target.value, MathInputFormat.PLAIN_TEXT);
          }}
          onBlur={() => onBlur(MathInputFormat.PLAIN_TEXT)}
        />
      )}
      {currentVisibleFormat === MathInputFormat.STRUCTURE_STRING && (
        <input
          style={{ width: width }}
          type="text"
          className={`mixed-input__input form-control ${
            error !== null && "is-invalid"
          }`}
          value={getVisibleInputValue(MathInputFormat.STRUCTURE_STRING)}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            onChangeInputValue(
              event.target.value,
              MathInputFormat.STRUCTURE_STRING
            );
          }}
          onBlur={() => onBlur(MathInputFormat.STRUCTURE_STRING)}
        />
      )}
      {error !== null && (
        <div className="mixed-input__error-message">{error}</div>
      )}
    </div>
  );
};

export default MixedInput;
