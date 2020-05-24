import React, { useState } from "react";

import "./filter.scss";
import translate from "../translations/translate";

export interface FilterProps {
  array: any[];
  stateSetter: React.Dispatch<any[]>;
  propertyName: string;
  translationTextId: string;
}

const Filter: React.FC<FilterProps> = ({
  array,
  stateSetter,
  propertyName,
  translationTextId,
}) => {
  const [checked, setChecked] = useState<boolean>(true);
  const translationPrefix: string = "filter.";

  return (
    <div className="filter">
      <input
        type="checkbox"
        id={propertyName}
        checked={checked}
        onChange={() => {
          setChecked(!checked);
          const newState = [...array];
          newState.forEach((item) => {
            item[propertyName] = { ...item[propertyName], hidden: checked };
          });
          stateSetter(newState);
        }}
      />
      <label htmlFor={propertyName} className="ml-2">
        {translate(translationPrefix + translationTextId)}
      </label>
    </div>
  );
};

export default Filter;
