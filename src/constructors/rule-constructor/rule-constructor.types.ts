import { SelectOption } from "../../components/constructor-select/constructor-select.types";

export interface RuleConstructorInputs {
  left: string;
  right: string;
  basedOnTaskContext: SelectOption;
  matchJumbledAndNested: SelectOption;
}

export interface RuleConstructorProps {
  index: number;
  defaultValue?: any;
}
