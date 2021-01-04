import React from "react";
import { MathInputFormat } from "../../utils/kotlin-lib-functions";

export interface MixedInputProps {
  width?: string;
  value?: string;
  onChange?: (...args: any) => void;
  onBlur?: (value: string) => void;
  inputRef?: React.RefObject<HTMLInputElement>;
  formatRef?: React.RefObject<HTMLInputElement>;
  initialFormat?: MathInputFormat;
}
