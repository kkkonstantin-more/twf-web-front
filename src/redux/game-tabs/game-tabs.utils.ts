import { AppTabProps } from "../../components/app-tab/app-tab";
import { AppTabType } from "../../types/app-tabs/AppTab";
import { GameAppTabFieldName } from "../../types/app-tabs/GameAppTab";
import { FetchedGamesData } from "./game-tabs.types";

export const filterFetchedGamesData = (
  fetchedGamesData: FetchedGamesData[]
): AppTabProps[] => {
  return fetchedGamesData.map((item: FetchedGamesData) => ({
    link: "/matify-games/" + item.gameCode,
    type: AppTabType.GAME,
    fields: [
      {
        name: GameAppTabFieldName.gameName,
        value: item.gameName,
      },
      {
        name: GameAppTabFieldName.gameCode,
        value: item.gameCode,
      },
      {
        name: GameAppTabFieldName.levelsCount,
        value: item.levelsCount,
      },
      {
        name: GameAppTabFieldName.usersCount,
        value: item.usersCount,
      },
    ],
  }));
};
