// types
import {
  TaskConstructorInputs,
  TaskConstructorReceivedForm,
} from "../task-constructor/task-constructor.types";

export interface TaskLinkInput {
  namespace: string;
  taskCode: string;
}

export interface TaskSetConstructorReceivedForm {
  code: string;
  namespaceCode: string;
  nameEn: string;
  nameRu: string;
  subjectTypes: string[];
  tasks: TaskConstructorReceivedForm[];
  recommendedByCommunity: boolean;
  otherData?: any;
}

export interface TaskSetConstructorInputs {
  code: string;
  namespaceCode: string;
  nameEn: string;
  nameRu: string;
  descriptionShortEn: string;
  descriptionShortRu: string;
  descriptionEn: string;
  descriptionRu: string;
  subjectType: string;
  recommendedByCommunity: boolean;
  otherData?: any;
  tasks: TaskConstructorInputs[];
}
export interface VisualizationMode {
  name: "list" | "table";
  iconUrl: string;
}

export type TaskSetConstructorSendForm = TaskSetConstructorReceivedForm;
