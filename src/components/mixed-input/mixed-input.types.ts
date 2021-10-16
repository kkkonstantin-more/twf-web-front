import React from "react";
import { MathInputFormat } from "../../utils/kotlin-lib-functions";

export interface MixedInputProps {
  format: MathInputFormat;
  expression: string;
  onChangeFormat?: (format: MathInputFormat) => void;
  onChangeExpression?: (value: string) => void;
  label?: string;
  style?: React.CSSProperties;
  isRendered?: boolean;
  isVisible?: boolean;
  width?: number;
}

export interface ModeTab {
  label: string;
  format: MathInputFormat;
}
