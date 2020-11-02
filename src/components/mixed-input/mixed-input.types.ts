import React from "react";

export interface MixedInputProps {
  width?: string;
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: (value: string) => void;
  inputRef?: React.RefObject<HTMLInputElement>;
}
