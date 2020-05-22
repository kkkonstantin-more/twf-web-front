import React, { useState } from "react";
import translate from "../../translations/translate";

import { sortArrayOfObjectsByProperty } from "../../utils";

import Icon from "@mdi/react";
import { mdiArrowDownThick } from "@mdi/js";

import "./sorter.scss";

export interface SorterProps {
  array: any[];
  stateSetter: React.Dispatch<any[]>;
  propertyName: string;
  initialDescending: boolean;
  children?: any;
}

const Sorter: React.FC<SorterProps> = ({
  array,
  stateSetter,
  propertyName,
  initialDescending = true,
  children,
}) => {
  const [descending, setDescending] = useState<boolean>(initialDescending);

  return (
    <button
      onClick={() => {
        stateSetter([
          ...sortArrayOfObjectsByProperty(array, propertyName, descending),
        ]);
        setDescending(!descending);
      }}
      className="sorter"
    >
      {translate(`sorter.${children}`)}{" "}
      <Icon
        path={mdiArrowDownThick}
        className={`sorter__icon ${descending ? "" : "sorter__icon--rotated"}`}
      />
    </button>
  );
};

export default Sorter;
