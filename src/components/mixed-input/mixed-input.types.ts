// libs
import React from "react";
// types
import { MathInputFormat } from "../../utils/kotlin-lib-functions";

export interface MixedInputProps {
  style?: React.CSSProperties;
  format?: MathInputFormat;
  expression?: string;
  onChangeExpression?: (value: string) => void;
  onChangeFormat?: (format: MathInputFormat) => void;
  onBlur?: (value: string) => void;
  expressionRef?: any;
}
