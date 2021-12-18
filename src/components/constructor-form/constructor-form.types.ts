import { LabeledValue } from "antd/es/select";
import { ConstructorJSONType } from "../../redux/constructor-jsons/constructor-jsons.types";
import CSS from "csstype";

export interface ConstructorFormBaseInput {
  name: string;
  label: string;
  disabled?: boolean;
  isRendered?: boolean;
  isVisible?: boolean;
  width?: number;
  panel?: string;
}

export interface ConstructorFormDefaultInput extends ConstructorFormBaseInput{
  type: "text" | "number";
  isTextArea?: boolean;
}

export interface ConstructorFormSelectInput extends ConstructorFormBaseInput{
  options: LabeledValue[];
  isMulti: boolean;
  isTags?: boolean;
}

export interface ConstructorFormExpressionInput extends ConstructorFormBaseInput{
  isExpressionInput: true;
}

export interface ConstructorFormMultipleExpressionInput extends ConstructorFormBaseInput{
  isMultipleExpressionInput: true;
}

export interface ConstructorRulesInput extends ConstructorFormBaseInput{
  isRulesInput: true;
}

export type ConstructorFormInput =
  | ConstructorFormDefaultInput
  | ConstructorFormSelectInput
  | ConstructorFormExpressionInput
  | ConstructorFormMultipleExpressionInput
  | ConstructorRulesInput;

export interface ConstructorFormProps {
  inputs: ConstructorFormInput[];
  constructorType: ConstructorJSONType;
  showUndoRedoPanel?: boolean;
  style?: CSS.Properties;
  className?: string;
}
