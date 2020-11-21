import { createSelector } from "reselect";
import { RootState } from "../root-reducer";
import { ConstructorHistory } from "./constructor-history.types";

const selectConstructorHistory = (state: RootState): ConstructorHistory => {
  return state.constructorHistory;
};

export const selectTaskSetHistory = createSelector(
  [selectConstructorHistory],
  (histories: ConstructorHistory) => histories.taskSet
);

export const selectTaskSetHistoryIndex = createSelector(
  [selectConstructorHistory],
  (histories: ConstructorHistory) => histories.taskSetIdx
);

export const selectCurrentTaskSetHistoryChange = createSelector(
  [selectConstructorHistory],
  (histories: ConstructorHistory) =>
    histories.taskSet.length > 0
      ? histories.taskSet[histories.taskSetIdx]
      : undefined
);
