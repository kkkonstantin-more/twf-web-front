import HIDDEN_FIELDS_INITIAL_STATE from "./hidden-fields.initial-state";
// types
import { HiddenFieldsTypes } from "./hidden-fields.types";
import { AppTabFieldName, AppTabType } from "../../types/app-tabs/AppTab";

const hiddenFieldsReducer = (
  state: any = HIDDEN_FIELDS_INITIAL_STATE,
  action: {
    type: HiddenFieldsTypes;
    payload: {
      tabType: AppTabType;
      fieldName: AppTabFieldName;
    };
  }
) => {
  switch (action.type) {
    case HiddenFieldsTypes.TOGGLE_FIELD_HIDDEN:
      const { tabType, fieldName } = action.payload;
      return {
        ...state,
        [tabType]: {
          ...state[tabType],
          [fieldName]: !state[tabType][fieldName],
        },
      };
    default:
      return state;
  }
};

export default hiddenFieldsReducer;
