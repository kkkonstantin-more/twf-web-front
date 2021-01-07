import { RuleConstructorInputs } from "../rule-constructor/rule-constructor.types";

export interface RulePackReceivedForm {
  namespaceCode: string;
  code: string;
  nameEn: string;
  nameRu: string;
  rulePacks?: RulePackLink[];
  rules?: RuleConstructorInputs[];
  otherData?: string;
}

export interface RulePackConstructorInputs {
  namespaceCode: string;
  code: string;
  nameEn: string;
  nameRu: string;
  rulePacks?: string[] | string;
  rules?: RuleConstructorInputs[];
  otherData?: string;
}

export interface RulePackConstructorSendForm {
  namespaceCode: string;
  code: string;
  nameEn: string;
  nameRu: string;
  rulePacks?: { rulePackCode: string }[];
  rules?: RuleConstructorInputs[];
  otherData?: string;
}

export interface RulePackLink {
  rulePackCode: string;
  namespaceCode?: string;
  rulePackNameEn?: string;
  rulePackNameRy?: string;
}
