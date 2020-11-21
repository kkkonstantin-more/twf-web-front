import {
  ADD_ITEM_TO_TASK_SET_HISTORY,
  AddItemToTaskSetHistoryAction,
  ConstructorHistoryItem,
  REDO_TASK_SET_HISTORY,
  RedoTaskSetHistoryAction,
  UNDO_TASK_SET_HISTORY,
  UndoTaskSetHistoryAction,
  UPDATE_TASK_SET_HISTORY_INDEX,
  UpdateTaskSetHistoryIndexAction,
} from "./constructor-history.types";

export const addItemToTaskSetHistory = (item: {
  oldVal: ConstructorHistoryItem;
  newVal: ConstructorHistoryItem;
}): AddItemToTaskSetHistoryAction => ({
  type: ADD_ITEM_TO_TASK_SET_HISTORY,
  payload: item,
});

export const updateTaskSetHistoryIndex = (
  idx: number
): UpdateTaskSetHistoryIndexAction => ({
  type: UPDATE_TASK_SET_HISTORY_INDEX,
  payload: idx,
});

export const undoTaskSetHistory = (): UndoTaskSetHistoryAction => ({
  type: UNDO_TASK_SET_HISTORY,
});

export const redoTaskSetHistory = (): RedoTaskSetHistoryAction => ({
  type: REDO_TASK_SET_HISTORY,
});
