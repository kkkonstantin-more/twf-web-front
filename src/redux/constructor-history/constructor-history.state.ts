import { ConstructorHistory } from "./constructor-history.types";

const CONSTRUCTOR_HISTORY_INITIAL_STATE: ConstructorHistory = {
  namespace: [],
  rulePack: [],
  taskSet: [],
  taskSetIdx: -1,
};

export default CONSTRUCTOR_HISTORY_INITIAL_STATE;
