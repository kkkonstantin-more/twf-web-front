import { Dispatch } from "react";
import { HistoryItem } from "../../constructors/task-constructor/task-constructor.component";
import { ConstructorHistoryItem } from "../../redux/constructor-history/constructor-history.types";

export interface ConstructorInputProps {
  name: string;
  type: string;
  register?: (...args: any) => void;
  label?: string;
  isRendered?: boolean;
  isVisible?: boolean;
  defaultValue?: any;
  expressionInput?: boolean;
  updateJSON?: () => void;
  addToHistory?: (
    oldVal: ConstructorHistoryItem,
    newVal: ConstructorHistoryItem
  ) => void;
}
