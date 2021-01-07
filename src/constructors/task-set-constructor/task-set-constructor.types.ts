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
  subjectTypes: string[] | string;
  tasks: TaskConstructorInputs[];
  recommendedByCommunity: boolean;
  otherData?: any;
}

export type TaskSetConstructorSendForm = TaskSetConstructorReceivedForm;
