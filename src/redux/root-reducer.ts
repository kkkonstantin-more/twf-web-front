import { combineReducers } from "redux";

import hiddenFieldsReducer from "./hidden-fields/hidden-fields.reducer";
import gameTabsReducer from "./game-tabs/game-tabs.reducer";

const rootReducer = combineReducers({
  hiddenFields: hiddenFieldsReducer,
  gameTabs: gameTabsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
