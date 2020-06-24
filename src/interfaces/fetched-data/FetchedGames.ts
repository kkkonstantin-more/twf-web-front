interface FetchedGames {
  gameCode: string;
  gameName: string;
  levelsCount: number;
  usersCount: number;
}

export enum GamesSortingProperty {
  BY_GAME_NAME = "BY_GAME_NAME",
  BY_USERS_COUNT = "BY_USERS_COUNT",
  BY_LEVELS_COUNT = "BY_LEVELS_COUNT",
  NONE = "NONE",
}

export default FetchedGames;
