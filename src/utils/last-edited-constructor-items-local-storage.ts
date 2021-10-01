type LastEditedConstructorItemsInLocalStorage =
  | "last-edited-rule-packs"
  | "last-edited-task-sets"
  | "last-edited-namespaces";

interface LastEditedConstructorItemInLocalStorageProps {
  code: string,
  nameEn: string | null,
}

export const addLastEditedConstructorItemToLocalStorage = (
  name: LastEditedConstructorItemsInLocalStorage,
  val: LastEditedConstructorItemInLocalStorageProps,
): void => {
  const items: LastEditedConstructorItemInLocalStorageProps[] | null = localStorage.getItem(name)
    ? // @ts-ignore
    JSON.parse(localStorage.getItem(name))
     : null;
  // console.log("addLastEditedConstructorItemToLocalStorage");
  // console.log(name);
  // console.log(val);
  // console.log(items);
  // TODO: handle case correctly: 3 last viewed items must be shown
  if (items) {
    if (items.includes(val)) {
      localStorage.setItem(
        name,
        JSON.stringify([val, ...items.filter((item) => item.code !== val.code)])
      );
    } else if (items.length <= 3) {
      localStorage.setItem(name, JSON.stringify([val, ...items]));
    } else if (items.length > 3) {
      // throw new Error("last edited items in local storage more than 3");
    }
  } else {
    localStorage.setItem(name, JSON.stringify([val]));
  }
};

export const getLastEditedConstructorItemsFromLocalStorage = (
  name: LastEditedConstructorItemsInLocalStorage
): LastEditedConstructorItemInLocalStorageProps[] | null => {
  const item = localStorage.getItem(name);
  return item ? JSON.parse(item) : null;
};
