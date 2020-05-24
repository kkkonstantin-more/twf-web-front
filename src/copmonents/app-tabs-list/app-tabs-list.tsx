import React from "react";

import AppTab from "../app-tab/app-tab";

import { AppTabProps } from "../app-tab/app-tab";

import "./app-tabs-list.scss";

const AppTabsList: React.FC<{ tabs: AppTabProps[] }> = ({ tabs }) => {
  return (
    <div className="app-tabs-list">
      {tabs.map((tab: AppTabProps, i: number) => (
        <AppTab {...tab} />
      ))}
    </div>
  );
};

export default AppTabsList;
