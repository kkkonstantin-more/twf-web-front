import { Dispatch } from "react";
import { HistoryItem } from "../../constructors/task-constructor/task-constructor.component";
import {
  ConstructorHistoryItem,
  ExpressionChange,
} from "../../redux/constructor-history/constructor-history.types";
import { ConstructorJSONType } from "../../redux/constructor-jsons/constructor-jsons.types";

export interface ConstructorInputProps {
  name: string;
  type: string;
  disabled?: boolean;
  register?: (...args: any) => void;
  label?: string;
  isRendered?: boolean;
  isVisible?: boolean;
  defaultValue?: any;
  isExpressionInput?: boolean;
  onChange?: (value: string) => any;
  value?: any;
  // updateJSON?: () => void;
  addToHistory?: (oldVal: ExpressionChange, newVal: ExpressionChange) => void;
  constructorType: ConstructorJSONType;
}
