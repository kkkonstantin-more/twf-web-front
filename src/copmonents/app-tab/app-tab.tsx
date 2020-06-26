import React from "react";
import { Link } from "react-router-dom";
// redux
import { connect } from "react-redux";
import { selectHiddenFieldsOfTabs } from "../../redux/hidden-fields/hidden-fields.selectors";
// types
import { AppTabFieldName, AppTabType } from "../../types/app-tabs/AppTab";
import { RootState } from "../../redux/root-reducer";

import "./app-tab.scss";

export interface AppTabField {
  name: AppTabFieldName;
  value: string | number;
}

export interface AppTabProps {
  type: AppTabType;
  fields: AppTabField[];
  link?: string;
  // redux props
  hiddenFieldsOfTabs?: any;
}

const AppTab: React.FC<AppTabProps> = ({
  type,
  fields,
  link,
  hiddenFieldsOfTabs,
}) => {
  // getting hidden fields status of this specific tab
  const hiddenFieldsOfTab: { [fieldName: string]: boolean } =
    hiddenFieldsOfTabs[type];
  // calculating even width for visible fields
  const fieldWidthPercent: string =
    100 /
      fields.filter((field: AppTabField) => {
        return !hiddenFieldsOfTab[field.name];
      }).length +
    "%";

  return (
    <Link
      to={link ? link : "#"}
      target={link ? "_blank" : ""}
      className="app-tab"
    >
      {fields
        .filter((field: AppTabField) => !hiddenFieldsOfTab[field.name])
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
