import React from "react";

import "./filters-list.scss";

import Filter from "../../filter/filter";

export interface FiltersListItemProps {
  propertyName: string;
  translationTextId: string;
}

export interface FiltersListProps {
  array: any;
  stateSetter: React.Dispatch<any>;
  items: FiltersListItemProps[];
  className?: string;
}

const FiltersList: React.FC<FiltersListProps> = ({
  array,
  stateSetter,
  items,
  className,
}) => {
  return (
    <div className={`filters-list ${className}`}>
      {items.map((item, i) => {
        return (
          <Filter key={i} array={array} stateSetter={stateSetter} {...item} />
        );
      })}
    </div>
  );
};

export default FiltersList;
