import { ConstructorInputs } from "../constructor-jsons/constructor-jsons.types";

export interface ExpressionChange {
  propertyPath: string;
  value: string;
}

export interface MultipleLinesHistoryChange {
  oldVal: ConstructorInputs;
  newVal: ConstructorInputs;
}

export interface OneLineHistoryChange {
  oldVal: ExpressionChange;
  newVal: ExpressionChange;
}

export type ConstructorHistoryItem =
  | {
      type: "ONE_LINE_CHANGE";
      item: ExpressionChange;
    }
  | {
      type: "MULTIPLE_LINES_CHANGE";
      item: ConstructorInputs;
    };

export interface ConstructorHistory {
  namespace: ConstructorHistoryItem[];
  rulePack: ConstructorHistoryItem[];
  taskSet: ConstructorHistoryItem[];
  taskSetIdx: number;
}

// actions
export const ADD_ONE_LINE_CHANGE_TO_HISTORY = "ADD_ONE_LINE_CHANGE_TO_HISTORY";
export const ADD_MULTIPLE_LINES_CHANGE_TO_HISTORY =
  "ADD_MULTIPLE_LINES_CHANGE_TO_HISTORY";
export const UPDATE_TASK_SET_HISTORY_INDEX = "UPDATE_TASK_SET_HISTORY_INDEX";
export const UNDO_TASK_SET_HISTORY = "UNDO_TASK_SET_HISTORY";
export const REDO_TASK_SET_HISTORY = "REDO_TASK_SET_HISTORY";

export interface AddOneLineChangeToHistoryAction {
  type: typeof ADD_ONE_LINE_CHANGE_TO_HISTORY;
  payload: OneLineHistoryChange;
}

export interface AddMultipleLinesChangeToHistoryAction {
  type: typeof ADD_MULTIPLE_LINES_CHANGE_TO_HISTORY;
  payload: MultipleLinesHistoryChange;
}

export interface UpdateTaskSetHistoryIndexAction {
  type: typeof UPDATE_TASK_SET_HISTORY_INDEX;
  payload: number;
}

export interface UndoTaskSetHistoryAction {
  type: typeof UNDO_TASK_SET_HISTORY;
}

export interface RedoTaskSetHistoryAction {
  type: typeof REDO_TASK_SET_HISTORY;
}

export type ConstructorHistoryActionTypes =
  | AddOneLineChangeToHistoryAction
  | AddMultipleLinesChangeToHistoryAction
  | UpdateTaskSetHistoryIndexAction
  | UndoTaskSetHistoryAction
  | RedoTaskSetHistoryAction;