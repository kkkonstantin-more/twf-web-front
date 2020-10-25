import React, { useEffect } from "react";
import { ConstructorSelectProps } from "./constructor-select.types";
import { Select } from "antd";
import { SelectValue } from "antd/lib/select";
import { LabeledValue } from "antd/es/select";

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

  // const parseBool = (value: string | boolean) => {
  //   switch (value) {
  //     case "true":
  //       return true;
  //     case "false":
  //       return false;
  //     case true:
  //       return "true";
  //     case false:
  //       return "false";
  //     default:
  //       return value;
  //   }
  // };

  if (isRendered) {
    return (
      <div
        className="constructor-select-input u-mb-sm"
        style={{ display: isVisible ? "block" : "none" }}
      >
        <h4>{label}</h4>
        <Select
          mode={isMulti ? "multiple" : undefined}
          defaultValue={defaultValue}
          style={{ width: "100%" }}
          placeholder={label}
          onChange={(value: SelectValue) => {
            if (setValue) {
              setValue(name, value);
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
    );
  } else {
    return <></>;
  }
};

export default ConstructorSelect;
