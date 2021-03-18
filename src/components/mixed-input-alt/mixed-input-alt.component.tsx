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
// styles

export interface MixedInputAltProps {
  style?: React.CSSProperties;
  format: MathInputFormat;
  expression: string;
  onChangeExpression?: (value: string) => void;
  onChangeFormat?: (format: MathInputFormat) => void;
}

const MixedInputAlt = ({
  style,
  format,
  expression,
  onChangeExpression,
  onChangeFormat,
}: MixedInputAltProps) => {
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

  const [currentVisibleFormat, setCurrentVisibleFormat] = useState<
    MathInputFormat
  >(format ? format : MathInputFormat.TEX);
  const [currentInputFormat, setCurrentInputFormat] = useState<MathInputFormat>(
    format ? format : MathInputFormat.TEX
  );
  const [currentValue, setCurrentValue] = useState<string>(
    expression ? expression : ""
  );

  const getVisibleInputValue = (format: MathInputFormat): string => {
    return currentVisibleFormat === currentInputFormat
      ? currentValue
      : convertMathInput(currentInputFormat, format, currentValue);
  };
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    if (expression) {
      setCurrentValue(expression);
    }
  }, [expression]);

  return (
    <div className="mixed-input" style={style}>
      <div className="mixed-input__mode-tabs">
        {modeTabs.map((tab: { label: string; format: MathInputFormat }) => {
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
        <>
          {/*<MathQuillEditor/>*/}
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
        </>
      )}
      {currentVisibleFormat === MathInputFormat.PLAIN_TEXT && (
        <input
          style={{ width: "100%" }}
          type="text"
          className={`mixed-input__input form-control ${
            error !== null && "is-invalid"
          }`}
          value={getVisibleInputValue(MathInputFormat.PLAIN_TEXT)}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setCurrentValue(event.target.value);
            setCurrentInputFormat(MathInputFormat.PLAIN_TEXT);
            if (onChangeExpression) {
              onChangeExpression(event.target.value);
            }
            if (
              onChangeFormat &&
              currentInputFormat !== MathInputFormat.PLAIN_TEXT
            ) {
              setCurrentInputFormat(MathInputFormat.PLAIN_TEXT);
              onChangeFormat(MathInputFormat.PLAIN_TEXT);
            }
          }}
          onBlur={(event: React.FocusEvent<HTMLInputElement>) => {
            setError(
              getErrorFromMathInput(
                MathInputFormat.PLAIN_TEXT,
                event.target.value
              )
            );
          }}
        />
      )}
      {currentVisibleFormat === MathInputFormat.STRUCTURE_STRING && (
        <input
          style={{ width: "100%" }}
          type="text"
          className={`mixed-input__input form-control ${
            error !== null && "is-invalid"
          }`}
          value={getVisibleInputValue(MathInputFormat.STRUCTURE_STRING)}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setCurrentValue(event.target.value);
            setCurrentInputFormat(MathInputFormat.STRUCTURE_STRING);
            if (onChangeExpression) {
              onChangeExpression(event.target.value);
            }
            if (
              onChangeFormat &&
              currentInputFormat !== MathInputFormat.STRUCTURE_STRING
            ) {
              setCurrentInputFormat(MathInputFormat.STRUCTURE_STRING);
              onChangeFormat(MathInputFormat.STRUCTURE_STRING);
            }
          }}
          onBlur={(event: React.FocusEvent<HTMLInputElement>) => {
            setError(
              getErrorFromMathInput(
                MathInputFormat.STRUCTURE_STRING,
                event.target.value
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

export default MixedInputAlt;
