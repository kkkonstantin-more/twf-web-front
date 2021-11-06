import { LabeledValue } from "antd/es/select";
import { ConstructorJSONType } from "../../redux/constructor-jsons/constructor-jsons.types";
import CSS from "csstype";

export interface ConstructorFormBase {
  name: string;
  label: string;
  disabled?: boolean;
  isRendered?: boolean;
  isVisible?: boolean;
  width?: number;
  panel?: string;
}

export interface ConstructorFormDefaultInput extends ConstructorFormBase{
  type: "text" | "number";
  isTextArea?: boolean;
}

export interface ConstructorFormSelectInput extends ConstructorFormBase{
  options: LabeledValue[];
  isMulti: boolean;
  isTags?: boolean;
}

export interface ConstructorFormExpressionInput extends ConstructorFormBase{
  isExpressionInput: true;
}

export type ConstructorFormInput =
  | ConstructorFormDefaultInput
  | ConstructorFormSelectInput
  | ConstructorFormExpressionInput;

export interface ConstructorFormProps {
  inputs: ConstructorFormInput[];
  constructorType: ConstructorJSONType;
  showUndoRedoPanel?: boolean;
  style?: CSS.Properties;
  className?: string;
}
