import { combineReducers } from "redux";

import hiddenFieldsReducer from "./hidden-fields/hidden-fields.reducer";
import gameTabsReducer from "./game-tabs/game-tabs.reducer";
import levelTabsReducer from "./level-tabs/level-tabs.reducer";
import userTabsReducer from "./user-tabs/user-tabs.reducer";
import levelsHiddenFieldsReducer from "./levels-hidden-fields/levels-hidden-fields.reducer";
import constructorJSONsReducer from "./constructor-jsons/constructor-jsons.reducer";

const rootReducer = combineReducers({
  hiddenFields: hiddenFieldsReducer,
  levelsHiddenFields: levelsHiddenFieldsReducer,
  gameTabs: gameTabsReducer,
  levelTabs: levelTabsReducer,
  userTabs: userTabsReducer,
  constructorJSONS: constructorJSONsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
