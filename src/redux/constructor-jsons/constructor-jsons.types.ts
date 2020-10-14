import { NamespaceConstructorInputs } from "../../constructors/namespace-constructor/namespace-constructor.types";
import { TaskSetConstructorInputs } from "../../constructors/task-set-constructor/task-set-constructor.types";
import { RuleConstructorInputs } from "../../constructors/rule-constructor/rule-constructor.types";

export interface ConstructorJSONs {
  namespace: NamespaceConstructorInputs;
  // taskSet: TaskSetConstructorInputs;
  // rule: RuleConstructorInputs;
}

// actions
export const UPDATE_NAMESPACE_JSON = "UPDATE_NAMESPACE_JSON";

export interface UpdateNamespaceJSONAction {
  type: typeof UPDATE_NAMESPACE_JSON;
  payload: NamespaceConstructorInputs;
}

export type ConstructorJSONsActionTypes = UpdateNamespaceJSONAction;
