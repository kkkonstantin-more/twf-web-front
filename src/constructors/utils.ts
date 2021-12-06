import { SelectOption } from "../components/constructor-select/constructor-select.types";
import { ConstructorCreationMode } from "./common-types";
import {
  ConstructorInputs,
  ConstructorJSONType,
} from "../redux/constructor-jsons/constructor-jsons.types";
import {
  ConstructorFormExpressionInput,
  ConstructorFormInput, ConstructorFormMultipleExpressionInput,
  ConstructorFormSelectInput,
} from "../components/constructor-form/constructor-form.types";
import {AxiosError} from "axios";

export const filterReactSelectOptions = (options: any[]) => {
  return options.map((option: any) => {
    return option.hasOwnProperty("label") && option.hasOwnProperty("value")
      ? option.value
      : option;
  });
};

export const isSelectInput = (
  input: ConstructorFormInput
): input is ConstructorFormSelectInput => {
  return (input as ConstructorFormSelectInput).options !== undefined;
};

export const isExpressionInput = (
  input: ConstructorFormInput
): input is ConstructorFormExpressionInput => {
  return (
    (input as ConstructorFormExpressionInput).isExpressionInput !== undefined
  );
};

export const isMultipleExpressionInput = (
  input: ConstructorFormInput
): input is ConstructorFormMultipleExpressionInput => {
  return (
    (input as ConstructorFormMultipleExpressionInput).isMultipleExpressionInput !== undefined
  );
};

export const formatConstructorSelect = (
  selectedOption: any,
  options: SelectOption[]
) => {
  return selectedOption.hasOwnProperty("label")
    ? selectedOption.value
    : options.find((option: SelectOption) => option.value === selectedOption);
};

export const makeServerRequestErrorMessage = (
    e: AxiosError
) => {
  if (e.response) {
    if (e.response.data.error) {
      return "Произошла ошибка: '" + e.response.data.error + "' -> '" + e.message + "'";
    } else {
      return "Произошла ошибка: '" + e.response.data + "' -> '" + e.message + "'";
    }
  } else {
    return "Произошла ошибка: '" + e.message + "'";
  }
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
