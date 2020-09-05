import { createSelector } from "reselect";
import { RootState } from "../root-reducer";

const selectLevelsHiddenFields = (state: RootState) => state.levelsHiddenFields;

export const selectAllLevelsHiddenFields = createSelector(
  [selectLevelsHiddenFields],
  (hiddenFields) => hiddenFields
);

export const selectManualLevelsHiddenFields = createSelector(
  [selectLevelsHiddenFields],
  (hiddenFields) => hiddenFields.manualLevelsHiddenFields
);

export const selectAutoLevelsHiddenFields = createSelector(
  [selectLevelsHiddenFields],
  (hiddenFields) => hiddenFields.autoLevelsHiddenFields
);
