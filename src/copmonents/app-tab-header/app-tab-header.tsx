import React from "react";
import translate from "../../translations/translate";
// redux
import { connect } from "react-redux";
import { selectHiddenFieldsOfTabs } from "../../redux/hidden-fields/hidden-fields.selectors";
import { toggleFieldHidden } from "../../redux/hidden-fields/hidden-fields.actions";

import Sorter from "../sorter/sorter";

import { Dropdown } from "react-bootstrap";
// types
import { AppTabFieldName, AppTabType } from "../../types/app-tabs/AppTab";
import { RootState } from "../../redux/root-reducer";
import { GamesSortingProperty } from "../../redux/game-tabs/game-tabs.types";
import { LevelsSortingProperty } from "../../redux/level-tabs/level-tabs.types";
import { UsersSortingProperty } from "../../redux/user-tabs/user-tabs.types";
// using app-tab styles combined with custom styles
import "../app-tab/app-tab.scss";
import "./app-tab-header.scss";

export interface AppTabHeaderField {
  name: AppTabFieldName;
  textId: string;
  withFilter?: boolean;
  withSorter?:
    | GamesSortingProperty
    | LevelsSortingProperty
    | UsersSortingProperty
    | null;
}

export interface AppTabHeaderProps {
  type: AppTabType;
  fields: AppTabHeaderField[];
  // redux props
  hiddenFieldsOfTabs?: any;
  toggleFieldHidden?: any;
}

const AppTabHeader: React.FC<AppTabHeaderProps> = ({
  type,
  fields,
  // redux props
  hiddenFieldsOfTabs,
  toggleFieldHidden,
}) => {
  // getting hidden fields status of this specific tab
  const hiddenFieldsOfTab: { [fieldName: string]: boolean } =
    hiddenFieldsOfTabs[type];
  // separating visible and invisible fields
  const invisibleFields: AppTabHeaderField[] = [];
  const visibleFields: AppTabHeaderField[] = [];
  fields.forEach((field: AppTabHeaderField) => {
    hiddenFieldsOfTab[field.name]
      ? invisibleFields.push(field)
      : visibleFields.push(field);
  });
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
              {withFilter && (
                <input
                  type="checkbox"
                  id={name}
                  checked={true}
                  onClick={() => {
                    toggleFieldHidden({ tabType: type, fieldName: name });
                  }}
                />
              )}
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
      {/*hidden fields dropdown*/}
      {invisibleFields.length !== 0 && (
        <div className="app-tab-header__hidden-fields-dropdown">
          <Dropdown>
            <Dropdown.Toggle id="dropdown" />
            <Dropdown.Menu>
              {invisibleFields.map((field: AppTabHeaderField) => {
                const { textId, name } = field;
                return (
                  <Dropdown.Item
                    onClick={() =>
                      toggleFieldHidden({ tabType: type, fieldName: name })
                    }
                  >
                    {translate(textId)}
                  </Dropdown.Item>
                );
              })}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  hiddenFieldsOfTabs: selectHiddenFieldsOfTabs(state),
});

const mapDispatchToProps = (dispatch: any) => ({
  toggleFieldHidden: (tabTypeAndFieldName: any) =>
    dispatch(toggleFieldHidden(tabTypeAndFieldName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppTabHeader);
