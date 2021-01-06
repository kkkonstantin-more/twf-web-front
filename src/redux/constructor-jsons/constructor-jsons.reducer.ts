import {
  ConstructorJSONs,
  ConstructorJSONsActionTypes,
} from "./constructor-jsons.types";
import CONSTRUCTOR_JSONS_INITIAL_STATE from "./constructor-jsons.state";
import { convertInputStringListSeparatedByCommasToArray } from "./constructor-jsons.utils";

const constructorJSONsReducer = (
  state: ConstructorJSONs = CONSTRUCTOR_JSONS_INITIAL_STATE,
  action: ConstructorJSONsActionTypes
): ConstructorJSONs => {
  switch (action.type) {
    case "UPDATE_NAMESPACE_JSON":
      const { payload } = action;
      return {
        ...state,
        namespace: {
          ...payload,
          writeGrantedUsers: convertInputStringListSeparatedByCommasToArray(
            payload.writeGrantedUsers
          ),
          readGrantedUsers: convertInputStringListSeparatedByCommasToArray(
            payload.readGrantedUsers
          ),
        },
      };
    case "UPDATE_RULE_PACK_JSON":
      return {
        ...state,
        rulePack: action.payload,
      };
    case "UPDATE_TASK_SET_JSON":
      return {
        ...state,
        taskSet: action.payload,
      };
    default:
      return state;
  }
};

export default constructorJSONsReducer;
