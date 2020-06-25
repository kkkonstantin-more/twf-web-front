import React from "react";
import { connect } from "react-redux";

import Sorter from "../sorter/sorter";

import { SorterProps } from "../sorter/sorter";
import Filter, { FilterProps } from "../filter/filter";

import "../app-tab/app-tab.scss";
import "./app-tab-header.scss";
import translate from "../../translations/translate";
import { AppTabFieldName, AppTabType } from "../../types/app-tabs/AppTab";
import { RootState } from "../../redux/root-reducer";
import { selectHiddenFieldsOfTabs } from "../../redux/hidden-fields/hidden-fields.selectors";

export interface AppTabHeaderField {
  name: AppTabFieldName;
  textId: string;
  withFilter: boolean;
  hidden?: boolean;
  // sorterProps?: SorterProps;
}

export interface AppTabHeaderProps {
  tabType: AppTabType;
  fields: AppTabHeaderField[];
  hiddenFieldsOfTabs?: any;
}

const AppTabHeader: React.FC<AppTabHeaderProps> = ({
  tabType,
  fields,
  hiddenFieldsOfTabs,
}) => {
  const fieldWidthPercent: string = 100 / fields.length + "%";
  const hiddenFields = hiddenFieldsOfTabs[tabType];

  return (
    <div className="app-tab app-tab-header">
      {fields
        .filter((field: AppTabHeaderField) => hiddenFields[field.name] !== true)
        .map((field: AppTabHeaderField, i: number) => {
          const { name, textId, withFilter, hidden } = field;
          return (
            !hidden && (
              <div
                key={i}
                style={{ width: fieldWidthPercent }}
                className="app-tab-header__item"
              >
                {translate(textId)}
                {/*{sorterProps && <Sorter {...sorterProps} />}*/}
                {withFilter && <Filter fieldName={name} tabType={tabType} />}
              </div>
            )
          );
        })}
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  hiddenFieldsOfTabs: selectHiddenFieldsOfTabs(state),
});

export default connect(mapStateToProps)(AppTabHeader);
