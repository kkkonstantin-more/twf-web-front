import { ConstructorJSONType } from "../constructor-jsons/constructor-jsons.types";
import { ConstructorHistoryActionTypes } from "./constructor-history.types";

export const getConstructorTypeKey = (
  type: ConstructorJSONType
): "taskSet" | "rulePack" | "namespace" => {
  switch (type) {
    case ConstructorJSONType.TASK_SET:
      return "taskSet";
    case ConstructorJSONType.RULE_PACK:
      return "rulePack";
    case ConstructorJSONType.NAMESPACE:
      return "namespace";
  }
};

export const getIdxTypeKey = (
  type: ConstructorJSONType
): "taskSetIdx" | "rulePackIdx" | "namespaceIdx" => {
  switch (type) {
    case ConstructorJSONType.TASK_SET:
      return "taskSetIdx";
    case ConstructorJSONType.RULE_PACK:
      return "rulePackIdx";
    case ConstructorJSONType.NAMESPACE:
      return "namespaceIdx";
  }
};

export const getConstructorTypeFromHistoryAction = (
  action: ConstructorHistoryActionTypes
): ConstructorJSONType => {
  if (
    action.type === "ADD_ONE_LINE_CHANGE_TO_HISTORY" ||
    action.type === "ADD_MULTIPLE_LINES_CHANGE_TO_HISTORY"
  ) {
    return action.payload.constructorType;
  } else {
    return action.payload;
  }
};
