import {
  ADD_MULTIPLE_LINES_CHANGE_TO_HISTORY,
  ADD_ONE_LINE_CHANGE_TO_HISTORY,
  AddMultipleLinesChangeToHistoryAction,
  AddOneLineChangeToHistoryAction,
  MultipleLinesHistoryChange,
  OneLineHistoryChange,
  REDO_HISTORY,
  RedoTaskSetHistoryAction,
  UNDO_HISTORY,
  UndoTaskSetHistoryAction,
  UPDATE_HISTORY_INDEX,
  UpdateTaskSetHistoryIndexAction,
} from "./constructor-history.types";
import { ConstructorType } from "../../pages/constructor-page/constructor-page.types";

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

// export const updateTaskSetHistoryIndex = (
//   idx: number
// ): UpdateTaskSetHistoryIndexAction => ({
//   type: UPDATE_TASK_SET_HISTORY_INDEX,
//   payload: idx,
// });

export const undoHistory = (
  constructorType: ConstructorType
): UndoTaskSetHistoryAction => ({
  type: UNDO_HISTORY,
  payload: constructorType,
});

export const redoHistory = (
  constructorType: ConstructorType
): RedoTaskSetHistoryAction => ({
  type: REDO_HISTORY,
  payload: constructorType,
});
