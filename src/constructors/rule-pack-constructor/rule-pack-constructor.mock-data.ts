import { RulePackConstructorInputs } from "./rule-pack-constructor.types";

export const mockRulePacks: {
  [code: string]: RulePackConstructorInputs;
} = {
  "1": {
    namespace: "ns_1",
    code: "1",
    nameEn: "rule pack 1",
    nameRu: "пакет правил 1",
    rulePacks: [],
    rules: [
      {
        left: "2+2",
        right: "4",
        basedOnTaskContext: "true",
        matchJumbledAndNested: "true",
      },
      {
        left: "3+3",
        right: "6",
        basedOnTaskContext: "true",
        matchJumbledAndNested: "true",
      },
      {
        left: "5+5",
        right: "10",
        basedOnTaskContext: "true",
        matchJumbledAndNested: "true",
      },
    ],
  },
  "2": {
    namespace: "ns_2",
    code: "2",
    nameEn: "rule pack 2",
    nameRu: "пакет правил 2",
    rulePacks: [],
    rules: [
      {
        left: "2+2",
        right: "4",
        basedOnTaskContext: "true",
        matchJumbledAndNested: "true",
      },
      {
        left: "3+3",
        right: "6",
        basedOnTaskContext: "true",
        matchJumbledAndNested: "true",
      },
      {
        left: "5+5",
        right: "10",
        basedOnTaskContext: "true",
        matchJumbledAndNested: "true",
      },
    ],
  },
  "3": {
    namespace: "ns_1",
    code: "3",
    nameEn: "rule pack 3",
    nameRu: "пакет правил 3",
    rulePacks: [],
    rules: [
      {
        left: "2+2",
        right: "4",
        basedOnTaskContext: "true",
        matchJumbledAndNested: "true",
      },
      {
        left: "3+3",
        right: "6",
        basedOnTaskContext: "true",
        matchJumbledAndNested: "true",
      },
      {
        left: "5+5",
        right: "10",
        basedOnTaskContext: "true",
        matchJumbledAndNested: "true",
      },
    ],
  },
};
