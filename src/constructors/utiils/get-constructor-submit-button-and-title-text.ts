// types
import { ConstructorCreationMode } from "../common-types";
import { ConstructorJSONsTypes } from "../../redux/constructor-jsons/constructor-jsons.types";

const getConstructorSubmitButtonAndTitleText = (
  creationMode: ConstructorCreationMode,
  constructorType: ConstructorJSONsTypes,
  code?: string
): string => {
  const entityName = (() => {
    switch (constructorType) {
      case ConstructorJSONsTypes.NAMESPACE:
        return "namespace";
      case ConstructorJSONsTypes.RULE_PACK:
        return "пакет правил";
      case ConstructorJSONsTypes.TASK_SET:
        return "набор задач";
    }
  })();
  const entityNameInGenitiveCast = (() => {
    switch (constructorType) {
      case ConstructorJSONsTypes.NAMESPACE:
        return "namespace";
      case ConstructorJSONsTypes.RULE_PACK:
        return "пакета правил";
      case ConstructorJSONsTypes.TASK_SET:
        return "набора задач";
    }
  })();
  switch (creationMode) {
    case ConstructorCreationMode.CREATE:
      return "Создать " + entityName;
    case ConstructorCreationMode.CREATE_BY_EXAMPLE:
      return `Создать пакет правил на основе ${entityNameInGenitiveCast} ${code}`;
    case ConstructorCreationMode.EDIT:
      return "Изменить " + entityName;
  }
};

export default getConstructorSubmitButtonAndTitleText;
