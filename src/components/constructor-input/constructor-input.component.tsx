import React, { ChangeEvent, useEffect } from "react";
import { ConstructorInputProps } from "./construcor-input.types";
import useMergedRef from "@react-hook/merged-ref";
import MixedInput from "../mixed-input/mixed-input";

const ConstructorInput = ({
  name,
  type,
  register,
  setValue,
  label,
  defaultValue,
  isVisible = true,
  isRendered = true,
  expressionInput = false,
  updateJSON,
}: ConstructorInputProps): JSX.Element => {
  const mixedInputRef: React.RefObject<
    HTMLInputElement
  > | null = expressionInput ? React.createRef() : null;

  useEffect(() => {
    if (register) {
      register({ name });
    }
  }, []);

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
            onBlur={(event: any) => {
              if (setValue) {
                setValue(name, event.target.value);
              }
              if (updateJSON) {
                updateJSON();
              }
            }}
            ref={
              expressionInput && register
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
              if (setValue) {
                setValue(name, mixedInputRef?.current?.value);
              }
              if (updateJSON) {
                updateJSON();
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
