import React, { useState } from "react";

import "./filter.scss";
import { AppTabProps } from "../app-tab/app-tab";
import {
  AppTabHeaderFieldWithSorterProps,
  AppTabHeaderProps,
} from "../app-tab-header/app-tab-header";

export interface FilterProps {
  fieldName: string;
  tabs: AppTabProps[];
  // headerTabs: AppTabHeaderFieldWithSorterProps[];
  tabsStateSetter: React.Dispatch<AppTabProps[]>;
  // headerTabsStateSetter: React.Dispatch<AppTabHeaderFieldWithSorterProps[]>;
}

const Filter: React.FC<FilterProps> = ({
  fieldName,
  tabs,
  tabsStateSetter,
  // headerTabs,
  // headerTabsStateSetter,
}) => {
  const [checked, setChecked] = useState<boolean>(true);

  return (
    <div className="filter">
      <input
        type="checkbox"
        id={fieldName}
        checked={checked}
        onChange={() => {
          // console.log(array);
          setChecked(!checked);
          const newTabsState = [...tabs];
          newTabsState.forEach((item: AppTabProps) => {
            item.fields.forEach((field: any) => {
              if (field.name === fieldName) field.hidden = !field.hidden;
            });
            // item[fieldName] = { ...item[fieldName], hidden: checked };
          });
          tabsStateSetter(newTabsState);
          // const newHeaderTabsState = [...headerTabs];
          // newHeaderTabsState.forEach(
          //   (item: AppTabHeaderFieldWithSorterProps) => {
          //     if (item.fieldName === fieldName) item.hidden = !item.hidden;
          //   }
          // );
          // tabsStateSetter(newTabsState);
        }}
      />
    </div>
  );
};

export default Filter;
