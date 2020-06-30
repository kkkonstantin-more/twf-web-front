import { combineReducers } from "redux";

import hiddenFieldsReducer from "./hidden-fields/hidden-fields.reducer";
import gameTabsReducer from "./game-tabs/game-tabs.reducer";
import levelTabsReducer from "./level-tabs/level-tabs.reducer";
import userTabsReducer from "./user-tabs/user-tabs.reducer";

const rootReducer = combineReducers({
  hiddenFields: hiddenFieldsReducer,
  gameTabs: gameTabsReducer,
  levelTabs: levelTabsReducer,
  userTabs: userTabsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
