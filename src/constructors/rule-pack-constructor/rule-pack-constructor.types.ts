import { RuleConstructorInputs } from "../rule-constructor/rule-constructor.types";
import { SelectOption } from "../../components/constructor-select/constructor-select.types";

export interface RulePackConstructorInputs {
  namespace: string;
  code: string;
  nameEn: string;
  nameRu: string;
  rulePacks: SelectOption[];
  rules: RuleConstructorInputs[];
}
