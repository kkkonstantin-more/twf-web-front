import { NamespaceConstructorInputs } from "../../constructors/namespace-constructor/namespace-constructor.types";
import {
  ConstructorJSONsActionTypes,
  UPDATE_NAMESPACE_JSON,
} from "./constructor-jsons.types";

export const updateNamespaceJSON = (
  namespaceJSON: NamespaceConstructorInputs
): ConstructorJSONsActionTypes => ({
  type: UPDATE_NAMESPACE_JSON,
  payload: namespaceJSON,
});
