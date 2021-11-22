import {ConstructorFormInput} from "../constructor-form/constructor-form.types";
import {Panel} from "./constructor-fields.type";

export const getRulePacksFields = (rulePacks: string[]) : ConstructorFormInput[] => {
  return [
    {
      name: "rulePacks",
      label: "Пакеты правил",
      type: "text",
      isMulti: true,
      options: rulePacks.map((rp: string) => ({ label: rp, value: rp })),
      panel: Panel.RULE_PACKS,
    },
  ]
};