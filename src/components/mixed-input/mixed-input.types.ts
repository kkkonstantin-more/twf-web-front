import React from "react";

export interface MixedInputProps {
  inputRef: React.RefObject<HTMLInputElement>;
  width?: string;
  value?: string;
  onChange?: () => void;
}
