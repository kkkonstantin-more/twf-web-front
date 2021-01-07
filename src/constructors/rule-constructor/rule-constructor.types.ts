import { ArrayField } from "react-hook-form";
import { ExpressionInput } from "../task-constructor/task-constructor.types";

export interface RuleConstructorInputs {
  left: ExpressionInput;
  right: ExpressionInput;
  basedOnTaskContext?: "true" | "false" | boolean;
  matchJumbledAndNested?: "true" | "false" | boolean;
}

export interface RuleConstructorProps {
  index: number;
  defaultValue?: Partial<ArrayField<RuleConstructorInputs, "id">>;
}
