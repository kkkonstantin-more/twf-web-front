import {
  ConstructorJSONs,
  ConstructorJSONsActionTypes,
} from "./constructor-jsons.types";
import CONSTRUCTOR_JSONS_INITIAL_STATE from "./constructor-jsons.state";
import { convertInputStringListSeparatedByCommasToArray } from "./constructor-jsons.utils";
import { RuleConstructorInputs } from "../../constructors/rule-constructor/rule-constructor.types";

const convertAllStringListsInObjToArrays = (
  constructorValue: any,
  keys: string[]
): any => {
  const res = { ...constructorValue };
  keys.forEach((key: string) => {
    res[key] = convertInputStringListSeparatedByCommasToArray(res[key]);
  });
  return res;
};

const constructorJSONsReducer = (
  state: ConstructorJSONs = CONSTRUCTOR_JSONS_INITIAL_STATE,
  action: ConstructorJSONsActionTypes
): ConstructorJSONs => {
  switch (action.type) {
    case "UPDATE_NAMESPACE_JSON":
      return {
        ...state,
        namespace: convertAllStringListsInObjToArrays(action.payload, [
          "readGrantedUsers",
          "writeGrantedUsers",
        ]),
      };
    case "UPDATE_RULE_PACK_JSON":
      return {
        ...state,
        rulePack: {
          ...convertAllStringListsInObjToArrays(action.payload, ["rulePacks"]),
          rules: action.payload.rules?.map((rule: RuleConstructorInputs) => {
            return {
              ...rule,
              matchJumbledAndNested:
                rule.matchJumbledAndNested === "true" ||
                rule.matchJumbledAndNested === true,
              basedOnTaskContext:
                rule.basedOnTaskContext === "true" ||
                rule.matchJumbledAndNested === true,
            };
          }),
        },
      };
    case "UPDATE_TASK_SET_JSON":
      return {
        ...state,
        taskSet: convertAllStringListsInObjToArrays(action.payload, [
          "subjectTypes",
          "rulePacks",
        ]),
      };
    default:
      return state;
  }
};

export default constructorJSONsReducer;
