import React from "react";
import { connect } from "react-redux";

import Sorter from "../sorter/sorter";
import Filter from "../filter/filter";

import translate from "../../translations/translate";
import { AppTabFieldName, AppTabType } from "../../types/app-tabs/AppTab";
import { RootState } from "../../redux/root-reducer";
import { selectHiddenFieldsOfTabs } from "../../redux/hidden-fields/hidden-fields.selectors";
import { AppTabField } from "../app-tab/app-tab";

import HEADER_TABS_STATE from "../../redux/header-tabs/header-tabs.state";
import { GamesSortingProperty } from "../../redux/game-tabs/game-tabs.types";

import "../app-tab/app-tab.scss";
import "./app-tab-header.scss";

export interface AppTabHeaderField {
  name: AppTabFieldName;
  textId: string;
  withFilter?: boolean;
  withSorter?: GamesSortingProperty | null;
}

export interface AppTabHeaderProps {
  type: AppTabType;
  fields: AppTabHeaderField[];
  // redux props
  hiddenFieldsOfTabs?: any;
}

const AppTabHeader: React.FC<AppTabHeaderProps> = ({
  type,
  fields,
  hiddenFieldsOfTabs,
}) => {
  // getting hidden fields status of this specific tab
  const hiddenFieldsOfTab: { [fieldName: string]: boolean } =
    hiddenFieldsOfTabs[type];
  // creating arr of currently visible fields
  const visibleFields: AppTabHeaderField[] = fields.filter(
    (field: AppTabHeaderField) => {
      return !hiddenFieldsOfTab[field.name];
    }
  );
  // calculating even width for visible fields
  const fieldWidthPercent: string = 100 / visibleFields.length + "%";

  return (
    <div className="app-tab app-tab-header">
      {visibleFields.map((field: AppTabHeaderField, i: number) => {
        const { name, textId, withFilter, withSorter } = field;
        return (
          <div
            key={i}
            style={{ width: fieldWidthPercent }}
            className="app-tab-header__items"
          >
            <span className="app-tab-header__filter">
              {withFilter && <Filter tabType={type} fieldName={name} />}
            </span>
            <span className="app-tab-header__field-name">
              {translate(textId)}
            </span>
            <span className="app-tab-header__sorter">
              {withSorter && (
                <Sorter
                  tabType={type}
                  initialDescending={true}
                  sortBy={withSorter}
                />
              )}
            </span>
          </div>
        );
      })}
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  hiddenFieldsOfTabs: selectHiddenFieldsOfTabs(state),
});

export default connect(mapStateToProps)(AppTabHeader);
