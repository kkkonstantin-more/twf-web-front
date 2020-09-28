export interface FilterableSelectListItem {
  name: string;
  onSelect: () => void;
  [anotherProp: string]: any;
}

export interface FilterableSelectListProps {
  items: FilterableSelectListItem[];
  propsToFilter: string[];
}

export interface FilterableSelectListSortTokens {
  [filterProperty: string]: string[];
}
