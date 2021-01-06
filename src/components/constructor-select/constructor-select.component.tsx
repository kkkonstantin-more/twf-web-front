// libs and hooks
import React, { useEffect, useState } from "react";
import useMergedRef from "@react-hook/merged-ref";
// lib components
import ruRu from "antd/lib/locale/ru_RU";
import { ConfigProvider, Select } from "antd";
// types
import { ConstructorSelectProps } from "./constructor-select.types";
import { LabeledValue } from "antd/es/select";
import { useFieldArray, useFormContext } from "react-hook-form";

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
  disabled = false,
}: ConstructorSelectProps): JSX.Element => {
  const { register, getValues, watch, setValue } = useFormContext();
  const value = watch(name, defaultValue);

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
    return value;
  };
  const [localValue, setLocalValue] = useState<any>(parseValue(value, isMulti));

  const mixedInputRef: React.RefObject<HTMLInputElement> = React.createRef();

  useEffect(() => {
    setLocalValue(parseValue(value, isMulti));
  }, [value]);

  if (isRendered) {
    return (
      <ConfigProvider locale={ruRu}>
        <div
          className="constructor-select-input u-mb-sm"
          style={{ display: isVisible ? "block" : "none" }}
        >
          <h4>{label}</h4>
          <input
            value={value}
            name={name}
            // eslint-disable-next-line react-hooks/rules-of-hooks
            ref={useMergedRef(register(), mixedInputRef)}
            style={{ display: "none" }}
          />
          <Select
            disabled={disabled}
            value={localValue}
            mode={isMulti ? "multiple" : undefined}
            style={{ width: "100%" }}
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
