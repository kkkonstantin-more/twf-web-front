import {
  ConstructorJSONs,
  ConstructorJSONsActionTypes,
} from "./constructor-jsons.types";
import CONSTRUCTOR_JSONS_INITIAL_STATE from "./constructor-jsons.state";

const constructorJSONsReducer = (
  state: ConstructorJSONs = CONSTRUCTOR_JSONS_INITIAL_STATE,
  action: ConstructorJSONsActionTypes
): ConstructorJSONs => {
  switch (action.type) {
    case "UPDATE_NAMESPACE_JSON":
      return {
        ...state,
        namespace: action.payload,
      };
    default:
      return state;
  }
};

export default constructorJSONsReducer;
