import React from "react";
import { ConstructorInputProps } from "./construcor-input.types";

const ConstructorInput = ({
  label,
  name,
  type,
  onBlur,
  register,
  isVisible = true,
  isRendered = true,
}: ConstructorInputProps): JSX.Element => {
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
            onBlur={onBlur}
            ref={register}
          />
        </div>
      </div>
    );
  } else {
    return <></>;
  }
};

export default ConstructorInput;
