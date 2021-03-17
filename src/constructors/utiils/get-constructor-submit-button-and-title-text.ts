// types
import { ConstructorCreationMode } from "../common-types";
import { ConstructorJSONType } from "../../redux/constructor-jsons/constructor-jsons.types";

const getConstructorSubmitButtonAndTitleText = (
  creationMode: ConstructorCreationMode,
  constructorType: ConstructorJSONType,
  code?: string
): string => {
  const entityName = (() => {
    switch (constructorType) {
      case ConstructorJSONType.NAMESPACE:
        return "namespace";
      case ConstructorJSONType.RULE_PACK:
        return "пакет правил";
      case ConstructorJSONType.TASK_SET:
        return "набор задач";
    }
  })();
  const entityNameInGenitiveCast = (() => {
    switch (constructorType) {
      case ConstructorJSONType.NAMESPACE:
        return "namespace";
      case ConstructorJSONType.RULE_PACK:
        return "пакета правил";
      case ConstructorJSONType.TASK_SET:
        return "набора задач";
    }
  })();
  switch (creationMode) {
    case ConstructorCreationMode.CREATE:
      return "Создать " + entityName;
    case ConstructorCreationMode.CREATE_BY_EXAMPLE:
      return `Создать ${entityName} на основе ${entityNameInGenitiveCast} ${code}`;
    case ConstructorCreationMode.EDIT:
      return "Изменить " + entityName;
  }
};

export default getConstructorSubmitButtonAndTitleText;
