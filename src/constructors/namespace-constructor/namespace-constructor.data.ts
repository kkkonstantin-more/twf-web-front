import { LabeledValue } from "antd/es/select";

export const allowReadOptions: LabeledValue[] = [
  {
    value: "true",
    label: "Открытый",
  },
  {
    value: "false",
    label: "Закрытый",
  },
];

export const allowEditOptions: LabeledValue[] = allowReadOptions;
