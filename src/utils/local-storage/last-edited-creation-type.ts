// types
import { ConstructorCreationMode } from "../../constructors/common-types";
import { ConstructorJSONType } from "../../redux/constructor-jsons/constructor-jsons.types";
// local storage keys prefixes
const lastEditedModePrefix = "lastEditedCreationMode__";
const lastExampleConstructorCodePrefix = "lastExampleConstructorCode__";

export const setLastEditedCreationMode = (
  constructorType: ConstructorJSONType,
  creationMode: ConstructorCreationMode
): void => {
  localStorage.setItem(lastEditedModePrefix + constructorType, creationMode);
};

export const getLastEditedCreationMode = (
  constructorType: ConstructorJSONType
): ConstructorCreationMode | null => {
  return localStorage.getItem(
    lastEditedModePrefix + constructorType
  ) as ConstructorCreationMode | null;
};

export const setLastExampleConstructorCode = (
  constructorType: ConstructorJSONType,
  code: string
): void => {
  localStorage.setItem(
    lastExampleConstructorCodePrefix + constructorType,
    code
  );
};

export const getLastExampleConstructorCode = (
  constructorType: ConstructorJSONType
): string | null => {
  return localStorage.getItem(
    lastExampleConstructorCodePrefix + constructorType
  );
};
