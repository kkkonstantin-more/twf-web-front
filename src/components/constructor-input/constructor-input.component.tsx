// libs and hooks
import React, { useEffect, useState } from "react";
import useMergedRef from "@react-hook/merged-ref";
// custom components
import MixedInput from "../mixed-input/mixed-input.component";
// types
import { ChangeEvent } from "react";
import { ConstructorInputProps } from "./construcor-input.types";

const ConstructorInput = ({
  name,
  type,
  register,
  label,
  defaultValue,
  isVisible = true,
  isRendered = true,
  expressionInput = false,
  updateJSON,
}: ConstructorInputProps): JSX.Element => {
  const mixedInputRef:
    | React.RefObject<HTMLInputElement>
    | undefined = expressionInput ? React.createRef() : undefined;

  const inputWrapperRef: React.RefObject<HTMLDivElement> = React.createRef();

  const [inputValue, setInputValue] = useState(defaultValue);

  const [mixedInputWidth, setMixedInputWidth] = useState<number>(100);

  useEffect(() => {
    if (inputWrapperRef.current) {
      const width = window.getComputedStyle(inputWrapperRef.current, null);
      setMixedInputWidth(
        parseFloat(width.getPropertyValue("width").slice(0, -2))
      );
    }
  }, [inputWrapperRef]);

  if (isRendered) {
    return (
      <div
        className="constructor-input"
        style={{
          display: isVisible ? "block" : "none",
          marginBottom: expressionInput ? "2rem" : undefined,
        }}
        ref={inputWrapperRef}
      >
        <div
          style={{
            marginBottom: expressionInput ? "0" : undefined,
          }}
        >
          <label>{label}</label>
          {expressionInput && (
            <MixedInput
              value={defaultValue}
              width={mixedInputWidth + "px"}
              onBlur={() => {
                if (updateJSON) {
                  updateJSON();
                }
              }}
              inputRef={mixedInputRef}
            />
          )}
          <input
            className="form-control"
            style={{
              display: expressionInput ? "none" : "block",
            }}
            name={name}
            type={type}
            onBlur={() => {
              if (updateJSON) {
                updateJSON();
              }
            }}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setInputValue(event.target.value);
            }}
            ref={
              expressionInput
                ? // eslint-disable-next-line react-hooks/rules-of-hooks
                  useMergedRef(
                    // @ts-ignore
                    register(),
                    mixedInputRef
                  )
                : // @ts-ignore
                  // @ts-ignore
                  register()
            }
            defaultValue={inputValue}
          />
        </div>
      </div>
    );
  } else {
    return <></>;
  }
};

export default ConstructorInput;
