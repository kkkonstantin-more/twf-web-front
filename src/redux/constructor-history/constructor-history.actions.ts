// types
import { ConstructorJSONType } from "../constructor-jsons/constructor-jsons.types";
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

export const undoHistory = (
  constructorType: ConstructorJSONType
): UndoTaskSetHistoryAction => ({
  type: UNDO_HISTORY,
  payload: constructorType,
});

export const redoHistory = (
  constructorType: ConstructorJSONType
): RedoTaskSetHistoryAction => ({
  type: REDO_HISTORY,
  payload: constructorType,
});
