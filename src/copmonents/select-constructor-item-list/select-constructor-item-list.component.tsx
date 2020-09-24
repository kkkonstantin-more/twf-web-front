// libs and hooks
import React, { useState } from "react";
// styles
import "./select-constructor-item-list.styles.scss";
// types
import {
  SearchKey,
  SelectConstructorItemListItem,
  SelectConstructorItemListProps,
} from "./select-constructor-item-list.types";
// icons
import Icon from "@mdi/react";
import { mdiArrowDown, mdiArrowUp, mdiMagnify } from "@mdi/js";

const SelectConstructorItemList = ({
  items,
}: SelectConstructorItemListProps): JSX.Element => {
  const searchKeys: SearchKey[] = Object.keys(items[0])
    .filter((item: string) => item !== "onClickAction")
    .map((item: string) => item as SearchKey);
  const [currentSearchKey, setCurrentSearchKey] = useState<SearchKey>("name");
  const [visibleItems, setVisibleItems] = useState<
    SelectConstructorItemListItem[]
  >(items);
  const [sortersDescending, setSortersDescending] = useState<boolean[]>(
    searchKeys.map((_) => false)
  );

  const translateKey = (key: SearchKey) => {
    switch (key) {
      case "code":
        return "код";
      case "name":
        return "имя";
      case "namespace":
        return "namespace";
    }
  };

  return (
    <div className="select-constructor-item-list">
      <div className="select-constructor-item-list__search-field">
        <div className="form-group">
          <select
            className="form-control"
            value={currentSearchKey}
            onChange={(e: React.FormEvent<HTMLSelectElement>): void => {
              setCurrentSearchKey(e.currentTarget.value as SearchKey);
            }}
          >
            {searchKeys.map(
              (searchKey: SearchKey, i: number): JSX.Element => {
                return (
                  <option key={i} value={searchKey}>
                    {translateKey(searchKey)}
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
            placeholder={`Введите ${translateKey(currentSearchKey)}`}
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
              setVisibleItems(
                items.filter((item: SelectConstructorItemListItem): boolean => {
                  // @ts-ignore
                  return item[currentSearchKey]
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase());
                })
              );
            }}
          />
        </div>
      </div>
      <div className="select-constructor-item-list__sorters">
        <span>Сортировать по</span>
        {searchKeys.map(
          (sortKey: SearchKey, i: number): JSX.Element => {
            return (
              <div
                key={i}
                className="select-constructor-item-list__sorter"
                onClick={(): void => {
                  setVisibleItems(
                    (prevState: SelectConstructorItemListItem[]) => {
                      return prevState.sort(
                        (
                          a: SelectConstructorItemListItem,
                          b: SelectConstructorItemListItem
                        ): number => {
                          // @ts-ignore
                          return a[sortKey] < b[sortKey]
                            ? sortersDescending[i]
                              ? -1
                              : 1
                            : sortersDescending[i]
                            ? 1
                            : -1;
                        }
                      );
                    }
                  );
                  setSortersDescending((prevState: boolean[]) => {
                    return prevState.map(
                      (desc: boolean, j: number): boolean => {
                        return j === i ? !desc : desc;
                      }
                    );
                  });
                }}
              >
                <Icon
                  path={sortersDescending[i] ? mdiArrowDown : mdiArrowUp}
                  size={1}
                />
                <span>{translateKey(sortKey)}</span>
              </div>
            );
          }
        )}
      </div>
      <div className="select-constructor-item-list__items">
        {visibleItems.map(
          (item: SelectConstructorItemListItem, i: number): JSX.Element => {
            const { code, name, namespace, onClickAction } = item;
            return (
              <div
                key={i}
                className="select-constructor-item-list__item"
                onClick={(): void => {
                  onClickAction();
                }}
              >
                <div className="select-constructor-item-list__item-name">
                  {name}
                </div>
                {code && (
                  <div className="select-constructor-item-list__item-code">
                    <b>Код: </b>
                    {code}
                  </div>
                )}
                {namespace && (
                  <div className="select-constructor-item-list__item-namespace">
                    <b>Namespace: </b>
                    {namespace}
                  </div>
                )}
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default SelectConstructorItemList;
