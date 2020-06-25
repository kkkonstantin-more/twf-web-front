import { createSelector } from "reselect";
import { RootState } from "../root-reducer";

const selectHiddenFields = (state: RootState) => state.hiddenFields;

export const selectHiddenFieldsOfTabs = createSelector(
  [selectHiddenFields],
  (hiddenFields) => hiddenFields
);
