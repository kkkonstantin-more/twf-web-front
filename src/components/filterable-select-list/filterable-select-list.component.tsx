// libs and hooks
import React, { useEffect, useState } from "react";
// lib components
import Select from "react-select";
// styles
import "./filterable-select-list.styles.scss";
// types
import {
  FilterableSelectListProps,
  FilterableSelectListItem,
  FilterableSelectListSortTokens,
} from "./filterable-select-list.types";
// icons
import Icon from "@mdi/react";
import { mdiArrowDown, mdiArrowUp, mdiMagnify } from "@mdi/js";

const SelectConstructorItemList = ({
  items,
  propsToFilter,
}: FilterableSelectListProps): JSX.Element => {
  const [selectedItems, setSelectedItems] = useState<
    FilterableSelectListItem[]
  >(items);
  const searchKeys: string[] = Object.keys(items[0]).filter((prop: string) => {
    return prop !== "onSelect";
  });
  const [currentSearchKey, setCurrentSearchKey] = useState<string>("name");

  const allSortTokens: FilterableSelectListSortTokens = Object.fromEntries(
    propsToFilter.map((searchKey: string) => {
      return [
        searchKey,
        items
          .reduce((acc: string[], item: FilterableSelectListItem): string[] => {
            return Array.isArray(item[searchKey])
              ? acc.concat(item[searchKey])
              : [...acc, item[searchKey]];
          }, [])
          .filter(
            (item: string, i: number, arr: string[]) => arr.indexOf(item) === i
          ),
      ];
    })
  );
  const [visibleSortTokens, setVisibleSortTokens] = useState<
    FilterableSelectListSortTokens
  >(allSortTokens);
  const [selectedSortTokens, setSelectedSortTokens] = useState<
    FilterableSelectListSortTokens
  >(Object.create(allSortTokens));

  useEffect(() => {
    // setSelectedItems(
    //   items.filter((item) => {
    //     return propsToFilter.every((key: string) => {
    //       return Array.isArray(item[key])
    //         ? item[key].some((it: any) => currentSorters[key].includes(it))
    //         : currentSorters[key].includes(item[key]);
    //     });
    //   })
    // );
    // console.log(selectedItems);
    console.log(selectedSortTokens);
  }, [selectedSortTokens]);

  const updateVisibleTokens = (
    prevSelectedTokens: FilterableSelectListSortTokens,
    selectedSortTokens: FilterableSelectListSortTokens,
    changedKey: string,
    action: "add" | "remove"
  ) => {
    const selectedItems = items.filter((item: FilterableSelectListItem) => {
      return Object.keys(selectedSortTokens)
        .filter((key: string) => selectedSortTokens[key].length !== 0)
        .every((key: string) => {
          return Array.isArray(item[key])
            ? item[key].some((val: string) => {
                return selectedSortTokens[key].includes(val);
              })
            : selectedSortTokens[key].includes(item[key]);
        });
    });
    setSelectedItems(selectedItems);

    const newVisibleSortTokens =
      selectedSortTokens[changedKey].length !== 0
        ? Object.fromEntries([
            ...propsToFilter
              .filter((searchKey: string) => searchKey !== changedKey)
              .map((searchKey: string) => {
                return [
                  searchKey,
                  selectedItems
                    .reduce(
                      (
                        acc: string[],
                        item: FilterableSelectListItem
                      ): string[] => {
                        return Array.isArray(item[searchKey])
                          ? acc.concat(item[searchKey])
                          : [...acc, item[searchKey]];
                      },
                      []
                    )
                    .filter(
                      (item: string, i: number, arr: string[]) =>
                        arr.indexOf(item) === i
                    ),
                ];
              }),
            [changedKey, visibleSortTokens[changedKey]],
          ])
        : Object.fromEntries(
            propsToFilter.map((searchKey: string) => {
              return [
                searchKey,
                selectedItems
                  .reduce(
                    (
                      acc: string[],
                      item: FilterableSelectListItem
                    ): string[] => {
                      return Array.isArray(item[searchKey])
                        ? acc.concat(item[searchKey])
                        : [...acc, item[searchKey]];
                    },
                    []
                  )
                  .filter(
                    (item: string, i: number, arr: string[]) =>
                      arr.indexOf(item) === i
                  ),
              ];
            })
          );
    setVisibleSortTokens(newVisibleSortTokens);
  };

  // const [sortersDescending, setSortersDescending] = useState<boolean[]>(
  //   searchKeys.map((_: SearchKey): boolean => false)
  // );

  // const namespaces: any[] = items
  //   .map((item) => {
  //     return item.namespace;
  //   })
  //   .filter((item, i, arr) => arr.indexOf(item) === i);
  //
  // const [selectedNamespaces, setSelectedNamespaces] = useState<any[]>(
  //   namespaces
  // );
  //
  // const filter = (): FilterableSelectListItem[] => {
  //   const visibleItems = items.filter((item: FilterableSelectListItem) => {
  //     //@ts-ignore
  //     return selectedNamespaces.includes(item.namespace);
  //   });
  //   return visibleItems;
  // };
  //
  // useEffect(() => {
  //   setVisibleItems(filter());
  // }, [selectedNamespaces]);

  // const translateKey = (key: SearchKey) => {
  //   switch (key) {
  //     case "code":
  //       return "код";
  //     case "name":
  //       return "имя";
  //     case "namespace":
  //       return "namespace";
  //   }
  // };

  return (
    <div className="select-constructor-item-list">
      <div className="select-constructor-item-list__search-field">
        <div className="form-group">
          <select
            className="form-control"
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
              setSelectedItems(
                items.filter((item: FilterableSelectListItem): boolean => {
                  return item[currentSearchKey]
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase());
                })
              );
            }}
          />
        </div>
      </div>
      {/*<div className="select-constructor-item-list__sorters">*/}
      {/*  <span>Сортировать по</span>*/}
      {/*  {searchKeys.map(*/}
      {/*    (sortKey: string, i: number): JSX.Element => {*/}
      {/*      return (*/}
      {/*        <div*/}
      {/*          key={i}*/}
      {/*          className="select-constructor-item-list__sorter"*/}
      {/*          onClick={(): void => {*/}
      {/*            setVisibleItems(*/}
      {/*              (prevState: FilterableSelectListItem[]) => {*/}
      {/*                return prevState.sort(*/}
      {/*                  (*/}
      {/*                    a: FilterableSelectListItem,*/}
      {/*                    b: FilterableSelectListItem*/}
      {/*                  ): number => {*/}
      {/*                    // @ts-ignore*/}
      {/*                    return a[sortKey] < b[sortKey]*/}
      {/*                      ? sortersDescending[i]*/}
      {/*                        ? -1*/}
      {/*                        : 1*/}
      {/*                      : sortersDescending[i]*/}
      {/*                      ? 1*/}
      {/*                      : -1;*/}
      {/*                  }*/}
      {/*                );*/}
      {/*              }*/}
      {/*            );*/}
      {/*            setSortersDescending((prevState: boolean[]) => {*/}
      {/*              return prevState.map(*/}
      {/*                (desc: boolean, j: number): boolean => {*/}
      {/*                  return j === i ? !desc : desc;*/}
      {/*                }*/}
      {/*              );*/}
      {/*            });*/}
      {/*          }}*/}
      {/*        >*/}
      {/*          <Icon*/}
      {/*            path={sortersDescending[i] ? mdiArrowDown : mdiArrowUp}*/}
      {/*            size={1}*/}
      {/*          />*/}
      {/*          <span>{translateKey(sortKey)}</span>*/}
      {/*        </div>*/}
      {/*      );*/}
      {/*    }*/}
      {/*  )}*/}
      {/*</div>*/}
      <div className="select-constructor-item-list__items">
        {selectedItems.length === 0 ? (
          <div style={{ padding: "1rem" }}>Элементы отсутствуют</div>
        ) : (
          selectedItems.map(
            (item: FilterableSelectListItem, i: number): JSX.Element => {
              return (
                <div key={i} className="select-constructor-item-list__item">
                  {Object.keys(item)
                    .filter((key: string) => key !== "onSelect")
                    .map((key: string) => {
                      const value = Array.isArray(item[key])
                        ? item[key].join(", ")
                        : item[key];
                      return (
                        <div>
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
        {propsToFilter.map((filterPropName: string, i: number) => {
          return (
            <div key={i} className="select-constructor-item-list__filter">
              <h2>{filterPropName}</h2>
              <Select
                options={visibleSortTokens[filterPropName].map(
                  (item: string) => ({
                    label: item,
                    value: item,
                  })
                )}
                isMulti={true}
                onChange={(selectedTokens: any, { action }: any) => {
                  console.log(action);
                  if (!selectedTokens) {
                    selectedTokens = [];
                  }
                  setSelectedSortTokens((prevState) => {
                    updateVisibleTokens(
                      visibleSortTokens,
                      {
                        ...prevState,
                        [filterPropName]: selectedTokens.map(
                          (value: any) => value.value
                        ),
                      },
                      filterPropName,
                      action === "select-option" ? "add" : "remove"
                    );
                    return {
                      ...prevState,
                      [filterPropName]: selectedTokens.map(
                        (value: any) => value.value
                      ),
                    };
                  });
                  // let newSorters = {};
                  // const itemsWithNewSorter
                  // currentSorters !== null
                  //   ? {
                  //       ...currentSorters,
                  //       [searchKey]: values.map((value: any) => value.value),
                  //     }
                  //   : {
                  //       ...sorters,
                  //       [searchKey]: values.map((value: any) => value.value),
                  //     };
                  // const selectedItems = items.filter((item) => {
                  //   return propsToFilter
                  //     .filter((key: string) => newSorters[key].length !== 0)
                  //     .every((key: string) => {
                  //       return Array.isArray(item[key])
                  //         ? item[key].some((it: any) =>
                  //             newSorters[key].includes(it)
                  //           )
                  //         : newSorters[key].includes(item[key]);
                  //     });
                  // });
                  // setCurrentSorters(
                  //   Object.fromEntries(
                  //     propsToFilter.map((searchKey: string) => {
                  //       return [
                  //         searchKey,
                  //         selectedItems
                  //           .reduce(
                  //             (
                  //               acc: string[],
                  //               item: FilterableSelectListItem
                  //             ): string[] => {
                  //               return Array.isArray(item[searchKey])
                  //                 ? acc.concat(item[searchKey])
                  //                 : [...acc, item[searchKey]];
                  //             },
                  //             []
                  //           )
                  //           .filter(
                  //             (item: string, i: number, arr: string[]) =>
                  //               arr.indexOf(item) === i
                  //           ),
                  //       ];
                  //     })
                  //   )
                  // );
                  // setSelectedItems(selectedItems);
                  // console.log(newSorters);
                  // console.log(
                  //   Object.keys(newSorters).filter(
                  //     (key: string) => key !== searchKey
                  //   ).map((key: string) => {
                  //     return newSorters[key].filter()
                  //   })
                  // );
                  // setCurrentSorters(
                  //   (prevState: FilterableSelectListSortTokens) => {
                  //     return {
                  //       ...prevState,
                  //       [searchKey]: values.map((value: any) => value.value),
                  //     };
                  //   }
                  // );
                }}
              />
            </div>
          );
        })}
        {/*  <h2>Фильтры</h2>*/}
        {/*  <Select*/}
        {/*    options={namespaces.map((item) => ({*/}
        {/*      label: item,*/}
        {/*      value: item,*/}
        {/*    }))}*/}
        {/*    isMulti={true}*/}

        {/*  />*/}
      </div>
    </div>
  );
};

export default SelectConstructorItemList;
