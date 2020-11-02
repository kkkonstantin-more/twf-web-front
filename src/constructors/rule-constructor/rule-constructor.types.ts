import { ArrayField } from "react-hook-form";

export interface RuleConstructorInputs {
  left: string;
  right: string;
  basedOnTaskContext: "true" | "false";
  matchJumbledAndNested: "true" | "false";
}

export interface RuleConstructorProps {
  index: number;
  defaultValue?: Partial<ArrayField<RuleConstructorInputs, "id">>;
}
