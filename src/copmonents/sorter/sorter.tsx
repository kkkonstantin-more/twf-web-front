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

export interface SorterProps {
  tabType: AppTabType;
  sortBy: GamesSortingProperty;
  initialDescending: boolean;
  // redux props
  fetchGameTabsStartAsync?: any;
}

const Sorter: React.FC<SorterProps> = ({
  tabType,
  sortBy,
  initialDescending,
  fetchGameTabsStartAsync,
}) => {
  const [isDescending, setIsDescending] = useState<boolean>(initialDescending);

  return (
    <button
      className="sorter"
      onClick={() => {
        fetchGameTabsStartAsync({
          gameCode: null,
          userCode: null,
          sortedBy: sortBy,
          descending: isDescending,
          offset: 0,
          limit: 10000,
        });
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
});

export default connect(null, mapDispatchToProps)(Sorter);
