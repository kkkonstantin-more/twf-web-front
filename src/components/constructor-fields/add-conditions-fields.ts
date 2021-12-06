import {
  ConstructorFormDefaultInput,
  ConstructorFormInput,
  ConstructorFormMultipleExpressionInput, ConstructorRulesInput
} from "../constructor-form/constructor-form.types";
import {Panel} from "./constructor-fields.type";

const rulesCountField: ConstructorFormDefaultInput = {
  name: "rulesCount",
  label: "",
  isVisible: false,
  type: "number",
  defaultValue: "1"
}

const rulesField: ConstructorRulesInput = {
  name: "rules",
  label: "Правила",
  isRulesInput: true,
  width: 100
}

export const getAddConditionsFields = (): ConstructorFormInput[] => {
  return [
    rulesField,
    rulesCountField
  ].map(input => {
    input.panel = Panel.ADD_CONDITIONS;
    return input;
  });
}