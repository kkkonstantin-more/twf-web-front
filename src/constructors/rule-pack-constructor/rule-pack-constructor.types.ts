import { RuleConstructorInputs } from "../rule-constructor/rule-constructor.types";

export interface RulePackConstructorInputs {
  namespaceCode: string;
  code: string;
  nameEn: string;
  nameRu: string;
  rulePacks?: string;
  rules?: RuleConstructorInputs[];
  otherData?: string;
}

export interface RulePackLink {
  rulePackCode: string;
  namespaceCode?: string;
  rulePackNameEn?: string;
  rulePackNameRy?: string;
}
