import { LabeledValue } from "antd/es/select";
import { ConstructorJSONType } from "../../redux/constructor-jsons/constructor-jsons.types";
import CSS from "csstype";

export interface ConstructorFormDefaultInput {
  name: string;
  type: "text" | "number";
  label: string;
  disabled?: boolean;
  isRendered?: boolean;
  isVisible?: boolean;
  isTextArea?: boolean;
}

export interface ConstructorFormSelectInput {
  name: string;
  label: string;
  options: LabeledValue[];
  isMulti: boolean;
  disabled?: boolean;
  isRendered?: boolean;
  isVisible?: boolean;
}

export interface ConstructorFormExpressionInput {
  name: string;
  label: string;
  isExpressionInput: true;
  disabled?: boolean;
  isRendered?: boolean;
  isVisible?: boolean;
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
