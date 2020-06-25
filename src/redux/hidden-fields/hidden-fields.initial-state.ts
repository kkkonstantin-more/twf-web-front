import { AppTabType } from "../../types/app-tabs/AppTab";
import { GameAppTabFieldName } from "../../types/app-tabs/GameAppTab";
import { LevelAppTabFieldName } from "../../types/app-tabs/LevelAppTab";
import { UserAppTabFieldName } from "../../types/app-tabs/UserAppTab";

const HIDDEN_FIELDS_INITIAL_STATE = {
  [AppTabType.GAME]: {
    [GameAppTabFieldName.gameName]: false,
    [GameAppTabFieldName.gameCode]: true,
    [GameAppTabFieldName.levelsCount]: false,
    [GameAppTabFieldName.usersCount]: false,
  },
  [AppTabType.LEVEL]: {
    [LevelAppTabFieldName.levelCode]: false,
    [LevelAppTabFieldName.gameName]: false,
    [LevelAppTabFieldName.difficulty]: false,
    [LevelAppTabFieldName.usersCount]: false,
  },
  [AppTabType.USER]: {
    [UserAppTabFieldName.userCode]: true,
    [UserAppTabFieldName.userLogin]: false,
    [UserAppTabFieldName.userName]: false,
    [UserAppTabFieldName.userFullName]: false,
    [UserAppTabFieldName.levelsCompleted]: false,
    [UserAppTabFieldName.additionalInfo]: false,
  },
};

export default HIDDEN_FIELDS_INITIAL_STATE;
