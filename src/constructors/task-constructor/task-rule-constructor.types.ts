import { ArrayField } from "react-hook-form";
import { RuleConstructorInputs } from "../rule-constructor/rule-constructor.types";

export interface TaskRuleConstructorProps {
    index: number;
    taskIndex: number;
    defaultValue?: Partial<ArrayField<RuleConstructorInputs, "id">>;
}