import {ConstructorFormInput, ConstructorRulesInput} from "../constructor-form/constructor-form.types";
import {Panel} from "./constructor-fields.type";

const rulesField: ConstructorRulesInput = {
  name: "rules",
  label: "Правила",
  isRulesInput: true,
  width: 100
}

export const getAddConditionsFields = (): ConstructorFormInput[] => {
  return [
    rulesField
  ].map(input => {
    input.panel = Panel.ADD_CONDITIONS;
    return input;
  });
}