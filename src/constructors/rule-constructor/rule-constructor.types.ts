import { ArrayField } from "react-hook-form";
import { ExpressionInput } from "../task-constructor/task-constructor.types";

export interface RuleConstructorInputs {
  nameEn: string;
  nameRu: string;
  code: string;
  left: ExpressionInput;
  right: ExpressionInput;
  priority: number;
  isExtending: "true" | "false" | boolean;
  simpleAdditional: "true" | "false" | boolean;
  basedOnTaskContext: "true" | "false" | boolean;
  matchJumbledAndNested: "true" | "false" | boolean;
}

export interface RuleConstructorProps {
  index: number;
  defaultValue?: Partial<ArrayField<RuleConstructorInputs, "id">>;
}
