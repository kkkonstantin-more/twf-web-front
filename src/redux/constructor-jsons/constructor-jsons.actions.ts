// types
import { NamespaceConstructorInputs } from "../../constructors/namespace-constructor/namespace-constructor.types";
import {
  ConstructorInputs,
  ConstructorJSONType,
  SET_JSON_VALIDITY,
  SetJSONValidityAction,
  UPDATE_NAMESPACE_JSON,
  UPDATE_RULE_PACK_JSON,
  UPDATE_TASK_SET_JSON,
  UpdateNamespaceJSONAction,
  UpdateRulePackJSONAction,
  UpdateTaskSetJSONAction,
} from "./constructor-jsons.types";
import { TaskSetConstructorInputs } from "../../constructors/task-set-constructor/task-set-constructor.types";
import { RulePackConstructorInputs } from "../../constructors/rule-pack-constructor/rule-pack-constructor.types";

export const updateConstructorJSON = (
  constructorType: ConstructorJSONType,
  JSON: ConstructorInputs
) => {
  const type = (() => {
    switch (constructorType) {
      case ConstructorJSONType.NAMESPACE:
        return UPDATE_NAMESPACE_JSON;
      case ConstructorJSONType.RULE_PACK:
        return UPDATE_RULE_PACK_JSON;
      case ConstructorJSONType.TASK_SET:
        return UPDATE_TASK_SET_JSON;
    }
  })();
  return {
    type,
    payload: JSON,
  };
};

export const updateNamespaceJSON = (
  namespaceJSON: NamespaceConstructorInputs
): UpdateNamespaceJSONAction => ({
  type: UPDATE_NAMESPACE_JSON,
  payload: namespaceJSON,
});

export const updateTaskSetJSON = (
  taskSetJSON: TaskSetConstructorInputs
): UpdateTaskSetJSONAction => ({
  type: UPDATE_TASK_SET_JSON,
  payload: taskSetJSON,
});

export const updateRulePackJSON = (
  rulePackJSON: RulePackConstructorInputs
): UpdateRulePackJSONAction => ({
  type: UPDATE_RULE_PACK_JSON,
  payload: rulePackJSON,
});

export const setJSONValidity = (
  JSONType: ConstructorJSONType,
  isValid: boolean,
  error: string
): SetJSONValidityAction => ({
  type: SET_JSON_VALIDITY,
  payload: {
    JSONType,
    isValid,
    error
  },
});
