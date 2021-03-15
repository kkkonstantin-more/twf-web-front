export type EditingMode = "forms" | "textEditor";

export interface EditingModeSwitcherOption {
  label: "Формы" | "JSON";
  value: EditingMode;
}
