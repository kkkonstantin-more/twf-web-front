import { ConstructorInputProps } from "../components/constructor-input/construcor-input.types";
import { SelectInput } from "../types/react-select";

export const filterReactSelectOptions = (options: any[]) => {
  return options.map((option: any) => {
    return option.hasOwnProperty("label") && option.hasOwnProperty("value")
      ? option.value
      : option;
  });
};

export const isSelectInput = (
  input: ConstructorInputProps | SelectInput
): input is SelectInput => {
  return (input as SelectInput).options !== undefined;
};
