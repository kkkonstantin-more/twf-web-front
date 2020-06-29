import React, { useState } from "react";
import { connect } from "react-redux";

import Icon from "@mdi/react";
import { mdiArrowDownThick } from "@mdi/js";

import "./sorter.scss";
import {
  FetchGamesRequestData,
  GamesSortingProperty,
} from "../../redux/game-tabs/game-tabs.types";
import { MapDispatchToProps } from "react-redux";
import { fetchGameTabsStartAsync } from "../../redux/game-tabs/game-tabs.actions";
import { AppTabType } from "../../types/app-tabs/AppTab";
import {
  FetchLevelsRequestData,
  LevelsSortingProperty,
} from "../../redux/level-tabs/level-tabs.types";
import { fetchLevelTabsStartAsync } from "../../redux/level-tabs/level-tabs.actions";

export interface SorterProps {
  tabType: AppTabType;
  sortBy: GamesSortingProperty | LevelsSortingProperty;
  initialDescending: boolean;
  // redux props
  fetchGameTabsStartAsync?: any;
  fetchLevelTabsStartAsync?: any;
}

const Sorter: React.FC<SorterProps> = ({
  tabType,
  sortBy,
  initialDescending,
  // redux
  fetchGameTabsStartAsync,
  fetchLevelTabsStartAsync,
}) => {
  const [isDescending, setIsDescending] = useState<boolean>(initialDescending);

  return (
    <button
      className="sorter"
      onClick={() => {
        switch (tabType) {
          case AppTabType.GAME:
            fetchGameTabsStartAsync({
              gameCode: null,
              userCode: null,
              sortedBy: sortBy,
              descending: isDescending,
              offset: 0,
              limit: 10000,
            });
          case AppTabType.LEVEL:
            fetchLevelTabsStartAsync({
              userCode: null,
              gameCode: null,
              sortedBy: sortBy,
              descending: isDescending,
              offset: 0,
              limit: 10000,
            });
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

const mapDispatchToProps: MapDispatchToProps<any, any> = (dispatch: any) => ({
  fetchGameTabsStartAsync: (data: FetchGamesRequestData) =>
    dispatch(fetchGameTabsStartAsync(data)),
  fetchLevelTabsStartAsync: (data: FetchLevelsRequestData) =>
    dispatch(fetchLevelTabsStartAsync(data)),
});

export default connect(null, mapDispatchToProps)(Sorter);
