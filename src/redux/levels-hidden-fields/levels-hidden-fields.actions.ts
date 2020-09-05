import { LevelsHiddenFieldsActionTypes } from "./levels-hidden-fields.types";

export const toggleFieldVisibilityForAllManualLevels = (fieldName: string) => ({
  type:
    LevelsHiddenFieldsActionTypes.TOGGLE_FIELD_VISIBILITY_FOR_ALL_MANUAL_LEVELS,
  payload: { fieldName },
});

export const toggleFieldVisibilityForAllAutoLevels = (fieldName: string) => ({
  type:
    LevelsHiddenFieldsActionTypes.TOGGLE_FIELD_VISIBILITY_FOR_ALL_AUTO_LEVELS,
  payload: { fieldName },
});
