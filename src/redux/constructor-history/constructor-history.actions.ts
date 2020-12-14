import {
  ADD_MULTIPLE_LINES_CHANGE_TO_HISTORY,
  ADD_ONE_LINE_CHANGE_TO_HISTORY,
  AddMultipleLinesChangeToHistoryAction,
  AddOneLineChangeToHistoryAction,
  MultipleLinesHistoryChange,
  OneLineHistoryChange,
  REDO_TASK_SET_HISTORY,
  RedoTaskSetHistoryAction,
  UNDO_TASK_SET_HISTORY,
  UndoTaskSetHistoryAction,
  UPDATE_TASK_SET_HISTORY_INDEX,
  UpdateTaskSetHistoryIndexAction,
} from "./constructor-history.types";

export const addOneLineChangeToHistory = (
  item: OneLineHistoryChange
): AddOneLineChangeToHistoryAction => ({
  type: ADD_ONE_LINE_CHANGE_TO_HISTORY,
  payload: item,
});

export const addMultipleLinesChangeToHistory = (
  item: MultipleLinesHistoryChange
): AddMultipleLinesChangeToHistoryAction => ({
  type: ADD_MULTIPLE_LINES_CHANGE_TO_HISTORY,
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
