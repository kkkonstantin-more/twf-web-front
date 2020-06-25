import hiddenFieldsReducer from "./hidden-fields/hidden-fields.reducer";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
  hiddenFields: hiddenFieldsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
