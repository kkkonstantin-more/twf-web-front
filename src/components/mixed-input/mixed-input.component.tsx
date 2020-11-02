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

const MixedInput = ({
  width,
  value,
  onChange,
  onBlur,
  inputRef,
}: MixedInputProps) => {
  // last format in which user changed expression
  const [currentInputFormat, setCurrentInputFormat] = useState<MathInputFormat>(
    MathInputFormat.TEX
  );
  // currently visible format
  const [currentVisibleFormat, setCurrentVisibleFormat] = useState<
    MathInputFormat
  >(MathInputFormat.TEX);

  const [currentValue, setCurrentValue] = useState<string>(value ? value : "");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (inputRef && inputRef.current) {
      // @ts-ignore
      inputRef.current.value = currentValue;
    }
  }, [currentValue]);

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

  const onBlurInput = (format: MathInputFormat, value: string): void => {
    setError(getErrorFromMathInput(format, value));
    if (onBlur) {
      onBlur(value);
    }
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
    if (onChange) {
      onChange(currentValue);
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
          showOperationTab={false}
          updateValue={(value: string) => {
            onChangeInputValue(value, MathInputFormat.TEX);
          }}
          onBlur={(value: string) => {
            onBlurInput(MathInputFormat.TEX, value);
          }}
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
          onBlur={() => {
            onBlurInput(MathInputFormat.PLAIN_TEXT, currentValue);
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
          value={getVisibleInputValue(MathInputFormat.STRUCTURE_STRING)}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            onChangeInputValue(
              event.target.value,
              MathInputFormat.STRUCTURE_STRING
            );
          }}
          onBlur={() => {
            onBlurInput(MathInputFormat.STRUCTURE_STRING, currentValue);
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
