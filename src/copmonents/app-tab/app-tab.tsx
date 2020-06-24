import React from "react";
import { Link } from "react-router-dom";

import "./app-tab.scss";

export interface AppTabField {
  name: string;
  value: string | number;
  hidden?: boolean;
}

export interface AppTabProps {
  link?: string;
  fields: AppTabField[];
}

const AppTab: React.FC<AppTabProps> = ({ link, fields }) => {
  const fieldWidthPercent: string =
    100 / fields.filter((field: AppTabField) => !field.hidden).length + "%";

  return (
    <Link
      to={link ? link : "#"}
      target={link ? "_blank" : ""}
      className="app-tab"
    >
      {fields
        .filter((field: AppTabField) => field.hidden !== true)
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

export default AppTab;
