import React, { useState } from "react";
// redux
import { connect } from "react-redux";
import { selectHiddenFieldsOfTabs } from "../../redux/hidden-fields/hidden-fields.selectors";
import { toggleFieldHidden } from "../../redux/hidden-fields/hidden-fields.actions";
// types
import { RootState } from "../../redux/root-reducer";
import { AppTabType } from "../../types/app-tabs/AppTab";
import { GameAppTabFieldName } from "../../types/app-tabs/GameAppTab";
import { LevelAppTabFieldName } from "../../types/app-tabs/LevelAppTab";
import { UserAppTabFieldName } from "../../types/app-tabs/UserAppTab";

import "./filter.scss";

export interface FilterProps {
  tabType: AppTabType;
  fieldName: GameAppTabFieldName | LevelAppTabFieldName | UserAppTabFieldName;
  hiddenFieldsOfTabs: any;
  toggleFieldHidden: any;
}

const Filter: React.FC<FilterProps> = ({
  tabType,
  fieldName,
  hiddenFieldsOfTabs,
  toggleFieldHidden,
}) => {
  const [checked, setChecked] = useState<boolean>(
    !hiddenFieldsOfTabs[tabType][fieldName]
  );

  return (
    <div className="filter">
      <input
        type="checkbox"
        id={fieldName}
        checked={checked}
        onChange={() => {
          setChecked(!checked);
          toggleFieldHidden({ tabType, fieldName });
        }}
      />
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

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
