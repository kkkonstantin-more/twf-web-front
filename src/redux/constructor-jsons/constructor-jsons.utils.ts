export const convertInputStringListSeparatedByCommasToArray = (
  inputStr: string | string[]
): string[] => {
  if (inputStr === "") {
    return [];
  }
  return typeof inputStr === "string" ? inputStr.split(",") : inputStr;
};

export const convertStringBoolToBool = (strBool: "false" | "true"): boolean => {
  return strBool === "true";
};
