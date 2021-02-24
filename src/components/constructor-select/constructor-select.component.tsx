// libs and hooks
import React, { useEffect, useState } from "react";
import useMergedRef from "@react-hook/merged-ref";
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
  defaultValue,
  isRendered = true,
  isVisible = true,
  disabled = false,
}: ConstructorSelectProps): JSX.Element => {
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

  const { register, watch } = useFormContext();

  const value = watch(name, defaultValue);

  const [localValue, setLocalValue] = useState<any>(parseValue(value, isMulti));

  const hiddenInputRef: React.RefObject<HTMLInputElement> = React.createRef();
  const selectRef: React.RefObject<any> = React.createRef();

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
            // value={value}
            name={name}
            // eslint-disable-next-line react-hooks/rules-of-hooks
            ref={useMergedRef(register(), hiddenInputRef)}
            style={{ display: "none" }}
          />
          <Select
            ref={selectRef}
            disabled={disabled}
            value={localValue}
            mode={isMulti ? "multiple" : undefined}
            style={{ width: "100%" }}
            onChange={(value: any) => {
              // add focus when deleting value in order to trigger dependent events in parent components
              // for example: form onBlur
              if (selectRef && selectRef.current) {
                selectRef.current.focus();
              }
              if (hiddenInputRef.current) {
                hiddenInputRef.current.value = value;
                setLocalValue(parseValue(value, isMulti));
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
