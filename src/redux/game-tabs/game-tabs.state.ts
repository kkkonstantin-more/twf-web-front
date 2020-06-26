import { GameTabsState } from "./game-tabs.types";

const GAME_TABS_INITIAL_STATE: GameTabsState = {
  tabs: null,
  isFetching: false,
  errorMessage: null,
};

export default GAME_TABS_INITIAL_STATE;
