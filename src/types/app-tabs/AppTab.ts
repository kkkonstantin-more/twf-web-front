import { GameAppTabFieldName } from "./GameAppTab";
import { LevelAppTabFieldName } from "./LevelAppTab";
import { UserAppTabFieldName } from "./UserAppTab";

export enum AppTabType {
  GAME = "GAME",
  LEVEL = "LEVEL",
  USER = "USER",
}

export type AppTabFieldName =
  | GameAppTabFieldName
  | LevelAppTabFieldName
  | UserAppTabFieldName;
