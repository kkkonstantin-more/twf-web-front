export interface ConstructorHistoryItem {
  propertyPath: string;
  value: string;
}

export interface ConstructorHistoryItemUpdatePayload {
  oldVal: ConstructorHistoryItem;
  newVal: ConstructorHistoryItem;
}

export interface ConstructorHistory {
  namespace: ConstructorHistoryItem[];
  rulePack: ConstructorHistoryItem[];
  taskSet: ConstructorHistoryItem[];
  taskSetIdx: number;
}

// actions
export const ADD_ITEM_TO_TASK_SET_HISTORY = "ADD_ITEM_TO_TASK_SET_HISTORY";
export const UPDATE_TASK_SET_HISTORY_INDEX = "UPDATE_TASK_SET_HISTORY_INDEX";
export const UNDO_TASK_SET_HISTORY = "UNDO_TASK_SET_HISTORY";
export const REDO_TASK_SET_HISTORY = "REDO_TASK_SET_HISTORY";

export interface AddItemToTaskSetHistoryAction {
  type: typeof ADD_ITEM_TO_TASK_SET_HISTORY;
  payload: ConstructorHistoryItemUpdatePayload;
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
  | AddItemToTaskSetHistoryAction
  | UpdateTaskSetHistoryIndexAction
  | UndoTaskSetHistoryAction
  | RedoTaskSetHistoryAction;
