import React, { useEffect } from "react";
import { ConstructorSelectProps } from "./constructor-select.types";
import { ConfigProvider, Select } from "antd";
import { LabeledValue } from "antd/es/select";
import ruRu from "antd/lib/locale/ru_RU";

const { Option } = Select;

const ConstructorSelect = ({
  name,
  label,
  options,
  isMulti,
  defaultValue,
  register,
  setValue,
  updateJSON,
  isRendered = true,
  isVisible = true,
}: ConstructorSelectProps): JSX.Element => {
  useEffect(() => {
    register({ name });
  }, []);

  const parseBool = (value: any) => {
    switch (value) {
      case "true":
        return true;
      case "false":
        return false;
      case true:
        return "true";
      case false:
        return "false";
      default:
        return value;
    }
  };

  const parseValue = (
    value: string | number | string[] | undefined,
    isMulti: boolean
  ) => {
    value = parseBool(value);
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

  if (isRendered) {
    return (
      <ConfigProvider locale={ruRu}>
        <div
          className="constructor-select-input u-mb-sm"
          style={{ display: isVisible ? "block" : "none" }}
        >
          <h4>{label}</h4>
          <Select
            mode={isMulti ? "multiple" : undefined}
            defaultValue={parseValue(defaultValue, isMulti)}
            style={{ width: "100%" }}
            placeholder={label}
            onChange={(value: any) => {
              if (setValue) {
                setValue(name, parseValue(value, isMulti));
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
