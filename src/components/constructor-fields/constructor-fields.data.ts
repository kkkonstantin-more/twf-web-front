import {ConstructorFormPanel} from "../constructor-panels-form/constructor-panels-form.types";
import {Panel} from "./constructor-fields.type";

export const formPanels: ConstructorFormPanel[] = [
  {
    header: 'Предметная область + тип',
    key: Panel.SUBJECT_TASK_TYPE
  },
  {
    header: 'Основные условия',
    key: Panel.BASIC_CONDITIONS
  },
  {
    header: 'При условиях',
    key: Panel.ADD_CONDITIONS
  },
  {
    header: 'Теги',
    key: Panel.TAGS
  },
  {
    header: 'Пакеты правил',
    key: Panel.RULE_PACKS
  },
  {
    header: 'Текстовое описание',
    key: Panel.TEXT_DESC
  },
];