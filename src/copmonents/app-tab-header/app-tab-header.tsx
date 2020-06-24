import React from "react";

import Sorter from "../sorter/sorter";

import { SorterProps } from "../sorter/sorter";
import Filter, { FilterProps } from "../filter/filter";

import "../app-tab/app-tab.scss";
import "./app-tab-header.scss";
import translate from "../../translations/translate";

export interface AppTabHeaderFieldWithSorterProps {
  fieldName: string;
  fieldTextId: string;
  sorterProps?: SorterProps;
  withFilter?: boolean;
  hidden?: boolean;
}

export interface AppTabHeaderProps {
  fieldsWithSorters: AppTabHeaderFieldWithSorterProps[];
}

const hideAppTabHeaderField = (fieldName: string): void => {};

const AppTabHeader: React.FC<AppTabHeaderProps> = ({ fieldsWithSorters }) => {
  const fieldWidthPercent: string = 100 / fieldsWithSorters.length + "%";

  return (
    <div className="app-tab app-tab-header">
      {fieldsWithSorters.map(
        (field: AppTabHeaderFieldWithSorterProps, i: number) => {
          const { fieldTextId, sorterProps, withFilter, hidden } = field;
          return (
            !hidden && (
              <div
                key={i}
                style={{ width: fieldWidthPercent }}
                className="app-tab-header__item"
              >
                {translate(fieldTextId)}
                {sorterProps && <Sorter {...sorterProps} />}
                {/*{withFilter && <Filter fieldName="fieldName" />}*/}
              </div>
            )
          );
        }
      )}
    </div>
  );
};

export default AppTabHeader;
