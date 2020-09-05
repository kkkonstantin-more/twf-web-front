// types
import { LevelsHiddenFieldsActionTypes } from "./levels-hidden-fields.types";
import HIDDEN_LEVELS_FIELDS_INITIAL_STATE from "./levels-hidden-fields.initial-state";

const levelsHiddenFieldsReducer = (
  state: any = HIDDEN_LEVELS_FIELDS_INITIAL_STATE,
  action: {
    type: LevelsHiddenFieldsActionTypes;
    payload: {
      fieldName: string;
    };
  }
) => {
  switch (action.type) {
    case LevelsHiddenFieldsActionTypes.TOGGLE_FIELD_VISIBILITY_FOR_ALL_AUTO_LEVELS:
      if (
        state.autoLevelsHiddenFields[action.payload.fieldName] !== undefined
      ) {
        return {
          ...state,
          autoLevelsHiddenFields: {
            ...state.autoLevelsHiddenFields,
            [action.payload.fieldName]: !state.autoLevelsHiddenFields[
              action.payload.fieldName
            ],
          },
        };
      } else {
        return state;
      }
    case LevelsHiddenFieldsActionTypes.TOGGLE_FIELD_VISIBILITY_FOR_ALL_MANUAL_LEVELS:
      console.log(action);
      if (
        state.manualLevelsHiddenFields[action.payload.fieldName] !== undefined
      ) {
        return {
          ...state,
          manualLevelsHiddenFields: {
            ...state.manualLevelsHiddenFields,
            [action.payload.fieldName]: !state.manualLevelsHiddenFields[
              action.payload.fieldName
            ],
          },
        };
      } else {
        return state;
      }
    default:
      return state;
  }
};

export default levelsHiddenFieldsReducer;
