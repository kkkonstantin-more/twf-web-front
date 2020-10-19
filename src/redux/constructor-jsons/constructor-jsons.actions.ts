// types
import { NamespaceConstructorInputs } from "../../constructors/namespace-constructor/namespace-constructor.types";
import {
  UPDATE_NAMESPACE_JSON,
  UPDATE_RULE_PACK_JSON,
  UPDATE_TASK_SET_JSON,
  UpdateNamespaceJSONAction,
  UpdateRulePackJSONAction,
  UpdateTaskSetJSONAction,
} from "./constructor-jsons.types";
import { TaskSetConstructorInputs } from "../../constructors/task-set-constructor/task-set-constructor.types";
import { RulePackConstructorInputs } from "../../constructors/rule-pack-constructor/rule-pack-constructor.types";

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
