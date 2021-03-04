import { ConstructorInputProps } from "../components/constructor-input/construcor-input.types";
import {
  ConstructorSelectProps,
  SelectOption,
} from "../components/constructor-select/constructor-select.types";
import { ConstructorInputs } from "../redux/constructor-jsons/constructor-jsons.types";

export const filterReactSelectOptions = (options: any[]) => {
  return options.map((option: any) => {
    return option.hasOwnProperty("label") && option.hasOwnProperty("value")
      ? option.value
      : option;
  });
};

export const isSelectInput = (
  input:
    | ConstructorInputProps
    | Partial<ConstructorInputProps>
    | ConstructorSelectProps
): input is ConstructorSelectProps => {
  return (input as ConstructorSelectProps).options !== undefined;
};

export const formatConstructorSelect = (
  selectedOption: any,
  options: SelectOption[]
) => {
  return selectedOption.hasOwnProperty("label")
    ? selectedOption.value
    : options.find((option: SelectOption) => option.value === selectedOption);
};

// export const isJSONEdited = (
//   currentJSON: ConstructorInputs,
//   initialReduxJSON: ConstructorInputs
// ): boolean => {
//   return currentJSON === initialReduxJSON;
// };
