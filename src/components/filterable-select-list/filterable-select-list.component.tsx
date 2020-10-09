// libs and hooks
import React, { useState } from "react";
// lib components
import Select from "react-select";
// types
import {
  FilterableSelectListProps,
  FilterableSelectListItem,
  FilterableSelectListSortTokens,
} from "./filterable-select-list.types";
import { SelectOption } from "../../types/react-select";
// utils
import {
  getSelectedItems,
  getSortTokensFromItems,
  isItemPropMatchingSearch,
} from "./filterable-select-list.utils";
// icons
import Icon from "@mdi/react";
import { mdiMagnify } from "@mdi/js";
// styles
import "./filterable-select-list.styles.scss";

const FilterableSelectList = ({
  items,
  propsToFilter,
}: FilterableSelectListProps): JSX.Element => {
  const searchKeys: string[] = [
    ...Object.keys(items[0]).filter((prop: string) => {
      return prop !== "onSelect";
    }),
    "all",
  ];
  const allSortTokens: FilterableSelectListSortTokens = getSortTokensFromItems(
    items,
    propsToFilter
  );

  const [selectedItems, setSelectedItems] = useState<
    FilterableSelectListItem[]
  >(items);
  const [currentSearchKey, setCurrentSearchKey] = useState<string>("all");
  const [selectedSortTokens, setSelectedSortTokens] = useState<
    FilterableSelectListSortTokens
  >(Object.fromEntries(propsToFilter.map((prop: string) => [prop, []])));
  const [visibleSortTokens, setVisibleSortTokens] = useState<
    FilterableSelectListSortTokens
  >(allSortTokens);

  const onChangeSelect = (
    selectedOptions: SelectOption[],
    filterProp: string,
    propsToFilter: string[]
  ): void => {
    const newSelectedSortTokens = {
      ...selectedSortTokens,
      [filterProp]:
        selectedOptions === null
          ? []
          : selectedOptions.map((option: SelectOption) => option.value),
    };
    const newVisibleSortTokens: FilterableSelectListSortTokens = Object.fromEntries(
      propsToFilter.map((prop: string) => [prop, []])
    );
    const newSelectedItems: FilterableSelectListItem[] = getSelectedItems(
      items,
      newSelectedSortTokens
    );
    for (const tokenKey in allSortTokens) {
      if (allSortTokens.hasOwnProperty(tokenKey)) {
        allSortTokens[tokenKey].forEach((token: string) => {
          if (
            getSelectedItems(items, {
              ...newSelectedSortTokens,
              [tokenKey]: [...newSelectedSortTokens[tokenKey], token],
            }).length !== 0 &&
            getSelectedItems(items, {
              ...newSelectedSortTokens,
              [tokenKey]: [...newSelectedSortTokens[tokenKey], token],
            }).length !== getSelectedItems(items, newSelectedSortTokens).length
          ) {
            newVisibleSortTokens[tokenKey].push(token);
          }
        });
      }
    }
    const currentTokensOfVisibleItems = getSortTokensFromItems(
      newSelectedItems,
      propsToFilter
    );
    for (const tokenKey in currentTokensOfVisibleItems) {
      if (currentTokensOfVisibleItems.hasOwnProperty(tokenKey)) {
        currentTokensOfVisibleItems[tokenKey].forEach((token: string) => {
          if (
            newVisibleSortTokens.hasOwnProperty(tokenKey) &&
            !newVisibleSortTokens[tokenKey].includes(token)
          ) {
            newVisibleSortTokens[tokenKey].push(token);
          }
        });
      }
    }
    setSelectedItems(newSelectedItems);
    setSelectedSortTokens(newSelectedSortTokens);
    setVisibleSortTokens(newVisibleSortTokens);
  };

  const onChangeSearchInput = (searchKey: string, inputValue: string): void => {
    const relevantItems = getSelectedItems(items, selectedSortTokens);
    if (searchKey === "all") {
      setSelectedItems(
        relevantItems.filter((item: FilterableSelectListItem) => {
          return searchKeys
            .filter((searchKey: string) => searchKey !== "all")
            .some((itemKey: string) => {
              return isItemPropMatchingSearch(item[itemKey], inputValue);
            });
        })
      );
    } else {
      setSelectedItems(
        relevantItems.filter((item: FilterableSelectListItem) => {
          return isItemPropMatchingSearch(item[searchKey], inputValue);
        })
      );
    }
  };

  return (
    <div className="select-constructor-item-list">
      <div className="select-constructor-item-list__search-field">
        <div className="form-group">
          <select
            className="form-control select-constructor-item-list__select-input"
            value={currentSearchKey}
            onChange={(e: React.FormEvent<HTMLSelectElement>): void => {
              setCurrentSearchKey(e.currentTarget.value);
            }}
          >
            {searchKeys.map(
              (searchKey: string, i: number): JSX.Element => {
                return (
                  <option key={i} value={searchKey}>
                    {searchKey}
                  </option>
                );
              }
            )}
          </select>
        </div>
        <div className="form-group">
          <Icon
            path={mdiMagnify}
            size={1.5}
            className="select-constructor-item-list__search-icon"
          />
          <input
            type="text"
            className="form-control select-constructor-item-list__search-input"
            placeholder={`Введите ${currentSearchKey}`}
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
              onChangeSearchInput(currentSearchKey, e.target.value);
            }}
          />
        </div>
      </div>
      <div className="select-constructor-item-list__items">
        {selectedItems.length === 0 ? (
          <div style={{ padding: "1rem" }}>Элементы отсутствуют</div>
        ) : (
          selectedItems.map(
            (item: FilterableSelectListItem, i: number): JSX.Element => {
              return (
                <div
                  key={i}
                  className="select-constructor-item-list__item"
                  onClick={() => {
                    item.onSelect();
                  }}
                >
                  {Object.keys(item)
                    .filter((key: string) => key !== "onSelect")
                    .map((key: string) => {
                      const value = Array.isArray(item[key])
                        ? item[key].join(", ")
                        : item[key];
                      return (
                        <div key={key}>
                          <b>{key}: </b>
                          <span>{value}</span>
                        </div>
                      );
                    })}
                </div>
              );
            }
          )
        )}
      </div>
      <div className="select-constructor-item-list__filters">
        {propsToFilter.map(
          (filterProp: string, i: number): JSX.Element => {
            return (
              <div key={i} className="select-constructor-item-list__filter">
                <h2>{filterProp}</h2>
                <Select
                  classNamePrefix="react-select"
                  options={visibleSortTokens[filterProp].map(
                    (item: string) => ({
                      label: item,
                      value: item,
                    })
                  )}
                  isMulti={true}
                  onChange={(selectedTokens: any): void => {
                    onChangeSelect(selectedTokens, filterProp, propsToFilter);
                  }}
                />
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default FilterableSelectList;
