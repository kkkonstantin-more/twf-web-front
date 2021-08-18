import {
  ConstructorJSONs,
  ConstructorJSONsActionTypes,
  ConstructorJSONType,
} from "./constructor-jsons.types";
import CONSTRUCTOR_JSONS_INITIAL_STATE from "./constructor-jsons.state";
import { convertInputStringListSeparatedByCommasToArray } from "./constructor-jsons.utils";
import { RuleConstructorInputs } from "../../constructors/rule-constructor/rule-constructor.types";
import { TaskConstructorInputs } from "../../constructors/task-constructor/task-constructor.types";

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

const convertStringBoolToBool = (
  value: "true" | "false" | boolean
): boolean => {
  return value === "true" || value === true;
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
        rulePack: action.payload,
      };
    case "UPDATE_TASK_SET_JSON":
      return {
        ...state,
        taskSet: {
          ...convertAllStringListsInObjToArrays(action.payload, [
            "subjectTypes",
            "rulePacks",
          ]),
          tasks: action.payload.tasks
            ? action.payload.tasks.map((task: TaskConstructorInputs) =>
                convertAllStringListsInObjToArrays(task, [
                  "rulePacks",
                  "subjectTypes",
                ])
              )
            : [],
        },
      };
    case "SET_JSON_VALIDITY":
      switch (action.payload.JSONType) {
        case ConstructorJSONType.NAMESPACE:
          return {
            ...state,
            isNamespaceJSONValid: action.payload.isValid,
            error: action.payload.error,
          };
        case ConstructorJSONType.RULE_PACK:
          return {
            ...state,
            isRulePackJSONValid: action.payload.isValid,
            error: action.payload.error,
          };
        case ConstructorJSONType.TASK_SET:
          return {
            ...state,
            isTaskSetJSONValid: action.payload.isValid,
            error: action.payload.error,
          };
      }
    default:
      return state;
  }
};

export default constructorJSONsReducer;
