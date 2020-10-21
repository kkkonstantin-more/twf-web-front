import { ConstructorInputProps } from "../components/constructor-input/construcor-input.types";
import { ConstructorSelectProps } from "../components/constructor-select/constructor-select.types";

export const filterReactSelectOptions = (options: any[]) => {
  return options.map((option: any) => {
    return option.hasOwnProperty("label") && option.hasOwnProperty("value")
      ? option.value
      : option;
  });
};

export const isSelectInput = (
  input: ConstructorInputProps | ConstructorSelectProps
): input is ConstructorSelectProps => {
  return (input as ConstructorSelectProps).options !== undefined;
};
