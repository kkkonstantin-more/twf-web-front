import { combineReducers } from "redux";

import hiddenFieldsReducer from "./hidden-fields/hidden-fields.reducer";
import gameTabsReducer from "./game-tabs/game-tabs.reducer";
import levelTabsReducer from "./level-tabs/level-tabs.reducer";

const rootReducer = combineReducers({
  hiddenFields: hiddenFieldsReducer,
  gameTabs: gameTabsReducer,
  levelTabs: levelTabsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
