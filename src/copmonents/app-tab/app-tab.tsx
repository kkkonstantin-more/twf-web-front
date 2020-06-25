import React from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";

import { AppTabFieldName, AppTabType } from "../../types/app-tabs/AppTab";

import "./app-tab.scss";
import { RootState } from "../../redux/root-reducer";
import { selectHiddenFieldsOfTabs } from "../../redux/hidden-fields/hidden-fields.selectors";

export interface AppTabField {
  name: AppTabFieldName;
  value: string | number;
  hidden?: boolean;
}

export interface AppTabProps {
  type: AppTabType;
  fields: AppTabField[];
  link?: string;
  hiddenFieldsOfTabs?: any;
}

const AppTab: React.FC<AppTabProps> = ({
  type,
  fields,
  link,
  hiddenFieldsOfTabs,
}) => {
  const fieldWidthPercent: string =
    100 / fields.filter((field: AppTabField) => !field.hidden).length + "%";
  const hiddenFields = hiddenFieldsOfTabs[type];

  return (
    <Link
      to={link ? link : "#"}
      target={link ? "_blank" : ""}
      className="app-tab"
    >
      {fields
        .filter((field: AppTabField) => hiddenFields[field.name] !== true)
        .map((field: AppTabField, i: number) => {
          const { value } = field;
          return (
            <div
              key={i}
              className="app-tab__item"
              style={{ width: fieldWidthPercent }}
            >
              {value}
            </div>
          );
        })}
    </Link>
  );
};

const mapStateToProps = (state: RootState) => ({
  hiddenFieldsOfTabs: selectHiddenFieldsOfTabs(state),
});

export default connect(mapStateToProps)(AppTab);
