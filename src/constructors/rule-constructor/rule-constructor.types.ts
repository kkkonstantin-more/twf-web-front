export interface RuleConstructorInputs {
  left: string;
  right: string;
  basedOnTaskContext: { label: "Да" | "Нет"; value: boolean } | boolean;
  matchJumbledAndNested: { label: "Да" | "Нет"; value: boolean } | boolean;
}

export interface RuleConstructorProps {
  index: number;
  defaultValue?: any;
}
