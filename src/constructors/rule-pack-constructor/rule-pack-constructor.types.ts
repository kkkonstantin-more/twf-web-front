import { RuleConstructorInputs } from "../rule-constructor/rule-constructor.types";

export interface RulePackConstructorInputs {
  namespace: string;
  code: string;
  nameEn: string;
  nameRu: string;
  rulePacks: string[];
  rules: RuleConstructorInputs[];
}
