// libs and hooks
import React from "react";
// lib components
import { Input } from "antd";
// types
import { ChangeEvent } from "react";
import { ConstructorInputProps } from "./construcor-input.types";

const ConstructorInput = ({
  name,
  type,
  label,
  value,
  onChange,
  isVisible = true,
  isRendered = true,
  disabled = false,
  isExpressionInput = false,
  isTextArea = false,
  width = 100,
}: ConstructorInputProps): JSX.Element => {
  const { TextArea } = Input;

  const onChangeInputValue = (
    event: ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLInputElement>
  ): void => {
    const value = event.target.value;
    if (onChange) {
      onChange(value);
    }
  };

  if (isRendered) {
    return (
      <div
        className="constructor-input"
        style={{
          display: isVisible ? "block" : "none",
          marginBottom: isExpressionInput ? "2rem" : "1.5rem",
          flexBasis: `${width - 1}%`,
          marginRight: '1%'
        }}
      >
        <label>{label}</label>
        {isTextArea && (
          <TextArea
            rows={3}
            allowClear={true}
            disabled={disabled}
            name={name}
            value={value}
            onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
              onChangeInputValue(event);
            }}
          />
        )}
        {!isTextArea && (
          <input
            disabled={disabled}
            className="form-control"
            style={{
              display: isExpressionInput ? "none" : "block",
            }}
            value={value}
            name={isExpressionInput ? name + ".expression" : name}
            type={type}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              onChangeInputValue(event);
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
