// libs and hooks
import React from "react";
import useMergedRef from "@react-hook/merged-ref";
// lib components
import ruRu from "antd/lib/locale/ru_RU";
import { ConfigProvider, Select } from "antd";
// types
import { ConstructorSelectProps } from "./constructor-select.types";
import { LabeledValue } from "antd/es/select";
import { useFormContext } from "react-hook-form";

const { Option } = Select;

const ConstructorSelect = ({
  name,
  label,
  options,
  isMulti,
  defaultValue,
  updateJSON,
  isRendered = true,
  isVisible = true,
}: ConstructorSelectProps): JSX.Element => {
  const { register, getValues, watch } = useFormContext();
  const parseValue = (
    value: string | number | string[] | undefined,
    isMulti: boolean
  ) => {
    if (typeof value === "undefined") {
      return isMulti ? [] : "";
    }
    if (value === "") {
      return isMulti ? [] : undefined;
    }
    if (typeof value === "string") {
      return value.includes(",") ? value.split(",") : value;
    }
    if (Array.isArray(value)) {
      return value.join(",");
    }
    return value;
  };

  const mixedInputRef: React.RefObject<HTMLInputElement> = React.createRef();

  if (isRendered) {
    return (
      <ConfigProvider locale={ruRu}>
        <div
          className="constructor-select-input u-mb-sm"
          style={{ display: isVisible ? "block" : "none" }}
        >
          <h4>{label}</h4>
          <input
            defaultValue={defaultValue}
            name={name}
            // eslint-disable-next-line react-hooks/rules-of-hooks
            ref={useMergedRef(register(), mixedInputRef)}
            style={{ display: "none" }}
          />
          <Select
            mode={isMulti ? "multiple" : undefined}
            defaultValue={parseValue(defaultValue, isMulti)}
            style={{ width: "100%" }}
            placeholder={label}
            onChange={(value: any) => {
              if (mixedInputRef.current) {
                mixedInputRef.current.value = value;
              }
              if (updateJSON) {
                updateJSON();
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
