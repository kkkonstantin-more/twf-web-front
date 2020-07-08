import { AppTabProps } from "../../copmonents/app-tab/app-tab";
import { AppTabType } from "../../types/app-tabs/AppTab";
import { UserAppTabFieldName } from "../../types/app-tabs/UserAppTab";
import { FetchedUsersData } from "./user-tabs.types";

export const filterFetchedUsersData = (
  fetchedGamesData: FetchedUsersData[]
): AppTabProps[] => {
  return fetchedGamesData.map((item: FetchedUsersData) => ({
    link: `/matify-players/${item.userCode}?login=${item.userLogin}&name=${item.userName}`,
    type: AppTabType.USER,
    fields: [
      {
        name: UserAppTabFieldName.userCode,
        value: item.userCode,
      },
      {
        name: UserAppTabFieldName.userLogin,
        value: item.userLogin,
      },
      {
        name: UserAppTabFieldName.rating,
        value: Math.round(item.rating),
      },
      {
        name: UserAppTabFieldName.userName,
        value: item.userName,
      },
      {
        name: UserAppTabFieldName.userFullName,
        value: item.userFullName,
      },
      {
        name: UserAppTabFieldName.levelsCompleted,
        value: item.levelsCount,
      },
      {
        name: UserAppTabFieldName.additionalInfo,
        value: item.additionalInfo,
      },
    ],
  }));
};
