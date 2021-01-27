type LastEditedConstructorItemsInLocalStorage =
  | "last-edited-rule-packs"
  | "last-edited-task-sets"
  | "last-edited-namespaces";

export const addLastEditedConstructorItemToLocalStorage = (
  name: LastEditedConstructorItemsInLocalStorage,
  code: string
): void => {
  const items: string[] | null = localStorage.getItem(name)
    ? // @ts-ignore
      localStorage.getItem(name).split(",")
    : null;
  if (items) {
    if (items.includes(code)) {
      localStorage.setItem(
        name,
        [code, ...items.filter((item) => item !== code)].join(",")
      );
    } else if (items.length === 3) {
      localStorage.setItem(name, [code, ...items.slice(1, 4)].join(","));
    } else if (items.length < 3) {
      localStorage.setItem(name, code + "," + items);
    } else if (items.length > 3) {
      throw new Error("last edited items in local storage more than 3");
    }
  } else {
    localStorage.setItem(name, code);
  }
};

export const getLastEditedConstructorItemsFromLocalStorage = (
  name: LastEditedConstructorItemsInLocalStorage
): string[] | null => {
  const item = localStorage.getItem(name);
  return item ? item.split(",") : null;
};
