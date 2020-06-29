import { AppTabProps } from "../../copmonents/app-tab/app-tab";
import { AppTabType } from "../../types/app-tabs/AppTab";
import { LevelAppTabFieldName } from "../../types/app-tabs/LevelAppTab";
import { FetchedLevelsData } from "./level-tabs.types";

export const filterFetchedLevelsData = (
  fetchedGamesData: FetchedLevelsData[]
): AppTabProps[] => {
  return fetchedGamesData.map((item: FetchedLevelsData) => ({
    link: "/matifygames/" + item.levelCode,
    type: AppTabType.LEVEL,
    fields: [
      {
        name: LevelAppTabFieldName.levelCode,
        value: item.levelCode,
      },
      {
        name: LevelAppTabFieldName.gameName,
        value: item.gameName,
      },
      {
        name: LevelAppTabFieldName.difficulty,
        value: item.difficulty,
      },
      {
        name: LevelAppTabFieldName.usersCount,
        value: item.usersCount,
      },
    ],
  }));
};
