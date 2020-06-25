import React, { useState } from "react";

import Icon from "@mdi/react";
import { mdiArrowDownThick } from "@mdi/js";

import "./sorter.scss";

export interface SorterProps {
  sortAndUpdateState: (descending: boolean) => void;
  initialDescending: boolean;
}

const Sorter: React.FC<SorterProps> = ({
  sortAndUpdateState,
  initialDescending,
}) => {
  const [isDescending, setIsDescending] = useState<boolean>(initialDescending);

  return (
    <button
      className="sorter"
      onClick={() => {
        sortAndUpdateState(isDescending);
        setIsDescending(!isDescending);
      }}
    >
      <Icon
        path={mdiArrowDownThick}
        className={`sorter__icon ${
          isDescending ? "" : "sorter__icon--rotated"
        }`}
      />
    </button>
  );
};

export default Sorter;
