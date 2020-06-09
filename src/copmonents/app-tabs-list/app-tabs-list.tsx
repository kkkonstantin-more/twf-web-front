import React from "react";
import { injectIntl } from "react-intl";

import AppTab from "../app-tab/app-tab";

import { AppTabProps } from "../app-tab/app-tab";

import "./app-tabs-list.scss";

const AppTabsList: React.FC<{ tabs: AppTabProps[]; intl: any }> = ({
  tabs,
  intl,
}) => {
  let headerTab: AppTabProps = {};
  if (tabs[0]) {
    Object.keys(tabs[0]).forEach((key) => {
      headerTab[key] = {
        value: intl.formatMessage({ id: "appTab." + key }),
      };
    });
    headerTab["header"] = { value: "header" };
  }
  return (
    <div className="app-tabs-list">
      {Object.keys(headerTab).length !== 0 && <AppTab {...headerTab} />}
      {tabs.map((tab: AppTabProps, i: number) => (
        <AppTab {...tab} />
      ))}
    </div>
  );
};

export default injectIntl(AppTabsList);
