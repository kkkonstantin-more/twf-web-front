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
