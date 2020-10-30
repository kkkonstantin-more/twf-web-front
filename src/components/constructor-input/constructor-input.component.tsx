import React, { useEffect, useState } from "react";
import { ConstructorInputProps } from "./construcor-input.types";
import useMergedRef from "@react-hook/merged-ref";
import MixedInput from "../mixed-input/mixed-input.component";

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

  const inputWrapperRef: React.RefObject<HTMLDivElement> = React.createRef();

  const [mixedInputWidth, setMixedInputWidth] = useState<number>(100);

  useEffect(() => {
    if (register) {
      register({ name });
    }
  }, []);

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
          className="form-group"
          style={{
            marginBottom: expressionInput ? "0" : undefined,
          }}
        >
          <label>{label}</label>
          {expressionInput ? (
            <MixedInput
              value={defaultValue}
              width={mixedInputWidth + "px"}
              onBlur={(value: string) => {
                if (setValue) {
                  setValue(name, value);
                }
                if (updateJSON) {
                  updateJSON();
                }
              }}
            />
          ) : (
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
              defaultValue={defaultValue}
            />
          )}
        </div>
      </div>
    );
  } else {
    return <></>;
  }
};

export default ConstructorInput;
