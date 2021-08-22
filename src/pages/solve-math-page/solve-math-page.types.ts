import {RulePackConstructorReceivedForm} from "../../constructors/rule-pack-constructor/rule-pack-constructor.types";
import {TaskSetConstructorReceivedForm} from "../../constructors/task-set-constructor/task-set-constructor.types";

export interface SendLogForm {
  appCode: "test_app_code";
  activityTypeCode: "interim" | "win" | "loose";
  // ISO date string
  clientActionTs: string;
  tasksetCode: string;
  tasksetVersion: number;
  taskCode: string;
  taskVersion: number;
  originalExpression: string;
  goalExpression: string;
  difficulty: number;
  currSolution: string;
}

export interface TaskContextForm {
  taskset: TaskSetConstructorReceivedForm;
  rulePacks: RulePackConstructorReceivedForm[];
}
