import { ArrayField } from "react-hook-form";

export interface RuleConstructorInputs {
  left: string;
  right: string;
  basedOnTaskContext: string;
  matchJumbledAndNested: string;
}

export interface RuleConstructorProps {
  index: number;
  defaultValue?: Partial<ArrayField<RuleConstructorInputs, "id">>;
}
