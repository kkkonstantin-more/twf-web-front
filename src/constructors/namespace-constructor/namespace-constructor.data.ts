import {
  AllowEditValueOption,
  AllowReadValueOption,
} from "./namespace-constructor.types";

export const allowReadOptions: AllowReadValueOption[] = [
  {
    value: true,
    label: "Открытый",
  },
  {
    value: false,
    label: "Закрытый",
  },
];

export const allowEditOptions: AllowEditValueOption[] = allowReadOptions;
