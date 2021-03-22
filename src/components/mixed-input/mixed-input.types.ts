import React from "react";
import { MathInputFormat } from "../../utils/kotlin-lib-functions";

export interface MixedInputProps {
  style?: React.CSSProperties;
  format: MathInputFormat;
  expression: string;
  onChangeExpression?: (value: string) => void;
  onChangeFormat?: (format: MathInputFormat) => void;
}

export interface ModeTab {
  label: string;
  format: MathInputFormat;
}
