import { ArrayField } from "react-hook-form";

export interface RuleConstructorInputs {
  left: string;
  right: string;
  basedOnTaskContext: boolean;
  matchJumbledAndNested: boolean;
}

export interface RuleConstructorProps {
  index: number;
  defaultValue?: Partial<ArrayField<RuleConstructorInputs, "id">>;
}
