import { createSelector } from "reselect";
import { RootState } from "../root-reducer";
import { ConstructorJSONs } from "./constructor-jsons.types";

const selectConstructorJSONs = (state: RootState): ConstructorJSONs => {
  return state.constructorJSONS;
};

export const selectNamespaceJSON = createSelector(
  [selectConstructorJSONs],
  (JSONs: ConstructorJSONs) => JSONs.namespace
);

export const selectRulePackJSON = createSelector(
  [selectConstructorJSONs],
  (JSONs: ConstructorJSONs) => JSONs.rulePack
);

export const selectTaskSetJSON = createSelector(
  [selectConstructorJSONs],
  (JSONs: ConstructorJSONs) => JSONs.taskSet
);
