import { TaskConstructorInputs } from "../task-constructor/task-constructor.types";

export interface TaskLinkInput {
  namespace: string;
  taskCode: string;
}

export interface TaskSetConstructorInputs {
  nameEn: string;
  nameRu: string;
  code: string;
  namespace: string;
  tasks: TaskConstructorInputs[];
}
