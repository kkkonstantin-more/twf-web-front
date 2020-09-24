export interface SelectConstructorItemListItem {
  name: string;
  onClickAction: () => void;
  code?: string;
  namespace?: string;
}

export interface SelectConstructorItemListProps {
  items: SelectConstructorItemListItem[];
}

export type SearchKey = "namespace" | "code" | "name";
