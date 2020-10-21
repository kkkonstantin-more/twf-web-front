import React, { ChangeEvent } from "react";
import { ConstructorInputProps } from "./construcor-input.types";
import useMergedRef from "@react-hook/merged-ref";
import MixedInput from "../mixed-input/mixed-input";

const ConstructorInput = ({
  label,
  name,
  type,
  onBlur,
  register,
  defaultValue,
  isVisible = true,
  isRendered = true,
  expressionInput = false,
}: ConstructorInputProps): JSX.Element => {
  const mixedInputRef: React.RefObject<
    HTMLInputElement
  > | null = expressionInput ? React.createRef() : null;

  if (isRendered) {
    return (
      <div
        className="constructor-input"
        style={{ display: isVisible ? "block" : "none" }}
      >
        <div className="form-group">
          <label>{label}</label>
          <input
            className="form-control"
            name={name}
            type={type}
            onBlur={onBlur}
            ref={
              expressionInput
                ? // eslint-disable-next-line
                  useMergedRef(register, mixedInputRef)
                : register
            }
            defaultValue={defaultValue}
          />
        </div>
        {mixedInputRef !== null && (
          <MixedInput
            value={defaultValue}
            inputRef={mixedInputRef}
            width={100 + "px"}
            onChange={() => {
              if (onBlur) {
                onBlur();
              }
            }}
          />
        )}
      </div>
    );
  } else {
    return <></>;
  }
};

export default ConstructorInput;
