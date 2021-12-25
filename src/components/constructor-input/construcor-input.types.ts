import { Dispatch } from "react";
import {
  ConstructorHistoryItem,
  ExpressionChange,
} from "../../redux/constructor-history/constructor-history.types";
import { ConstructorJSONType } from "../../redux/constructor-jsons/constructor-jsons.types";

export interface ConstructorInputProps {
  name: string;
  type: string;
  disabled?: boolean;
  label?: string;
  isRendered?: boolean;
  isVisible?: boolean;
  isExpressionInput?: boolean;
  onChange?: (value: string) => any;
  value?: any;
  isTextArea?: boolean;
  width?: number;
}
