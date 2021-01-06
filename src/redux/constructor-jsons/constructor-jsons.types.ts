import { NamespaceConstructorInputs } from "../../constructors/namespace-constructor/namespace-constructor.types";
import { TaskSetConstructorInputs } from "../../constructors/task-set-constructor/task-set-constructor.types";
import { RulePackConstructorInputs } from "../../constructors/rule-pack-constructor/rule-pack-constructor.types";
import { FetchedTaskSet } from "../../utils/constructors-requests/fetch-constructors.types";
import { NamespaceReceiveForm } from "../../utils/constructors-requests/namespace-request-handler";

export interface ConstructorJSONs {
  namespace: NamespaceConstructorInputs;
  taskSet: FetchedTaskSet;
  rulePack: RulePackConstructorInputs;
}

export enum ConstructorJSONsTypes {
  NAMESPACE = "NAMESPACE",
  TASK_SET = "TASK_SET",
  RULE_PACK = "RULE_PACK",
}

export type ConstructorInputs =
  | NamespaceConstructorInputs
  | FetchedTaskSet
  | RulePackConstructorInputs;

// actions
export const UPDATE_NAMESPACE_JSON = "UPDATE_NAMESPACE_JSON";
export const UPDATE_TASK_SET_JSON = "UPDATE_TASK_SET_JSON";
export const UPDATE_RULE_PACK_JSON = "UPDATE_RULE_PACK_JSON";

export interface UpdateNamespaceJSONAction {
  type: typeof UPDATE_NAMESPACE_JSON;
  payload: NamespaceConstructorInputs;
}

export interface UpdateTaskSetJSONAction {
  type: typeof UPDATE_TASK_SET_JSON;
  payload: FetchedTaskSet;
}

export interface UpdateRulePackJSONAction {
  type: typeof UPDATE_RULE_PACK_JSON;
  payload: RulePackConstructorInputs;
}

export type ConstructorJSONsActionTypes =
  | UpdateNamespaceJSONAction
  | UpdateTaskSetJSONAction
  | UpdateRulePackJSONAction;
