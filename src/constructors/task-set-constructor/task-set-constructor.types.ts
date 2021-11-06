// types
import {
  TaskConstructorInputs,
  TaskConstructorReceivedForm,
} from "../task-constructor/task-constructor.types";

export interface TaskLinkInput {
  namespace: string;
  taskCode: string;
}

export interface TaskSetConstructorLinkReceivedForm {
  code: string;
  nameRu: string;
  namespaceCode: string;
}

export interface TaskSetConstructorReceivedForm {
  code: string;
  namespaceCode: string;
  nameEn: string;
  nameRu: string;
  descriptionShortRu: string;
  descriptionShortEn: string;
  descriptionRu: string;
  descriptionEn: string;
  subjectType: string;
  recommendedByCommunity: boolean;
  otherData: any;
  tags: string[];
  tasks: TaskConstructorReceivedForm[];
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
  otherData: any;
  tags: string[];
  tasks: TaskConstructorInputs[];
}
export interface VisualizationMode {
  name: "list" | "table";
  iconUrl: string;
}

export type TaskSetConstructorSendForm = TaskSetConstructorReceivedForm;
