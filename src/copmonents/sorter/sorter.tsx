import React, { useState } from "react";
// redux
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { fetchLevelTabsStartAsync } from "../../redux/level-tabs/level-tabs.actions";
import { selectLevelTabsPageSize } from "../../redux/level-tabs/level-tabs-selectors";
import { fetchUserTabsStartAsync } from "../../redux/user-tabs/user-tabs.actions";
import { selectUserTabsPageSize } from "../../redux/user-tabs/user-tabs.selectors";
import { fetchGameTabsStartAsync } from "../../redux/game-tabs/game-tabs.actions";
// types
import {
  FetchGamesRequestData,
  GamesSortingProperty,
} from "../../redux/game-tabs/game-tabs.types";
import {
  FetchUsersRequestData,
  UsersSortingProperty,
} from "../../redux/user-tabs/user-tabs.types";
import {
  FetchLevelsRequestData,
  LevelsSortingProperty,
} from "../../redux/level-tabs/level-tabs.types";
import { AppTabType } from "../../types/app-tabs/AppTab";
// icons
import Icon from "@mdi/react";
import { mdiArrowDownThick } from "@mdi/js";
// styles
import "./sorter.scss";

export interface SorterProps {
  tabType: AppTabType;
  sortBy:
    | GamesSortingProperty
    | LevelsSortingProperty
    | UsersSortingProperty
    | null;
  initialDescending: boolean;
  additionalRequestData?: {
    gameCode?: string;
    levelCode?: string;
    userCode?: string;
  };
  // redux props
  fetchGameTabsStartAsync?: any;
  fetchLevelTabsStartAsync?: any;
  fetchUserTabsStartAsync?: any;
  userTabsPageSize?: number;
  levelTabsPageSize?: number;
}

const Sorter: React.FC<SorterProps> = ({
  tabType,
  sortBy,
  initialDescending,
  // redux
  fetchGameTabsStartAsync,
  fetchLevelTabsStartAsync,
  fetchUserTabsStartAsync,
  additionalRequestData,
  userTabsPageSize,
  levelTabsPageSize,
}) => {
  const [isDescending, setIsDescending] = useState<boolean>(initialDescending);

  return (
    <button
      className="sorter"
      onClick={() => {
        switch (tabType) {
          case AppTabType.GAME:
            fetchGameTabsStartAsync({
              ...{
                gameCode: null,
                userCode: null,
                sortedBy: sortBy,
                descending: isDescending,
                offset: 0,
                limit: 10000,
              },
              ...additionalRequestData,
            });
            break;
          case AppTabType.LEVEL:
            fetchLevelTabsStartAsync({
              ...{
                userCode: null,
                gameCode: additionalRequestData?.gameCode || null,
                sortedBy: sortBy,
                descending: isDescending,
                offset: 0,
                limit: levelTabsPageSize,
              },
              ...additionalRequestData,
            });
            console.log(additionalRequestData?.gameCode);
            console.log(typeof additionalRequestData);
            break;
          case AppTabType.USER:
            fetchUserTabsStartAsync({
              ...{
                userCode: null,
                gameCode: null,
                sortedBy: sortBy,
                descending: isDescending,
                offset: 0,
                limit: userTabsPageSize,
              },
              ...additionalRequestData,
            });
            break;
        }
        setIsDescending(!isDescending);
      }}
    >
      <Icon
        path={mdiArrowDownThick}
        className={`sorter__icon ${
          isDescending ? "" : "sorter__icon--rotated"
        }`}
      />
    </button>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  fetchGameTabsStartAsync: (data: FetchGamesRequestData) =>
    dispatch(fetchGameTabsStartAsync(data)),
  fetchLevelTabsStartAsync: (data: FetchLevelsRequestData) =>
    dispatch(fetchLevelTabsStartAsync(data)),
  fetchUserTabsStartAsync: (data: FetchUsersRequestData) =>
    dispatch(fetchUserTabsStartAsync(data)),
});

const mapStateToProps = createStructuredSelector<any, any>({
  userTabsPageSize: selectUserTabsPageSize,
  levelTabsPageSize: selectLevelTabsPageSize,
});

export default connect(mapStateToProps, mapDispatchToProps)(Sorter);
