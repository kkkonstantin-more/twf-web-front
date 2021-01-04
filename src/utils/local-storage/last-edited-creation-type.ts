// types
import { ConstructorCreationMode } from "../../constructors/common-types";
import { ConstructorJSONsTypes } from "../../redux/constructor-jsons/constructor-jsons.types";
// local storage keys prefixes
const lastEditedModePrefix = "lastEditedCreationMode__";
const lastExampleConstructorCodePrefix = "lastExampleConstructorCode__";

export const setLastEditedCreationMode = (
  constructorType: ConstructorJSONsTypes,
  creationMode: ConstructorCreationMode
): void => {
  localStorage.setItem(lastEditedModePrefix + constructorType, creationMode);
};

export const getLastEditedCreationMode = (
  constructorType: ConstructorJSONsTypes
): ConstructorCreationMode | null => {
  return localStorage.getItem(
    lastEditedModePrefix + constructorType
  ) as ConstructorCreationMode | null;
};

export const setLastExampleConstructorCode = (
  constructorType: ConstructorJSONsTypes,
  code: string
): void => {
  localStorage.setItem(
    lastExampleConstructorCodePrefix + constructorType,
    code
  );
};

export const getLastExampleConstructorCode = (
  constructorType: ConstructorJSONsTypes
): string | null => {
  return localStorage.getItem(
    lastExampleConstructorCodePrefix + constructorType
  );
};
