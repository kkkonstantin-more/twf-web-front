import React, { useState } from "react";
import Select from "react-select";
import { ConstructorSelectProps } from "./constructor-select.types";
import { Controller } from "react-hook-form";

const ConstructorSelect = ({
  name,
  label,
  options,
  isMulti,
  defaultValue,
  register,
  control,
  onBlur,
  isRendered = true,
  isVisible = true,
}: ConstructorSelectProps): JSX.Element => {
  if (isRendered) {
    return (
      <div
        className="constructor-select-input"
        style={{ display: isVisible ? "block" : "none" }}
      >
        <div className="form-group">
          <label>{label}</label>
          <Controller
            control={control}
            name={name}
            render={({ onChange }) => (
              <Select
                name={name}
                options={options}
                ref={register}
                onChange={(e: any) => {
                  onChange(e);
                  if (onBlur) {
                    onBlur();
                  }
                }}
                isMulti={isMulti}
                defaultValue={defaultValue}
              />
            )}
          />
        </div>
      </div>
    );
  } else {
    return <></>;
  }
};

export default ConstructorSelect;
