import React from "react";
import Sorter, { SorterProps } from "../sorter/sorter";
import "./sorters-list.scss";

export interface SortersListItemInterface {
  textId: string;
  propertyName: string;
  initialDescending: boolean;
}

export interface SortersListProps {
  state: {
    array: any[];
    stateSetter: React.Dispatch<any>;
  };
  items: SortersListItemInterface[];
  className?: string;
}

const SortersList: React.FC<SortersListProps> = ({
  state,
  items,
  className,
}) => {
  return (
    <div className={`sorters-list ${className}`}>
      {items.map((item, i: number) => {
        const props: SorterProps = {
          array: state.array,
          stateSetter: state.stateSetter,
          ...item,
        };
        return (
          <Sorter key={i} {...props}>
            {item.textId}
          </Sorter>
        );
      })}
    </div>
  );
};

export default SortersList;
