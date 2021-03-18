import { ConstructorInputProps } from "../components/constructor-input/construcor-input.types";
import {
  ConstructorSelectProps,
  SelectOption,
} from "../components/constructor-select/constructor-select.types";
import { ConstructorCreationMode } from "./common-types";
import {
  ConstructorInputs,
  ConstructorJSONType,
} from "../redux/constructor-jsons/constructor-jsons.types";

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

export const setConstructorValueDueToCreationMode = async (
  constructorType: ConstructorJSONType,
  creationMode: ConstructorCreationMode,
  lastEditedMode: ConstructorCreationMode | null,
  reset: (value: ConstructorInputs) => void,
  constructorInitialState: ConstructorInputs,
  setLastEditedCreationMode: (
    constructorType: ConstructorJSONType,
    creationMode: ConstructorCreationMode
  ) => void,
  reduxJSONValue: ConstructorInputs,
  updateReduxJSON: (value: any) => void,
  fetchItemCode: string,
  fetchItemRequest: (code: string) => Promise<ConstructorInputs>,
  lastUsedAsExampleConstructorCode: string | null,
  code: string | null,
  setLastExampleConstructorCode: (
    constructorType: ConstructorJSONType,
    code: string
  ) => void
): Promise<void> => {
  if (creationMode === ConstructorCreationMode.CREATE) {
    if (lastEditedMode === ConstructorCreationMode.CREATE) {
      reset(reduxJSONValue);
    } else {
      reset(constructorInitialState);
    }
  } else if (creationMode === ConstructorCreationMode.EDIT) {
    if (
      lastEditedMode === ConstructorCreationMode.EDIT &&
      fetchItemCode === reduxJSONValue.code
    ) {
      reset(reduxJSONValue);
    } else {
      const fetchedItem = await fetchItemRequest(fetchItemCode);
      reset(fetchedItem);
      updateReduxJSON(fetchedItem);
    }
  } else if (creationMode === ConstructorCreationMode.CREATE_BY_EXAMPLE) {
    if (
      lastEditedMode === ConstructorCreationMode.CREATE_BY_EXAMPLE &&
      lastUsedAsExampleConstructorCode === code
    ) {
      reset(reduxJSONValue);
    } else {
      const fetchedItem = await fetchItemRequest(fetchItemCode);
      await reset(fetchedItem);
      if (code) {
        setLastExampleConstructorCode(constructorType, code);
      }
      updateReduxJSON(fetchedItem);
    }
  }
  setLastEditedCreationMode(constructorType, creationMode);
};
