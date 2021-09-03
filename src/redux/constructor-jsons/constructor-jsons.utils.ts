export const convertInputStringListSeparatedByCommasToArray = (
  inputStr: string | string[] | undefined
): string[] => {
  if (inputStr === "" || inputStr === undefined) {
    return [];
  }
  return typeof inputStr === "string" ? inputStr.split(",") : inputStr;
};

export const convertStringBoolToBool = (strBool: "false" | "true"): boolean => {
  return strBool === "true";
};
