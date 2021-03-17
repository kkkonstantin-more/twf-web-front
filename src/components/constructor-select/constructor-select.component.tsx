// libs and hooks
import React from "react";
import { useFormContext } from "react-hook-form";
// lib components
import { ConfigProvider, Select } from "antd";
import ruRu from "antd/lib/locale/ru_RU";
// types
import { ConstructorSelectProps } from "./constructor-select.types";
import { LabeledValue } from "antd/es/select";

const { Option } = Select;

const ConstructorSelect = ({
  name,
  label,
  options,
  isMulti,
  value,
  isRendered = true,
  isVisible = true,
  disabled = false,
  onChange,
}: ConstructorSelectProps): JSX.Element => {
  const selectRef: React.RefObject<any> = React.createRef();

  if (isRendered) {
    return (
      <ConfigProvider locale={ruRu}>
        <div
          className="constructor-select-input u-mb-sm"
          style={{ display: isVisible ? "block" : "none" }}
        >
          <h4>{label}</h4>
          <Select
            ref={selectRef}
            disabled={disabled}
            value={value}
            mode={isMulti ? "multiple" : undefined}
            style={{ width: "100%" }}
            onChange={(value: string | string[]) => {
              if (onChange) {
                onChange(value);
              }
              // add focus when deleting value in order to trigger dependent events in parent components
              if (selectRef && selectRef.current) {
                selectRef.current.focus();
              }
            }}
          >
            {options.map((option: LabeledValue, i: number) => {
              return (
                <Option key={i} value={option.value.toString()}>
                  {option.label}
                </Option>
              );
            })}
          </Select>
        </div>
      </ConfigProvider>
    );
  } else {
    return <></>;
  }
};

export default ConstructorSelect;
