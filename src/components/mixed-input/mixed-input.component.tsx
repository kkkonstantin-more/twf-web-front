// libs and hooks
import React, { ChangeEvent, PropsWithChildren, useState } from "react";
// lib components
import { EditableMathField, MathField } from "react-mathquill";
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

const MixedInput = React.forwardRef(
  (props: PropsWithChildren<MixedInputProps>, ref) => {
    const {
      format,
      onBlur,
      expression,
      onChangeExpression,
      onChangeFormat,
      style,
      expressionRef,
    } = props;
    // // last format in which user changed expression

    // // currently visible format
    // const [currentVisibleFormat, setCurrentVisibleFormat] = useState<
    //   MathInputFormat
    // >(initialFormat || MathInputFormat.TEX);
    //
    //
    // // useEffect(() => {
    // //   if (inputRef && inputRef.current) {
    // //     // @ts-ignore
    // //     inputRef.current.value = currentValue;
    // //   }
    // // }, [currentValue]);
    //
    // const changeInputMode = (toFormat: MathInputFormat): void => {
    //   // validation of empty string leads to error
    //   if (currentValue !== "") {
    //     try {
    //       setCurrentValue(
    //         convertMathInput(currentInputFormat, toFormat, currentValue)
    //       );
    //       setCurrentInputFormat(toFormat);
    //       if (formatRef?.current) {
    //         formatRef.current.value = toFormat;
    //       }
    //       setError(null);
    //     } catch ({ message }) {
    //       setError(message);
    //     }
    //   } else {
    //     setCurrentInputFormat(toFormat);
    //   }
    // };
    //
    // const onChangeInputValue = (value: string, format: MathInputFormat): void => {
    //   if (currentInputFormat !== format) {
    //     changeInputMode(format);
    //   }
    //   setCurrentValue(value);
    // };
    //
    // const onSelectMode = (format: MathInputFormat): void => {
    //   if (error === null) {
    //     setCurrentVisibleFormat(format);
    //   }
    //   if (currentValue === "") {
    //     if (formatRef?.current) {
    //       formatRef.current.value = format;
    //     }
    //   }
    // };
    //
    // const onBlurInput = (format: MathInputFormat, value: string): void => {
    //   setError(getErrorFromMathInput(format, value));
    //   if (onBlur) {
    //     onBlur(value);
    //   }
    // };
    //

    //
    // // useEffect(() => {
    // //   if (onChange) {
    // //     onChange();
    // //   }
    // //   console.log("useEffect is triggered!");
    // // }, [currentValue]);
    //
    //
    // const updateValues = (value: string) => {
    //   if (inputRef && inputRef.current) {
    //     inputRef.current.value = value;
    //   }
    //   if (onChange) {
    //     onChange();
    //   }
    // };

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
    const [currentInputFormat, setCurrentInputFormat] = useState<
      MathInputFormat
    >(format ? format : MathInputFormat.TEX);
    const [currentValue, setCurrentValue] = useState<string>(
      expression ? expression : ""
    );
    const [mathQuillField, setMathQuillField] = useState<MathField | null>(
      null
    );

    const getVisibleInputValue = (format: MathInputFormat): string => {
      return currentVisibleFormat === currentInputFormat
        ? currentValue
        : convertMathInput(currentInputFormat, format, currentValue);
    };
    const [error, setError] = useState<null | string>(null);

    // useEffect(() => {
    //   if (expressionRef && expressionRef.current) {
    //     expressionRef.current.value = currentValue;
    //   }
    // }, [currentValue]);

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
            <EditableMathField
              latex={getVisibleInputValue(MathInputFormat.TEX)}
              mathquillDidMount={(mathField: MathField) => {
                setMathQuillField(mathField);
              }}
              style={{
                width: "100%",
              }}
              onChange={(mathField: MathField) => {
                setCurrentInputFormat(MathInputFormat.TEX);
                setCurrentValue(mathField.latex());
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
              }}
              onBlur={() => {
                if (mathQuillField && onBlur) {
                  setError(
                    getErrorFromMathInput(
                      MathInputFormat.TEX,
                      mathQuillField.latex()
                    )
                  );
                  onBlur(mathQuillField.latex());
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
              if (onBlur) {
                onBlur(event.target.value);
              }
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
              if (onBlur) {
                onBlur(event.target.value);
              }
            }}
          />
        )}
        {error !== null && (
          <div className="mixed-input__error-message">{error}</div>
        )}
      </div>
    );
  }
);

export default MixedInput;
