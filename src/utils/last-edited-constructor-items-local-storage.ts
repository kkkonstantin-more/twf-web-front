type LastEditedConstructorItemsInLocalStorage =
  | "last-edited-rule-packs"
  | "last-edited-task-sets"
  | "last-edited-namespaces";

export const addLastEditedConstructorItemToLocalStorage = (
  name: LastEditedConstructorItemsInLocalStorage,
  code: string
): void => {
  const item = localStorage.getItem(name);
  if (item) {
    if (item.split(",").length === 3) {
      localStorage.setItem(
        name,
        [code, ...item.split(",").slice(1, 4)].join(",")
      );
    } else if (item.split(",").length < 2) {
      localStorage.setItem(name, code + "," + item);
    } else if (item.split(",").length > 3) {
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
