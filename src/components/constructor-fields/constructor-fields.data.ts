import {ConstructorFormPanel} from "../constructor-panels-form/constructor-panels-form.types";
import {Panel} from "./constructor-fields.type";

export const formPanels: ConstructorFormPanel[] = [
  {
    header: 'Предметная область + тип',
    key: Panel.SUBJECT_TASK_TYPE
  },
  {
    header: 'Основные условия',
    key: Panel.MAIN_CONDITIONS
  },
];