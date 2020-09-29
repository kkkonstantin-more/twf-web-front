import {
  FilterableSelectListItem,
  FilterableSelectListSortTokens,
} from "./filterable-select-list.types";

export const getSortTokensFromItems = (
  items: FilterableSelectListItem[],
  propsToFilter: string[]
): FilterableSelectListSortTokens => {
  return Object.fromEntries(
    propsToFilter.map((filterProp: string) => {
      return [
        filterProp,
        items
          .reduce((acc: string[], item: FilterableSelectListItem): string[] => {
            return Array.isArray(item[filterProp])
              ? acc.concat(item[filterProp])
              : [...acc, item[filterProp]];
          }, [])
          .filter(
            (item: string, i: number, arr: string[]) => arr.indexOf(item) === i
          ),
      ];
    })
  );
};

export const getSelectedItems = (
  allItems: FilterableSelectListItem[],
  selectedSortTokens: FilterableSelectListSortTokens
): FilterableSelectListItem[] => {
  return allItems.filter((item: FilterableSelectListItem) => {
    return Object.keys(selectedSortTokens)
      .filter((token: string) => selectedSortTokens[token].length !== 0)
      .every((token: string) => {
        return Array.isArray(item[token])
          ? item[token].some((val: string) => {
              return selectedSortTokens[token].includes(val);
            })
          : selectedSortTokens[token].includes(item[token]);
      });
  });
};

export const isItemPropMatchingSearch = (
  itemPropValue: string | [],
  inputValue: string
): boolean => {
  return Array.isArray(itemPropValue)
    ? itemPropValue.join("").toLowerCase().includes(inputValue.toLowerCase())
    : itemPropValue.toLowerCase().includes(inputValue.toLowerCase());
};
